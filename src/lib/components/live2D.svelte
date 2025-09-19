<script lang="ts">
	import { onMount } from 'svelte';

	let live2DCanvas: HTMLCanvasElement | null;

	onMount(async () => {
		console.log('onmount live2D');

		if (window && live2DCanvas) {
			live2DCanvas.width = window.innerWidth;
		}
		if (!window.Live2D) {
			await import('$lib/util/live2d/live2d_bundle.js' as any);
		}

		await import('$lib/util/live2d/initModel.js' as any);
	});
</script>

<div id="model-container">
	<canvas id="live2d2" height="300" width="600"></canvas>
	<canvas bind:this={live2DCanvas} id="live2d4" height="1000" width="700"></canvas>
</div>
