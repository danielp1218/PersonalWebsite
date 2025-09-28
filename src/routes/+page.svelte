<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
	import Contacts from '$lib/components/contacts.svelte';
	import ContentSection from '$lib/components/contentSection.svelte';
	import ThemeSelect from '$lib/components/themeSelect.svelte';
</script>

<div class="flex w-full flex-col md:flex-row">
	<div
		class="relative w-full py-16 md:fixed md:top-0 md:left-0 md:z-10 md:h-screen md:w-[40%] md:content-center"
	>
		<Live2D />
		<div
			class="text-secondary font-title right-0 left-0 m-4 text-center text-3xl mix-blend-difference"
		>
			<h1>hi i'm <span class="text-primary">daniel pu</span></h1>
			<span class="flex w-full justify-center"
				><hr class="border-secondary m-4 w-24 border-t-2" /></span
			>
			<h3 class="text-secondary text-lg italic">cs @ uwaterloo, looking for s26 internships</h3>
		</div>
		<Contacts />
	</div>

	<div class="text-primary min-h-screen w-full bg-gray-400/10 pl-16 md:ml-[40%] md:w-[60%]">
		<div class="fixed top-0 left-[40%] z-50 m-4">
			<ThemeSelect />
		</div>
		<div class="border-background border-l-4 p-8">
			<ContentSection id="about" title="about me">
				<ul class="text-secondary pl-5 font-mono" style="list-style-type: '➢  ';">
					<li class="mt-4 mb-2 text-xl leading-relaxed">
						Studying <strong>Computer Science</strong> at the
						<strong>University of Waterloo</strong> (1A term).
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						<strong>15×</strong> hackathon winner, <strong>20×</strong> participant.
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						Passionate about <strong>full-stack</strong>, <strong>AI/ML</strong>, and all things
						tech.
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						In my free time, you can find me playing <strong>badminton</strong>, working on
						<strong>cool projects</strong>, or listening to <strong>music</strong>.
					</li>
				</ul>
			</ContentSection>

			<ContentSection id="skills" title="skills">
				<p>coming soon...</p>
			</ContentSection>

			<ContentSection id="projects" title="projects">
				<p>coming soon...</p>
			</ContentSection>
		</div>
	</div>
</div>
