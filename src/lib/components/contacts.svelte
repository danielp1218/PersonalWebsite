<script lang="ts">
	import Github from '$lib/components/icons/github.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
	import X from '$lib/components/icons/x.svelte';
	import Email from '$lib/components/icons/email.svelte';
</script>

<div class="flex justify-center gap-5">
	<a
		href="https://github.com/dtpu"
		target="_blank"
		rel="noopener noreferrer"
		class="contact-link text-primary hover:text-secondary"
		aria-label="GitHub"
	>
		<Github class="h-6 w-6" />
	</a>
	<a
		href="https://www.linkedin.com/in/dtpu"
		target="_blank"
		rel="noopener noreferrer"
		class="contact-link text-primary hover:text-secondary"
		aria-label="LinkedIn"
	>
		<Linkedin class="h-6 w-6" />
	</a>
	<a
		href="https://x.com/daneilp_"
		target="_blank"
		rel="noopener noreferrer"
		class="contact-link text-primary hover:text-secondary"
		aria-label="X"
	>
		<X class="h-6 w-6" />
	</a>
	<a
		href="mailto:dtpu@uwaterloo.ca"
		class="contact-link text-primary hover:text-secondary"
		aria-label="Email"
	>
		<Email class="h-6 w-6" />
	</a>
</div>

<style>
	.contact-link {
		display: inline-flex;
		padding: 0.5rem;
		border-radius: 9999px;
		transition:
			transform 150ms cubic-bezier(0.22, 1, 0.36, 1),
			background-color 150ms cubic-bezier(0.22, 1, 0.36, 1),
			color 800ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.contact-link:hover {
		transform: translateY(-2px) scale(1.1);
		background-color: rgb(var(--color-secondary) / 0.1);
	}

	.contact-link:active {
		transform: translateY(0) scale(0.95);
	}
</style>
