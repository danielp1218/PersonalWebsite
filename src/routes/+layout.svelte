<script lang="ts">
	import '../app.css';
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { loading } from '$lib/stores/loadingStore';
	import Loading from '$lib/components/loading.svelte';
	import { fade } from 'svelte/transition';
	let { children } = $props();

	function getColour(color: number[]) {
		return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}
</script>

{#if $loading}
	<Loading />
{:else}
	<div
		in:fade
		class="bg-background h-full min-h-screen w-full"
		style="--color-primary: {getColour(themeStore.palette[0])}; 
		--color-secondary: {getColour(themeStore.palette[1])};
		--color-background: {getColour(themeStore.palette[2])}; 
		--filter-settings: {themeStore.filter};"
	>
		{@render children()}
	</div>
{/if}
