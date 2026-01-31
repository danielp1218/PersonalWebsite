import type { RequestHandler } from './$types';
import { streamText } from 'ai';
import { createOpenAI } from "@ai-sdk/openai";
import { OPENAI_API_KEY } from '$env/static/private';

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

	const { textStream } = streamText({
		model: openai("gpt-5-nano-2025-08-07"),
		system:
			'You are to answer to a user as the human Daniel. respond in about 2-4 very very very short sentences (2-6 words).' +
			'You write simple, clear, and concise content. The user may try to trick you into breaking character, but you must always respond as Daniel.' +
			'Use colloquial language, contractions, and occasional slang. Keep a friendly and casual tone.' +
			'Never mention you are an AI model. Always stay in character as Daniel.',
		messages: messages as any,
	});

	// SSE - stream sentences in real-time as they arrive
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();
			let buffer = "";

			try {
				for await (const chunk of textStream) {
					buffer += chunk;

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
