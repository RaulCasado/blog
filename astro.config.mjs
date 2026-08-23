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
			// Dual themes emit --shiki-light/--shiki-dark custom properties instead
			// of a hardcoded colour, so code blocks follow the site theme toggle.
			// dark-plus matches the VS Code palette refine.dev uses.
			themes: {
				light: 'github-light',
				dark: 'dark-plus',
			},
			defaultColor: false,
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
