import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
	plugins: [svelte()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTest.ts',
		include: ['src/**/*.test.ts'],
		deps: {
			inline: [/svelte/]
		},
		alias: [
			{ find: '$lib', replacement: resolve(__dirname, './src/lib') },
			{
				find: '$app/paths',
				replacement: resolve(__dirname, './src/__tests__/mocks/appPathsMock.ts')
			}
		]
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
