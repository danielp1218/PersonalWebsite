<script lang="ts">
    let { duration } = $props<{ duration?: number }>();

	let svgElement: SVGElement | undefined = $state();
	let animationKey = $state(0);
	let pathData: Array<{ d: string; strokeWidth: string }> = $state([]);
	let viewBox = $state("");

	// Function to load path data from the SVG file
	async function loadPathData() {
		try {
			const response = await fetch('/images/signature.svg');
			const svgText = await response.text();
			
			// Parse the SVG content
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
			const svgRoot = svgDoc.documentElement;
			
			// Get viewBox from the original SVG
			viewBox = svgRoot.getAttribute('viewBox') || "82.75 11.617000579833984 302.1518249511719 172";
			
			// Extract all path elements
			const paths = svgDoc.querySelectorAll('path');
			pathData = Array.from(paths).map(path => ({
				d: path.getAttribute('d') || '',
				strokeWidth: path.getAttribute('stroke-width') || '1'
			}));
		} catch (error) {
			console.error('Failed to load signature SVG:', error);
			// Fallback to default viewBox if loading fails
			viewBox = "82.75 11.617000579833984 302.1518249511719 172";
			pathData = [];
		}
	}

	// Load path data when component mounts
	$effect(() => {
		loadPathData();
	});

	// Function to restart animation
	export function restart() {
		animationKey++;
	}
</script>

{#key animationKey}
<div class="flex items-center justify-center w-full">
	<svg 
		bind:this={svgElement}
		xmlns="http://www.w3.org/2000/svg" 
		viewBox={viewBox}
		class="w-full h-auto"
	>
		{#each pathData as path, index}
			<path 
				d={path.d} 
				stroke-width={path.strokeWidth} 
				stroke="black" 
				fill="none" 
				stroke-linecap="round"
				stroke-dasharray="1000"
				stroke-dashoffset="1000"
			>
				<animate 
					attributeName="stroke-dashoffset" 
					from="1000" 
					to="0" 
					dur="{duration}s" 
					begin="{index * 0.02}s"
					fill="freeze"
				/>
			</path>
		{/each}
	</svg>
</div>
{/key}
