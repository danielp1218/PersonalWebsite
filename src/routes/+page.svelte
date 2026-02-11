<script lang="ts">
	import { fade } from 'svelte/transition';
	import Live2D from '$lib/components/live2D.svelte';
	import Contacts from '$lib/components/contacts.svelte';
	import ContentSection from '$lib/components/contentSection.svelte';
	import ThemeSelect from '$lib/components/themeSelect.svelte';
	import Company from '$lib/components/company.svelte';
	import AnimatedList from '$lib/components/animatedList.svelte';
	import { loading } from '$lib/stores/loadingStore';
	import Loading from '$lib/components/loading.svelte';
	import ProjectList from '$lib/components/projects/projectList.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<div class="flex w-full flex-col md:flex-row">
	<div
		class="relative w-full py-12 md:fixed md:top-0 md:left-0 md:z-10 md:h-screen md:w-[40%] md:content-center md:py-16"
		class:opacity-0={$loading}
	>
		<Live2D />
		<div class="text-secondary font-title right-0 left-0 m-4 text-center">
			<h1 class="text-2xl md:text-3xl">
				hi i'm <span class="text-primary font-black tracking-tight">Daniel Pu</span>
			</h1>
			<span class="my-4 flex w-full justify-center">
				<div
					class="from-secondary/0 via-secondary/40 to-secondary/0 h-px w-32 bg-linear-to-r"
				></div>
			</span>
			<h3 class="text-secondary/80 text-base italic md:text-lg">
				CS @ UWaterloo, incoming SWE @ Slash
			</h3>
		</div>
		<Contacts />
	</div>

	{#if $loading}
		<Loading />
	{:else}
		<div
			class="text-primary bg-secondary/5 relative flex min-h-screen w-full flex-col md:ml-[40%] md:w-[60%] md:flex-row"
		>
			<!-- Bookmark ribbon (desktop only) -->
			<div class="bookmark absolute top-0 right-8 z-20 hidden md:block" title="Nice find!">
				<div class="bookmark-ribbon"></div>
			</div>

			<!-- Theme sidebar (desktop only) -->
			<div class="notebook-sidebar relative hidden w-14 flex-none md:block">
				<div class="sticky top-6 mx-auto mt-16 w-10">
					<ThemeSelect />
				</div>
			</div>
			<div class="flex w-full flex-1 flex-col">
				<div class="absolute top-0 right-0 z-50 m-4 md:hidden">
					<ThemeSelect />
				</div>
				<div
					class="content-panel border-secondary/20 md:border-l-2 md:p-6 lg:p-8"
					in:fade={{ delay: 400, duration: 400 }}
				>
					<ContentSection id="about" title="about me" contentXPadding={true}>
						<AnimatedList style="list-style-type: '➢  ';">
							<li class="mt-4 mb-2 text-xl leading-relaxed">
								<p>
									Bachelor of Computer Science @
									<Company
										href="https://uwaterloo.ca/"
										name="UWaterloo"
										src="/images/logos/uwaterloo.webp"
									/>
								</p>
							</li>
							<li class="mb-2 text-xl leading-relaxed">
								<p>
									Prev. Research Programmer @
									<Company
										href="https://research.sunnybrook.ca/"
										name="Sunnybrook"
										src="/images/logos/sunnybrook.webp"
									/>
								</p>
							</li>
							<li class="mb-2 text-xl leading-relaxed">
								<strong>18×</strong> hackathon winner, <strong>23×</strong> participant
								<ul class="pl-5" style="list-style-type: '▹  ';">
									<li>
										<p>
											2× Finalist @
											<Company
												href="https://hackthenorth.com/"
												name="Hack the North"
												src="/images/logos/hackthenorth.svg"
											/>
										</p>
									</li>
									<li>
										<p>
											<span>
												1<span class="align-super text-[0.7em]">st</span> place @
											</span>
											<Company
												href="https://www.jamhacks.ca/"
												name="JAMHacks"
												src="/images/logos/jamhacks.png"
											/>
										</p>
									</li>
									<li>
										<p>
											Organizing
											<Company
												href="https://cxc.uwdatascience.ca"
												name="CxC"
												src="/images/logos/dsc.png"
											/>
											and
											<Company
												href="https://hackthe6ix.com/"
												name="HT6"
												src="/images/logos/ht6.jpg"
											/>
										</p>
									</li>
								</ul>
							</li>
							<li class="mb-2 text-xl leading-relaxed">
								I find <strong>backend</strong>, <strong>systems</strong>, <strong>AI/ML</strong>,
								and emerging tech really cool!
							</li>
							<li class="mb-2 text-xl leading-relaxed">
								In my free time, you can find me playing badminton, working on cool projects, or
								listening to music!
							</li>
						</AnimatedList>
					</ContentSection>

					<ContentSection id="projects" title="projects">
						<AnimatedList as="div" childSelector=".bento-grid > *" delay={100}>
							<ProjectList />
						</AnimatedList>
					</ContentSection>

					<Footer />
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.notebook-sidebar {
		background: linear-gradient(to right, rgba(128, 128, 128, 0.06) 0%, transparent 100%);
	}

	.bookmark {
		cursor: pointer;
	}

	.bookmark-ribbon {
		width: 28px;
		height: 80px;
		position: relative;
		background-color: var(--color-primary);
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
		transition:
			height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.3s ease,
			background-color 0.8s ease;
	}

	.bookmark-ribbon::after {
		content: '';
		position: absolute;
		bottom: -11px;
		left: 0;
		width: 0;
		height: 0;
		border-left: 14px solid transparent;
		border-right: 14px solid transparent;
		border-top: 12px solid var(--color-primary);
		transition: border-top-color 0.8s ease;
	}

	.bookmark:hover .bookmark-ribbon {
		height: 100px;
		box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.2);
	}

	.bookmark:active .bookmark-ribbon {
		height: 70px;
		transition-duration: 0.1s;
	}
</style>
