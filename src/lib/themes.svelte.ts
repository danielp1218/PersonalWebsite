import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export type Theme = [number, number, number][];

const themeNames = ['light', 'dark', 'ocean'];

export const themes: { [key: string]: Theme } = {
	light: [
		[75, 85, 99], // Darker Cool Gray
		[156, 163, 175], // Light Gray
		[255, 255, 255], // Pure White
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

export const filterSettings: { [key: string]: string } = {
	"light": "",
	"dark": "sepia(1) brightness(0.8) saturate(1.4) contrast(1.6) hue-rotate(-80deg)",
	"ocean": "sepia(1) brightness(0.7) saturate(1.7) contrast(1.6) hue-rotate(-180deg)"
}

export class ColourPalette {
	private palette: Theme = $state(themes[themeNames[0]]);
	private themeNumber = $state(0);

	constructor(theme: number) {
		this.themeNumber = theme;
		this.palette = themes[themeNames[theme]];
	}

	public changeTheme(newTheme: number) {
		this.themeNumber = newTheme;
		this.palette = themes[themeNames[newTheme]];
	}

	public getColour(index: number) {
		return `rgb(${this.palette[index][0]}, ${this.palette[index][1]}, ${this.palette[index][2]})`;
	}

	public getFilter(){
		return filterSettings[themeNames[this.themeNumber]];
	}

	static size(): number {
		return Object.keys(themes).length;
	}
}
