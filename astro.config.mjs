// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://raulcasado.com',
	// Fonts are downloaded at build time and served from our own origin:
	// no runtime requests to Google, and no Inter / Geist / system-ui default.
	fonts: [
		{
			// Titles: Fraunces, a "wonky" old-style serif with real character.
			provider: fontProviders.google(),
			name: 'Fraunces',
			cssVariable: '--font-display',
			weights: ['400 700'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			// Running text: Hanken Grotesk, neutral but outside the usual top 10.
			provider: fontProviders.google(),
			name: 'Hanken Grotesk',
			cssVariable: '--font-sans',
			weights: ['400 700'],
			styles: ['normal', 'italic'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
	],
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			// The code slab stays dark in both themes, so syntax colours must
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
