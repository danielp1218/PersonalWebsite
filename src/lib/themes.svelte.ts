import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export type Theme = [number, number, number][];

const themeNames = ['light', 'dark', 'ocean'];

export const themes: { [key: string]: Theme } = {
	light: [
		[75, 85, 99], // Darker Cool Gray
		[156, 163, 175], // Light Gray
		[255, 255, 255] // Pure White
	],
	dark: [
		[255, 105, 180], // Pink
		[255, 165, 0], // Orange
		[30, 30, 30] // Dark Gray
	],
	ocean: [
		[0, 191, 165], // Teal
		[72, 149, 239], // Ocean Blue
		[20, 52, 73] // Deep Navy
	]
};

export class ColourPalette {
	private palette: Theme = $state(themes[themeNames[0]]);
	constructor(theme: Theme | number) {
		if (typeof theme === 'number') {
			theme = themes[themeNames[theme]];
		}
		this.palette = theme;
	}

	public changeTheme(newTheme: Theme | string | number) {
		if (typeof newTheme === 'string') {
			newTheme = themes[newTheme];
		} else if (typeof newTheme === 'number') {
			newTheme = themes[themeNames[newTheme]];
		}
		this.palette = newTheme;
	}

	public getColour(index: number) {
		return `rgb(${this.palette[index][0]}, ${this.palette[index][1]}, ${this.palette[index][2]})`;
	}

	static size(): number {
		return Object.keys(themes).length;
	}
}
