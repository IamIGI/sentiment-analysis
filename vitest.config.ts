import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
	plugins: [svelte()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTest.ts',
		deps: {
			inline: [/svelte/]
		},
		alias: {
			$lib: path.resolve(__dirname, 'src/lib')
		}
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
