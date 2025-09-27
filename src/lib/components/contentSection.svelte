<script lang="ts">
	import type { Snippet } from "svelte";

    let { title, id, children } = $props<{ title: string, id: string, children: Snippet}>();
</script>

<section id={id} class="px-8 pt-20 md:px-[20%]">
    <div class="mx-auto max-w-6xl">
        <h2 class="font-title mb-12 text-4xl text-primary">{title}</h2>
        <div class="font-mono text-xl leading-relaxed text-secondary">
            {@render children()}
        </div>
    </div>
</section>