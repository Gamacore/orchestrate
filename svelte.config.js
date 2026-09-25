import adapter from '@sveltejs/adapter-cloudflare';

const localAdapter = {
	name: 'local-development',
	adapt() {},
	emulate() {
		return { platform: async () => ({}) };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: process.env.LOCAL_DEV
			? localAdapter
			: adapter({
					platformProxy: {
						persist: false
					}
				})
	}
};

export default config;
