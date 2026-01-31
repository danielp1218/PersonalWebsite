<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Props
	let {
		value = $bindable(''),
		placeholders = ['Placeholder 1', 'Placeholder 2', 'Placeholder 3'],
		onsubmit,
		onchange
	}: {
		value?: string;
		placeholders?: string[];
		onsubmit?: (text: string) => void;
		onchange?: (event: { target: { value: string } }) => void;
	} = $props();

	// Reactive state
	let inputRef: HTMLInputElement | undefined = $state();
	let currentPlaceholder = $state(0);
	let intervalId: number | null = $state(null);

	// Show placeholder when there's no text
	let showPlaceholder = $derived(!value);

	function changePlaceholder(): void {
		intervalId = window.setInterval(() => {
			currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
		}, 3000);
	}

	function handleVisibilityChange(): void {
		if (document.visibilityState !== 'visible' && intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		} else if (document.visibilityState === 'visible') {
			changePlaceholder();
		}
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' && value) {
			handleSubmit(e);
		}
	}

	function handleSubmit(e: Event): void {
		e.preventDefault();
		if (!value) return;

		const submittedValue = value;
		value = '';
		onsubmit?.(submittedValue);

		setTimeout(() => {
			inputRef?.focus();
		}, 100);
	}

	function handleInput(e: Event): void {
		onchange?.({ target: { value: (e.target as HTMLInputElement).value } });
	}

	onMount(() => {
		inputRef?.focus();
		changePlaceholder();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<form
	class="relative mx-auto h-12 w-[70%] max-w-xl overflow-hidden rounded-full bg-background/80 backdrop-blur-md border-2 border-primary/20 hover:border-secondary/40 shadow-md transition-all duration-200 {value
		? 'bg-background/90'
		: ''}"
	onsubmit={handleSubmit}
>
	<!-- Text Input -->
	<input
		bind:this={inputRef}
		bind:value
		type="text"
		class="relative z-50 size-full rounded-full border-none bg-transparent pr-20 pl-4 text-sm text-primary font-content focus:ring-0 focus:outline-none sm:pl-10 sm:text-base"
		onkeydown={handleKeyDown}
		oninput={handleInput}
	/>

	<!-- Submit Button -->
	<button
		disabled={!value}
		type="submit"
		class="absolute top-1/2 right-2 z-50 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary hover:scale-110 active:scale-95 transition-all duration-200 disabled:bg-secondary/20"
		aria-label="Submit"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-4 text-background"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M5 12l14 0"
				style="stroke-dasharray: 50%; stroke-dashoffset: {value
					? '0'
					: '50%'}; transition: stroke-dashoffset 0.3s linear;"
			/>
			<path d="M13 18l6 -6" />
			<path d="M13 6l6 6" />
		</svg>
	</button>

	<!-- Placeholder Text -->
	<div class="pointer-events-none absolute inset-0 flex items-center rounded-full">
		{#if showPlaceholder}
			{#key currentPlaceholder}
				<p
					in:fly={{ y: 10, duration: 500 }}
					out:fly={{ y: -10, duration: 500 }}
					class="w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-secondary/60 font-content sm:pl-10 sm:text-base"
				>
					{placeholders[currentPlaceholder]}
				</p>
			{/key}
		{/if}
	</div>
</form>
