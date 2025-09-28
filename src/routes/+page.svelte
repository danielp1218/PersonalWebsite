<script lang="ts">
	import { fade } from 'svelte/transition';
	import Live2D from '$lib/components/live2D.svelte';
	import Contacts from '$lib/components/contacts.svelte';
	import ContentSection from '$lib/components/contentSection.svelte';
	import ThemeSelect from '$lib/components/themeSelect.svelte';
	import Company from '$lib/components/company.svelte';
</script>

<div class="flex w-full flex-col md:flex-row">
	<div
		class="relative w-full py-16 md:fixed md:top-0 md:left-0 md:z-10 md:h-screen md:w-[40%] md:content-center"
	>
		<Live2D />
		<div
			class="text-secondary font-title right-0 left-0 m-4 text-center text-3xl"
		>
			<h1>hi i'm <span class="text-primary font-black">daniel pu</span></h1>
			<span class="flex w-full justify-center">
				<hr class="border-secondary m-4 w-24 border-t-2" />
			</span>
			<h3 class="text-secondary text-lg italic">cs @ uwaterloo, looking for S26 co-ops</h3>
		</div>
		<Contacts />
	</div>

	<div
		class="text-primary min-h-screen w-full bg-gray-400/10 md:pl-16 md:ml-[40%] md:w-[60%]"
	>
		<div class="absolute md:fixed top-0 right-0 md:left-[40%] z-50 m-4 md:w-10">
			<ThemeSelect />
		</div>
		<div class="border-background border-l-4 md:p-8">
			<ContentSection id="about" title="about me">
				<ul class="text-primary pl-5" style="list-style-type: '➢  ';">
					<li class="mt-4 mb-2 text-xl leading-relaxed">
						<p class="flex flex-wrap">
							Bachelor of Computer Science @ <Company href="https://uwaterloo.ca/" name="UWaterloo" src="/images/logos/uwaterloo.webp" />
						</p>
					</li>
					<li class="mt-4 mb-2 text-xl leading-relaxed">
						<p class="flex flex-wrap">
							Prev. Research Programmer @ 
							<Company href="https://research.sunnybrook.ca/" name="Sunnybrook" src="/images/logos/sunnybrook.webp" />
						</p>
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						<strong>15×</strong> hackathon winner, <strong>20×</strong> participant
						<ul class="pl-5" style="list-style-type: '▹  ';">
							<li>
								<p class="flex flex-wrap">
									2× Finalist @ 
									<Company href="https://hackthenorth.com/" name="Hack the North" src="/images/logos/hackthenorth.svg" />
								</p>
							</li>
							<li>
								<p class="flex flex-wrap">
									1<span class="text-[0.7em]">st</span> &nbsp;place @ 
									<Company href="https://www.jamhacks.ca/" name="JAMHacks" src="/images/logos/jamhacks.png" />
								</p>
							</li>
							<li>
								<p class="flex break-words flex-wrap">
									Organizing
									<Company href="https://www.uwdatascience.ca/cxc" name="CxC" src="/images/logos/dsc.png" />,&nbsp;
									<span>Canada's largest student</span> run data hackathon
								</p>
							</li>
						</ul>
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						Passionate about <strong>full-stack</strong>, <strong>AI/ML</strong>, and all things
						tech.
					</li>
					<li class="mb-2 text-xl leading-relaxed">
						In my free time, you can find me playing badminton, working on
						cool projects, or listening to music!
					</li>
				</ul>
			</ContentSection>

			<ContentSection id="skills" title="skills">
				<p class="text-primary">coming soon...</p>
			</ContentSection>

			<ContentSection id="projects" title="projects">
				<p class="text-primary">coming soon...</p>
			</ContentSection>
		</div>
	</div>
</div>
