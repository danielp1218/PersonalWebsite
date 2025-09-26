<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
	import Navbar from '$lib/components/navbar.svelte';
    import Contacts from '$lib/components/contacts.svelte';
</script>

<div class="flex w-full">
	<div class="fixed left-0 top-0 z-10 h-screen w-[50%]">
		<Live2D />
		<div
			class="text-secondary font-title left-0 right-0 text-center text-3xl mix-blend-difference mb-4"
		>
			<h1>hi i'm <span class="text-primary">daniel pu</span></h1>
			<span class="w-full flex justify-center"><hr class="m-4 w-24 border-t-2 border-secondary" /></span>
			<h3 class="text-lg italic text-secondary">cs @ uwaterloo, looking for s26 internships</h3>
		</div>
		<Contacts />
	</div>

	<div
		class="ml-[50%] min-h-screen w-[50%] bg-gray-400/30 p-8 text-primary"
	>
		<div id="about" class="flex min-h-screen items-center px-8 py-20">
			<div class="mx-auto max-w-6xl">
				<h2 class="font-title text-center text-4xl text-secondary">about me</h2>
				<p class="text-center text-xl leading-relaxed text-primary">
					passionate about full-stack development, ai, and all things tech.
				</p>
			</div>
		</div>

		<div id="projects" class="flex min-h-screen items-center px-8 py-20">
			<div class="mx-auto max-w-6xl">
				<h2 class="font-title mb-12 text-center text-4xl text-secondary">projects</h2>
				<p class="text-center text-xl leading-relaxed text-primary">coming soon...</p>
			</div>
		</div>
	</div>
</div>
<Navbar />