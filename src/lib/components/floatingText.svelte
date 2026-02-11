<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';

	let {
		currentSentence = '',
		key = 0 // Used to trigger transition on sentence change
	}: {
		currentSentence: string;
		key: number;
	} = $props();
</script>

{#if currentSentence}
	{#key key}
		<div
			class="absolute top-0 left-1/2 z-0 max-w-4xl -translate-x-1/2 px-4 text-center md:max-w-5xl"
			in:fly={{ y: 30, duration: 600, easing: cubicOut, delay: 300 }}
			out:fly={{ y: -30, duration: 500, easing: cubicIn, opacity: 0 }}
		>
			<p
				class="text-primary font-title text-xl leading-relaxed wrap-break-word md:text-3xl"
				style="text-shadow: 0 0 8px rgb(var(--color-background)), 0 0 16px rgb(var(--color-background));"
			>
				{currentSentence}
			</p>
		</div>
	{/key}
{/if}
