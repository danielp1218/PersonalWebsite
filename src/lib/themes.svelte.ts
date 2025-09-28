export type Theme = [number, number, number][];

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
	],
	matcha: [
		[136, 176, 75], // Matcha Green
		[104, 139, 82], // Darker Matcha
		[240, 240, 234] // Off-white
	]
};

export const filterSettings: { [key: string]: string } = {
	light: '',
	dark: 'sepia(1) brightness(0.8) saturate(1.4) contrast(1.6) hue-rotate(-80deg)',
	ocean: 'sepia(1) brightness(0.7) saturate(1.7) contrast(1.6) hue-rotate(-180deg)',
	matcha: 'sepia(0.9) brightness(1) saturate(1.3) contrast(1.2) hue-rotate(50deg)'
};
