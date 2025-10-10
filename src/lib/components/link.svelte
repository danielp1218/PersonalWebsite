<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, children } = $props<{ href: string; children: Snippet }>();
</script>

<a
	{href}
	target="_blank"
	class="relative w-fit mx-2 no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-secondary/20 after:transition-colors after:duration-300 after:content-[''] hover:after:bg-secondary/80 text-primary"
>
	{@render children()}
</a>