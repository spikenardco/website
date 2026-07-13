import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({ strict: false }),
			preprocess: [mdsvex({ extensions: ['.md'] })],
			extensions: ['.svelte', '.md']
		})
	]
});
