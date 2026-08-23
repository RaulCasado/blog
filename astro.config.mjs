// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://raulcasado.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			// The code slab stays zinc-950 in both themes, so syntax colours must
			// be light-on-dark in both too. dark-plus matches refine.dev's palette.
			theme: 'dark-plus',
		},
	},
	i18n : {
		defaultLocale : 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
		}
	}
});
