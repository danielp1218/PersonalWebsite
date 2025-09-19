<script lang="ts">
	let scrollY = 0;
</script>

<nav
	class="fixed right-[20%] left-[20%] h-16"
	style="top: {scrollY > 100 ? '2.5rem' : '-2.5rem'}; transition: top 0.5s ease-in-out;"
>
	<div
		class="bg-secondary/60 shadow-secondary/50 rounded-full border border-white/20 shadow-md backdrop-blur-md backdrop-saturate-50"
	>
		<ul class="text-primary font-title flex h-full flex-row items-center justify-around text-2xl">
			<li class="cursor-pointer p-4 hover:underline hover:underline-offset-8">
				<a href="#home">Home</a>
			</li>
			<li class="cursor-pointer p-4 hover:underline hover:underline-offset-8">
				<a href="#about">About</a>
			</li>
			<li class="cursor-pointer p-4 hover:underline hover:underline-offset-8">
				<a href="#projects">Projects</a>
			</li>
			<li class="cursor-pointer p-4 hover:underline hover:underline-offset-8">
				<a href="#contact">Contact</a>
			</li>
		</ul>
	</div>
</nav>

<svelte:window bind:scrollY />
