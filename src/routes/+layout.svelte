<script lang="ts">
	import '../app.css';
	import ThemeButton from '$lib/components/themeButton.svelte';
	let { children } = $props();

	import { ColourPalette } from '$lib/themes.svelte';
	import { browser } from '$app/environment';

	// Load saved theme from localStorage or default to 0
	let currentTheme = 0;
	if (browser && sessionStorage.getItem('currentTheme')) {
		currentTheme = parseInt(sessionStorage.getItem('currentTheme')!);
		if (isNaN(currentTheme) || currentTheme < 0 || currentTheme >= ColourPalette.size()) {
			currentTheme = 0;
			sessionStorage.removeItem('currentTheme');
		}
	}
	const palette = new ColourPalette(currentTheme);

	const toggleTheme: () => void = () => {
		currentTheme = (currentTheme + 1) % ColourPalette.size();

		palette.changeTheme(currentTheme);
		if (browser) {
			sessionStorage.setItem('currentTheme', currentTheme.toString());
		}
	};
</script>

<div
	class="min-h-screen w-full"
	style="--color-primary: {palette.getColour(0)}; --color-secondary: {palette.getColour(
		1
	)}; --color-background: {palette.getColour(2)}"
>
	<div class="fixed top-4 right-4">
		<ThemeButton onclick={toggleTheme} />
	</div>
	{@render children()}
</div>
