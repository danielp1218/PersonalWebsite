<script lang="ts">
	import { onMount } from 'svelte';
	import signatureSvg from '$lib/images/signature.svg?raw';

	let { duration = 0.4 } = $props<{ duration?: number }>();

	let pathData = $state<Array<{ d: string; strokeWidth: string }>>([]);
	let viewBox = $state('82.75 11.617000579833984 302.1518249511719 172');

	let animate = $state(false);
	let animationKey = $state(0);

	function parseSvgOnce() {
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(signatureSvg, 'image/svg+xml');
		const svgRoot = svgDoc.documentElement;

		viewBox = svgRoot.getAttribute('viewBox') ?? viewBox;

		const paths = svgDoc.querySelectorAll('path');
		pathData = Array.from(paths).map((p) => ({
			d: p.getAttribute('d') ?? '',
			strokeWidth: p.getAttribute('stroke-width') ?? '1'
		}));
	}

	onMount(() => {
		parseSvgOnce();

		// wait one frame so layout is committed before animating
		requestAnimationFrame(() => {
			animate = true;
		});
	});

	export function restart() {
		animate = false;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				animate = true;
			});
		});
	}
</script>

<div class="signature-container flex w-full items-center justify-center">
	{#if pathData.length}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			{viewBox}
			class="signature-svg"
			style="--dur:{duration}s"
		>
			{#each pathData as path, index}
				<path
					d={path.d}
					stroke-width={path.strokeWidth}
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="sig-path {animate ? 'animate' : ''}"
					style="--delay:{index * duration * 0.04}s"
				/>
			{/each}
		</svg>
	{/if}
</div>

<style>
	.signature-container {
		animation: fadeIn 0.3s ease-out;
	}

	.signature-svg {
		width: 100%;
		height: auto;
		contain: layout paint;
	}

	.sig-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
	}

	.sig-path.animate {
		animation: draw var(--dur) cubic-bezier(0.4, 0, 0.2, 1) forwards;
		animation-delay: var(--delay);
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sig-path {
			animation: none !important;
			stroke-dashoffset: 0;
		}
	}
</style>
