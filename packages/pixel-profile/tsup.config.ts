import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: false,
	sourcemap: true,
	target: 'node16',
	dts: true,
	minify: true,
	format: ['esm'],
	external: ['@resvg/resvg-wasm'],
	esbuildOptions(options) {
		options.tsconfig = 'tsconfig.json';
		options.legalComments = 'external';
	}
});
