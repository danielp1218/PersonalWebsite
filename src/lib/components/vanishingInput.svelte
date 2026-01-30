<script lang="ts">
	import { onMount } from 'svelte';
	// Define interfaces
	interface PixelData {
		x: number;
		y: number;
		color: string;
	}

	interface AnimatedPixel extends PixelData {
		r: number;
	}

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
	let canvasRef: HTMLCanvasElement | undefined = $state();
	let inputRef: HTMLInputElement | undefined = $state();
	let currentPlaceholder = $state(0);
	let animating = $state(false);
	let intervalId: number | null = $state(null);
	let newDataRef: AnimatedPixel[] = $state([]);
	let animationFrameId: number | null = $state(null);

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

	function draw(): void {
		if (!inputRef || !canvasRef) return;

		const canvas = canvasRef;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const computedStyles = getComputedStyle(inputRef);

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);

		const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
		ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
		// Use theme primary color for canvas text
		const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
		ctx.fillStyle = `rgb(${primaryColor})`;
		ctx.fillText(value, 16, 40);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: PixelData[] = [];

		for (let t = 0; t < 800; t++) {
			let i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				let e = i + 4 * n;
				if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
					newData.push({
						x: n,
						y: t,
						color: `rgba(${pixelData[e]}, ${pixelData[e + 1]}, ${pixelData[e + 2]}, ${pixelData[e + 3]})`
					});
				}
			}
		}
		newDataRef = newData.map(({ x, y, color }) => ({ x, y, r: 1, color }));
	}

	function animate(center: number, radius: number, maxRadius: number): void {
		animationFrameId = requestAnimationFrame(() => {
			const newArr: AnimatedPixel[] = [];
			const currentRadius = Math.min(radius, maxRadius);
			const left = Math.max(0, Math.floor(center - currentRadius));
			const width = Math.min(800, Math.ceil(currentRadius * 2));
			for (const current of newDataRef) {
				const inBand = Math.abs(current.x - center) <= currentRadius;
				if (!inBand) {
					newArr.push(current);
				} else {
					if (current.r <= 0) {
						current.r = 0;
						continue;
					}
					current.x += Math.random() > 0.5 ? 1 : -1;
					current.y += Math.random() > 0.5 ? 1 : -1;
					current.r -= 0.05 * Math.random();
					newArr.push(current);
				}
			}
			newDataRef = newArr;
			const ctx = canvasRef?.getContext('2d');
			if (ctx) {
				ctx.clearRect(left, 0, width, 800);
				newDataRef.forEach(({ x, y, r, color }) => {
					if (Math.abs(x - center) <= currentRadius) {
						ctx.beginPath();
						ctx.rect(x, y, r, r);
						ctx.fillStyle = color;
						ctx.strokeStyle = color;
						ctx.stroke();
					}
				});
			}
			if (newDataRef.length > 0) {
				animate(center, radius + 8, maxRadius);
			} else {
				value = '';
				animating = false;
				setTimeout(() => {
					inputRef?.focus();
				}, 100);
			}
		});
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (value === '') return;
		if (e.key === 'Enter' && !animating) {
			vanishAndSubmit();
		}
	}

	function vanishAndSubmit(): void {
		if (!value) return;

		const submittedValue = value; // Capture value before animation
		animating = true;
		draw();

		if (newDataRef.length > 0) {
			// Animation with pixels found
			const xs = newDataRef.map(({ x }) => x);
			const minX = Math.min(...xs);
			const maxX = Math.max(...xs);
			const center = (minX + maxX) / 2;
			const maxRadius = Math.max(center - minX, maxX - center);
			animate(center, 0, maxRadius);
		} else {
			// No pixels found, skip animation
			value = '';
			animating = false;
			setTimeout(() => {
				inputRef?.focus();
			}, 100);
		}

		// Always call onsubmit regardless of animation
		onsubmit?.(submittedValue);
	}

	function handleSubmit(e: Event): void {
		e.preventDefault();
		vanishAndSubmit();
	}

	function handleInput(e: Event): void {
		if (!animating) {
			onchange?.({ target: { value: (e.target as HTMLInputElement).value } });
		}
	}

	onMount(() => {
		inputRef?.focus();
		changePlaceholder();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	});
</script>

<form
	class="relative mx-auto h-12 w-[70%] max-w-xl overflow-hidden rounded-full bg-background/80 backdrop-blur-md border-2 border-secondary/20 hover:border-secondary/40 shadow-md transition-all duration-200 {value
		? 'bg-background/90'
		: ''}"
	onsubmit={handleSubmit}
>
	<!-- Canvas Element -->
	<canvas
		bind:this={canvasRef}
		class="pointer-events-none absolute top-[20%] left-2 origin-top-left scale-50 pr-20 text-base sm:left-8 transition-none {animating
			? 'opacity-100'
			: 'opacity-0'}"
	></canvas>

	<!-- Text Input -->
	<input
		bind:this={inputRef}
		bind:value
		disabled={animating}
		type="text"
		class="relative z-50 size-full rounded-full border-none bg-transparent pr-20 pl-4 text-sm text-primary font-content focus:ring-0 focus:outline-none sm:pl-10 sm:text-base {animating
			? 'text-transparent'
			: ''}"
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
				<p class="w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-secondary/60 font-content sm:pl-10 sm:text-base">
					{placeholders[currentPlaceholder]}
				</p>
			{/key}
		{/if}
	</div>
</form>
