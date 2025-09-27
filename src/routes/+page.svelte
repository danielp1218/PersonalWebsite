<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
    import Contacts from '$lib/components/contacts.svelte';
	import ContentSection from '$lib/components/contentSection.svelte';
</script>

<div class="flex w-full flex-col md:flex-row">
	<div
		class="relative py-16 w-full md:h-screen md:content-center md:fixed md:left-0 md:top-0 md:z-10 md:w-[40%]"
	>
		<Live2D />
		<div
			class="text-secondary font-title left-0 right-0 m-4 text-center text-3xl mix-blend-difference"
		>
			<h1>hi i'm <span class="text-primary">daniel pu</span></h1>
			<span class="flex w-full justify-center"><hr class="m-4 w-24 border-t-2 border-secondary" /></span>
			<h3 class="text-lg italic text-secondary">cs @ uwaterloo, looking for s26 internships</h3>
		</div>
		<Contacts />
	</div>

	<div
		class="min-h-screen w-full bg-gray-400/10 p-8 text-primary md:ml-[40%] md:w-[60%]"
	>
		<ContentSection id="about" title="about me">
			<ul class="pl-5 text-secondary font-mono" style="list-style-type: '➢  ';">
				<li class="text-xl mb-2 mt-4 leading-relaxed">
					Studying <strong>Computer Science</strong> at the <strong>University of Waterloo</strong> (1A term).
				</li>
				<li class="mb-2 text-xl leading-relaxed">
					<strong>15×</strong> hackathon winner, <strong>20×</strong> participant.
				</li>
				<li class="text-xl mb-2 leading-relaxed">
					Passionate about <strong>full-stack</strong>, <strong>AI/ML</strong>, and all things tech.
				</li>
				<li class="text-xl mb-2 leading-relaxed">
					In my free time, you can find me playing <strong>badminton</strong>, working on <strong>cool projects</strong>, or listening to <strong>music</strong>.
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