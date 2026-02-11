<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import VanishingInput from './vanishingInput.svelte';
	import { avatarHovered } from '$lib/stores/avatarHovered';

	let { 
		currentSentence = $bindable(''),
		isStreaming = $bindable(false),
		...restProps 
	}: {
		currentSentence?: string;
		isStreaming?: boolean;
		[key: string]: any;
	} = $props();

	let live2DCanvas: HTMLCanvasElement | null;
	let lappDelegate: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let live2dManager: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
	let sentenceKey = $state(0);
	let conversationHistory = $state<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
	let toolCallQueue = $state<string[]>([]);
	let isProcessingToolCall = $state(false);

	// Map tool names to friendly display messages
	const toolDisplayNames: Record<string, string> = {
		getProjects: '🔧 Looking up my projects...',
		getEducation: '🔧 Checking my education...',
		getWorkExperience: '🔧 Looking at my experience...',
		getHackathonStats: '🔧 Getting hackathon stats...',
		getContactInfo: '🔧 Finding contact info...'
	};

	// Process tool call queue with minimum display duration
	async function processToolCallQueue() {
		if (isProcessingToolCall || toolCallQueue.length === 0) return;

		isProcessingToolCall = true;

		while (toolCallQueue.length > 0) {
			const toolName = toolCallQueue[0];
			const displayMessage = toolDisplayNames[toolName] || `🔧 Processing ${toolName}...`;

			// Display tool call message
			currentSentence = displayMessage;
			sentenceKey++;

			// Enforce minimum 800ms display duration
			await new Promise(resolve => setTimeout(resolve, 800));

			// Remove from queue
			toolCallQueue = toolCallQueue.slice(1);
		}

		isProcessingToolCall = false;
	}

	// Add tool call to queue
	function addToolCall(toolName: string) {
		toolCallQueue = [...toolCallQueue, toolName];
		processToolCallQueue();
	}

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
							
							if (parsed.type === 'tool-call') {
								// Queue tool call for display
								addToolCall(parsed.name);
							} else if (parsed.type === 'error') {
								// Display error with tool context
								const errorMessage = parsed.tool 
									? `⚠️ Error checking ${parsed.tool}`
									: '⚠️ Error processing request';
								currentSentence = errorMessage;
								sentenceKey++;
								
								// Display error for 1000ms minimum
								await new Promise(resolve => setTimeout(resolve, 1000));
							} else if (parsed.type === 'sentence') {
								// Wait for any pending tool calls to finish displaying
								while (isProcessingToolCall || toolCallQueue.length > 0) {
									await new Promise(resolve => setTimeout(resolve, 100));
								}
								
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
	{#if ($avatarHovered === 'BH' || $avatarHovered === 'HH') && !isStreaming}
		<div
			class="absolute left-0 right-0 top-4 z-20 px-4 md:top-2"
			transition:fade={{ duration: 300 }}
		>
			<VanishingInput
				placeholders={['Say hello!', 'Ask me anything...']}
				onsubmit={handleChatSubmit}
			/>
		</div>
	{/if}

	<canvas
		{...restProps}
		bind:this={live2DCanvas}
		id="live2d4"
		class="h-[50vh] w-full md:h-[65vh] md:w-[40vw]"
		style="filter: var(--filter-settings);"
	></canvas>
</div>
