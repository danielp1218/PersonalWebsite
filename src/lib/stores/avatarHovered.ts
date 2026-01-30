import { writable } from 'svelte/store';

export type HoverState = 'NH' | 'HH' | 'BH';

export const avatarHovered = writable<HoverState>('NH');
