<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, id, children } = $props<{ title: string; id: string; children: Snippet }>();
</script>

<section {id} class="px-8 pt-20 md:px-[20%]">
	<div class="mx-auto max-w-6xl">
		<h2 class="font-title text-primary mb-12 text-4xl">{title}</h2>
		<div class="text-secondary font-mono text-xl leading-relaxed">
			{@render children()}
		</div>
	</div>
</section>
