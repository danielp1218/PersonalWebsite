<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, children } = $props<{ href: string; children: Snippet }>();
</script>

<a href={href} class="text-primary underline transition-[font-weight] duration-300 hover:font-bold">
    {@render children()}
</a>