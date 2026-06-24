import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';
import { languages } from '../../i18n/ui';
import { getLangPosts, postSlug } from '../../utils/posts';

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
	const lang = context.params.lang;
	const posts = getLangPosts(await getCollection('blog'), lang);

	return rss({
		title: `${SITE_TITLE} (${lang.toUpperCase()})`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/${lang}/blog/${postSlug(post.id, lang)}/`,
		})),
	});
}
