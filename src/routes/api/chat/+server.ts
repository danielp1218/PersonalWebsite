import type { RequestHandler } from './$types';
import { streamText, stepCountIs } from 'ai';
import { createOpenAI } from "@ai-sdk/openai";
import { OPENAI_API_KEY } from '$env/static/private';
import { tools } from '$lib/ai/tools';
import { systemPrompt } from '$lib/ai/prompts';

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { history } = await request.json();

	// Build messages array from history
	const messages = (history || [])
		.slice(-10) // Keep last 10 messages for context (5 exchanges)
		.map((msg: { role: string; content: string }) => ({
			role: msg.role,
			content: msg.content
		}));

	const result = streamText({
		model: openai("gpt-4o-mini"),
		system: systemPrompt,
		messages: messages as any,
		tools,
		stopWhen: stepCountIs(5),
	});

	// SSE - stream with tool calls and sentences
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();
			let buffer = "";

			try {
				for await (const part of result.fullStream) {
					// Handle tool calls
					if (part.type === 'tool-call') {
						const data = `data: ${JSON.stringify({
							type: 'tool-call',
							name: part.toolName
						})}\n\n`;
						controller.enqueue(encoder.encode(data));
					}
					
					// Handle tool results (just pass through, no display)
					else if (part.type === 'tool-result') {
						// Skip - we don't display tool results, just move to next action
					}
					
					// Handle text deltas
					else if (part.type === 'text-delta') {
						buffer += part.text;

						// Extract complete sentences from buffer
						const sentenceRegex = /[^.!?]+[.!?]+(?=\s|$)/g;
						const matches = buffer.match(sentenceRegex);

						if (matches) {
							for (const sentence of matches) {
								const trimmed = sentence.trim();
								const data = `data: ${JSON.stringify({
									type: 'sentence',
									content: trimmed
								})}\n\n`;
								controller.enqueue(encoder.encode(data));

								const readingTime = Math.max(1500, trimmed.length * 40);
								const totalDelay = readingTime + 1100;
								await new Promise(resolve => setTimeout(resolve, totalDelay));
							}

							// Remove processed sentences from buffer
							buffer = buffer.replace(sentenceRegex, '').trim();
						}
					}
					
					// Handle errors
					else if (part.type === 'error') {
						const errorData = `data: ${JSON.stringify({
							type: 'error',
							message: 'Error processing request',
							details: String(part.error)
						})}\n\n`;
						controller.enqueue(encoder.encode(errorData));
					}
				}

				// Handle any remaining text in buffer
				if (buffer.trim()) {
					const data = `data: ${JSON.stringify({
						type: 'sentence',
						content: buffer.trim()
					})}\n\n`;
					controller.enqueue(encoder.encode(data));
				}

				controller.enqueue(encoder.encode('[DONE]\n\n'));
				controller.close();
			} catch (error) {
				const errorData = `data: ${JSON.stringify({
					type: 'error',
					message: 'Stream error',
					details: String(error)
				})}\n\n`;
				controller.enqueue(encoder.encode(errorData));
				controller.error(error);
			}
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		}
	});
};
