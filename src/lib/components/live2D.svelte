<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let live2DCanvas: HTMLCanvasElement | null;
	let lappDelegate: any = null;
	let live2dManager: any = null;

	onMount(async () => {
		const { Live2DCubismCore } = await import('$lib/live2d/Core/live2dcubismcore.min.js');
		
		(globalThis as any).Live2DCubismCore = Live2DCubismCore;
		
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
	function setExpression(expressionName: string) {
		if (live2dManager) {
			live2dManager.setExpression(expressionName);
		}
	}

</script>

<canvas bind:this={live2DCanvas} id="live2d4" class="absolute bg-transparent left-0 top-0 z-10"></canvas>


