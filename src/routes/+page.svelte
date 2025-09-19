<script lang="ts">
	import Live2D from '$lib/components/live2D.svelte';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<div id="home" class="bg-background text-primary h-full w-full">
	<div class="flex h-screen items-center justify-center">
		<h2 class="text-secondary font-title absolute bottom-36 left-8 text-8xl">HI! I'M</h2>
		<h1 class="text-primary font-title absolute bottom-8 left-8 text-9xl mix-blend-difference">
			DANIEL PU
		</h1>
		<div class="font-title text-center">
			<h2 class="text-secondary stroke-primary stroke-2 text-6xl">DEVELOPER</h2>
			<h2 class="text-primary text-6xl">DEVELOPER</h2>
			<h2 class="text-secondary stroke-primary stroke-2 text-6xl">IDEATOR</h2>
		</div>
	</div>

	<div id="about" class="bg-background min-h-screen px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-secondary font-title mb-12 text-center text-6xl">ABOUT ME</h2>

			<div class="grid items-center gap-12 md:grid-cols-2">
				<div class="space-y-6">
					<p class="text-primary text-xl leading-relaxed">
						I'm a passionate developer who loves creating innovative solutions and bringing ideas to
						life through code. With a strong foundation in modern web technologies, I enjoy tackling
						complex challenges and learning new skills.
					</p>

					<div class="space-y-4">
						<h3 class="text-secondary font-title text-2xl">SKILLS & TECHNOLOGIES</h3>
						<div class="grid grid-cols-2 gap-4">
							<div class="bg-secondary/10 rounded-lg p-4">
								<h4 class="text-secondary mb-2 font-semibold">Frontend</h4>
								<p class="text-primary text-sm">React, Svelte, TypeScript, Tailwind CSS</p>
							</div>
							<div class="bg-secondary/10 rounded-lg p-4">
								<h4 class="text-secondary mb-2 font-semibold">Backend</h4>
								<p class="text-primary text-sm">Node.js, Python, Express, FastAPI</p>
							</div>
							<div class="bg-secondary/10 rounded-lg p-4">
								<h4 class="text-secondary mb-2 font-semibold">Database</h4>
								<p class="text-primary text-sm">MongoDB, PostgreSQL, SQLite</p>
							</div>
							<div class="bg-secondary/10 rounded-lg p-4">
								<h4 class="text-secondary mb-2 font-semibold">Tools</h4>
								<p class="text-primary text-sm">Git, Docker, VS Code, Figma</p>
							</div>
						</div>
					</div>
				</div>

				<div class="flex justify-center">
					<div class="bg-secondary/5 rounded-full p-8">
						<div class="bg-secondary/20 flex h-64 w-64 items-center justify-center rounded-full">
							<span class="text-secondary text-4xl">👨‍💻</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="projects" class="bg-background min-h-screen px-8 py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-secondary font-title mb-12 text-center text-6xl">PROJECTS</h2>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Project 1 -->
				<div
					class="bg-secondary/5 hover:bg-secondary/10 rounded-lg p-6 transition-colors duration-300"
				>
					<div class="bg-secondary/20 mb-4 flex h-48 items-center justify-center rounded-lg">
						<span class="text-secondary text-2xl">🌐</span>
					</div>
					<h3 class="text-secondary font-title mb-2 text-xl">Personal Website</h3>
					<p class="text-primary mb-4 text-sm">
						A modern, responsive portfolio website built with SvelteKit and Tailwind CSS. Features
						smooth animations and a clean design.
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">SvelteKit</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">TypeScript</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">Tailwind</span>
					</div>
					<div class="flex space-x-2">
						<button
							class="bg-secondary text-background hover:bg-secondary/80 rounded px-4 py-2 text-sm transition-colors"
						>
							View Live
						</button>
						<button
							class="border-secondary text-secondary hover:bg-secondary/10 rounded border px-4 py-2 text-sm transition-colors"
						>
							GitHub
						</button>
					</div>
				</div>

				<!-- Project 2 -->
				<div
					class="bg-secondary/5 hover:bg-secondary/10 rounded-lg p-6 transition-colors duration-300"
				>
					<div class="bg-secondary/20 mb-4 flex h-48 items-center justify-center rounded-lg">
						<span class="text-secondary text-2xl">📱</span>
					</div>
					<h3 class="text-secondary font-title mb-2 text-xl">Task Manager App</h3>
					<p class="text-primary mb-4 text-sm">
						A full-stack task management application with real-time updates, user authentication,
						and collaborative features.
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">React</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">Node.js</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">MongoDB</span>
					</div>
					<div class="flex space-x-2">
						<button
							class="bg-secondary text-background hover:bg-secondary/80 rounded px-4 py-2 text-sm transition-colors"
						>
							View Live
						</button>
						<button
							class="border-secondary text-secondary hover:bg-secondary/10 rounded border px-4 py-2 text-sm transition-colors"
						>
							GitHub
						</button>
					</div>
				</div>

				<!-- Project 3 -->
				<div
					class="bg-secondary/5 hover:bg-secondary/10 rounded-lg p-6 transition-colors duration-300"
				>
					<div class="bg-secondary/20 mb-4 flex h-48 items-center justify-center rounded-lg">
						<span class="text-secondary text-2xl">🤖</span>
					</div>
					<h3 class="text-secondary font-title mb-2 text-xl">AI Chat Bot</h3>
					<p class="text-primary mb-4 text-sm">
						An intelligent chatbot powered by machine learning, capable of natural language
						processing and contextual responses.
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">Python</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">FastAPI</span>
						<span class="bg-secondary/20 text-secondary rounded px-2 py-1 text-xs">OpenAI</span>
					</div>
					<div class="flex space-x-2">
						<button
							class="bg-secondary text-background hover:bg-secondary/80 rounded px-4 py-2 text-sm transition-colors"
						>
							View Live
						</button>
						<button
							class="border-secondary text-secondary hover:bg-secondary/10 rounded border px-4 py-2 text-sm transition-colors"
						>
							GitHub
						</button>
					</div>
				</div>
			</div>

			<div class="mt-12 text-center">
				<button
					class="bg-secondary text-background font-title hover:bg-secondary/80 rounded-lg px-8 py-3 transition-colors"
				>
					VIEW ALL PROJECTS
				</button>
			</div>
		</div>
	</div>
</div>
<Navbar />
