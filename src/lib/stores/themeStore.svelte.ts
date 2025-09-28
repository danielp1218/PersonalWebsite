import { browser } from '$app/environment';
import { themes, filterSettings } from '$lib/themes.svelte';

const themeNames = Object.keys(themes);

let currentTheme = $state(0);

if (browser) {
	const storedTheme = localStorage.getItem('currentTheme');
	if (storedTheme) {
		const parsedTheme = parseInt(storedTheme, 10);
		currentTheme = isNaN(parsedTheme) ? 0 : parsedTheme;
	}
}

export const themeStore = {
	get name() {
		return themeNames[currentTheme];
	},
	get index() {
		return currentTheme;
	},
	get palette() {
		return themes[themeNames[currentTheme]];
	},
	get filter() {
		return filterSettings[themeNames[currentTheme]];
	},
	get themes() {
		return themeNames;
	},
	setTheme: (newTheme: string) => {
		const themeIndex = themeNames.indexOf(newTheme);
		if (themeIndex !== -1) {
			currentTheme = themeIndex;
			if (browser) {
				localStorage.setItem('theme', themeIndex.toString());
			}
		}
	}
};
