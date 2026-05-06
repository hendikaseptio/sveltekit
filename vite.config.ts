import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	ssr: {
		noExternal: ['@tabler/icons-svelte', 'prosekit', '@prosekit/svelte', '@prosekit/core']
	},
	optimizeDeps: {
		include: ['@tabler/icons-svelte', 'prosekit', '@prosekit/svelte', '@prosekit/core']
	}
});
