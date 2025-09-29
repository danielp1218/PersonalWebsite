<script lang="ts">
	import { onMount } from 'svelte';

	let containerElement: HTMLUListElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const allItems = Array.from(containerElement.querySelectorAll('li'));
						const index = allItems.indexOf(entry.target as HTMLLIElement);
						
						setTimeout(() => {
							entry.target.classList.add('visible');
						}, index * 150);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px 50px 0px'
			}
		);

		// Wait for DOM to be ready, then observe items
		setTimeout(() => {
			const listItems = containerElement.querySelectorAll('li');
			listItems.forEach((item) => {
				item.classList.add('fade-in-item');
				observer.observe(item);
			});
		}, 100);

		return () => observer?.disconnect();
	});
</script>

<ul bind:this={containerElement} class="text-primary pl-5" style="list-style-type: '➢  ';">
	<slot></slot>
</ul>

<style>
	:global(.fade-in-item) {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s ease-out, transform 0.8s ease-out;
	}
	
	:global(.fade-in-item.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
