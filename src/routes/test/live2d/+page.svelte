<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
</script>

<div class="bg-background pointer-events-none flex h-screen w-full items-center justify-center">
	<Live2D />
	<div class="bg-primary absolute right-0 bottom-0 left-0 h-[50vh]"></div>
</div>
