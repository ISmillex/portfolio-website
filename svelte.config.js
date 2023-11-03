import adapter from "svelte-adapter-bun";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: vitePreprocess(),
	plugins: [
		// ...
		{
			namedExports: { 'svelte-hammer': ['Hammer', 'pan', 'pinch', 'press', 'rotate', 'swipe', 'tap'] }
		},
		// ...
	]
};

export default config;
