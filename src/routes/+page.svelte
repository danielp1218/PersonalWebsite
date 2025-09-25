<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<Live2D />

<div id="home" class="bg-background text-primary h-full w-full ">
	<div class="flex h-screen items-center justify-center">
		<div class="text-secondary font-title absolute bottom-[10%] left-0 right-0 text-center text-3xl mix-blend-difference">
			<h1>hi i'm <span class="text-primary">daniel pu</span></h1>
			<hr class="my-4 border-t-2 border-secondary w-24 mx-auto" />
			<h3 class="text-secondary text-lg italic">cs @ uwaterloo, looking for s26 internships</h3>
		</div>
	</div>

	<div id="about" class="bg-background min-h-screen px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-secondary font-title mb-12 text-center text-6xl">about me</h2>
			<p class="text-primary text-xl leading-relaxed text-center">
				passionate about full-stack development, ai, and all things tech.
			</p>
		</div>
	</div>

	<div id="projects" class="bg-background min-h-screen px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-secondary font-title mb-12 text-center text-6xl">projects</h2>
			<p class="text-primary text-xl leading-relaxed text-center">
				coming soon...
			</p>
		</div>
	</div>
</div>

<Navbar />