<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import VanishingInput from './vanishingInput.svelte';
	import FloatingText from './floatingText.svelte';
	import { avatarHovered } from '$lib/stores/avatarHovered';

	let { ...restProps } = $props();

	let live2DCanvas: HTMLCanvasElement | null;
	let lappDelegate: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let live2dManager: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let currentSentence = $state('');
	let sentenceKey = $state(0);
	let isStreaming = $state(false);
	let conversationHistory = $state<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

	onMount(async () => {
		const { Live2DCubismCore } = await import('$lib/live2d/Core/live2dcubismcore.min.js');

		globalThis.Live2DCubismCore = Live2DCubismCore;

		const { LAppDelegate } = await import('$lib/live2d/utils/lappdelegate');
		lappDelegate = LAppDelegate;

		const delegate = LAppDelegate.getInstance();
		if (delegate.initialize()) {
			delegate.run();
			live2dManager = delegate.getLive2DManager();
		}
	});

	onDestroy(() => {
		// clean after use
		if (lappDelegate) {
			lappDelegate.releaseInstance();
		}
	});

	// change expression
	// Happy, Smug, peeking, what, sad, Normal
	export function setExpression(expressionName: string) {
		if (live2dManager) {
			live2dManager.setExpression(expressionName);
		}
	}

	async function handleChatSubmit(message: string) {
		if (!message.trim() || isStreaming) return;

		currentSentence = '';
		sentenceKey = 0;
		isStreaming = true;

		conversationHistory.push({ role: 'user', content: message });
		let fullResponse = '';

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					message,
					history: conversationHistory
				})
			});

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			if (!reader) throw new Error('No response stream');

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				const lines = chunk.split('\n');

				for (const line of lines) {
					if (line.startsWith('data: ')) {
						const data = line.slice(6);
						try {
							const parsed = JSON.parse(data);
							if (parsed.type === 'sentence') {
								// Update sentence and increment key to trigger transition
								currentSentence = parsed.content;
								sentenceKey++;
								fullResponse += (fullResponse ? ' ' : '') + parsed.content;
							}
						} catch (e) {
							// skip
						}
					} else if (line.startsWith('[DONE]')) {
						isStreaming = false;
						// add to history
						if (fullResponse) {
							conversationHistory.push({ role: 'assistant', content: fullResponse });
						}
						// clear after final sentence displays
						setTimeout(() => {
							currentSentence = '';
							sentenceKey++;
						}, 2000);
						break;
					}
				}
			}
		} catch (error) {
			console.error('Chat error:', error);
			isStreaming = false;
			currentSentence = 'Brain temporarily on pause.';
			sentenceKey++;
			setTimeout(() => {
				currentSentence = '';
				sentenceKey++;
			}, 3000);
		}
	}
</script>

<div class="relative">
	<canvas
		{...restProps}
		bind:this={live2DCanvas}
		id="live2d4"
		class="h-[50vh] w-full md:h-[65vh] md:w-[40vw]"
		style="filter: var(--filter-settings);"
	></canvas>

	<FloatingText currentSentence={currentSentence} key={sentenceKey} />

	{#if ($avatarHovered === 'BH' || $avatarHovered === 'HH')&& !isStreaming}
		<div
			class="absolute left-0 right-0 bottom-4 z-20 px-4 md:bottom-2"
			transition:fade={{ duration: 300 }}
		>
			<VanishingInput
				placeholders={['Say hello!', 'Ask me anything...']}
				onsubmit={handleChatSubmit}
			/>
		</div>
	{/if}
</div>
