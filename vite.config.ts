import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		noExternal: ['@vercel/blob'],
		external: ['@resvg/resvg-wasm']
	},
	optimizeDeps: {
		exclude: ['@resvg/resvg-wasm']
	}
});
