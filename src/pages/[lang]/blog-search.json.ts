import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { languages } from '../../i18n/ui';
import { getLangPosts, postSlug } from '../../utils/posts';

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as string;
  const posts = getLangPosts(await getCollection('blog'), lang);

  const index = posts.map((post) => {
    const excerpt = (post.body || '')
      // strip markdown syntax to a plain-text preview
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#>*`_~\-\[\]()!|]/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    return {
      title: post.data.title,
      description: post.data.description || '',
      tags: post.data.tags || [],
      url: `/${lang}/blog/${postSlug(post.id, lang)}/`,
      pubDate: post.data.pubDate.toISOString(),
      excerpt,
    };
  });

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
