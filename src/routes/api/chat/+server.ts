import type { RequestHandler } from './$types';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GOOGLE_GENERATIVE_AI_API_KEY } from '$env/static/private';

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_GENERATIVE_AI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();

	const { textStream } = await streamText({
		model: google("gemini-2.5-flash"),
		system:
			'You are to answer to a user as Daniel. respond in about 2-4 very very very short sentences (2-6 words).' +
			'You write simple, clear, and concise content.',
		prompt: `The following text is sent by the user: {${message}}`,
	});

	let text = ""
	for await (const chunk of textStream) {
		text += chunk;
	}

	// SSE
	const stream = new ReadableStream({
		async start(controller) {
			const encoder = new TextEncoder();

			// split into sentences (by . ! ? followed by space or end)
			const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

			for (const sentence of sentences) {
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

			controller.enqueue(encoder.encode('data: [DONE]\n\n'));
			controller.close();
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
