<script lang="ts">
	import Github from '$lib/components/icons/github.svelte';
	import Linkedin from '$lib/components/icons/linkedin.svelte';
	import Email from '$lib/components/icons/email.svelte';
</script>

<div class="flex justify-center space-x-4">
	<a
		href="https://github.com/danielp1218"
		target="_blank"
		rel="noopener noreferrer"
		class="text-primary hover:text-secondary"
	>
		<Github class="h-6 w-6" />
	</a>
	<a
		href="https://www.linkedin.com/in/danielpu1/"
		target="_blank"
		rel="noopener noreferrer"
		class="text-primary hover:text-secondary"
	>
		<Linkedin class="h-6 w-6" />
	</a>
	<a href="mailto:danielpu2007@gmail.com" class="text-primary hover:text-secondary">
		<Email class="h-6 w-6" />
	</a>
</div>
