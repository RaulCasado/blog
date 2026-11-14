import type { CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 9;
export const WORDS_PER_MINUTE = 200;

type BlogPost = CollectionEntry<'blog'>;

export function getReadingTime(post: BlogPost | { body?: string }): number {
  if (!post.body) return 1;
  const words = post.body.split(/\s+/).length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

/**
 * Returns the posts for a given language, sorted with featured posts first
 * and then by publication date (newest first). Used by the blog index,
 * its pagination pages and the search-index endpoint so the ordering stays
 * consistent everywhere.
 */
export function getLangPosts(allPosts: BlogPost[], lang: string): BlogPost[] {
  return allPosts
    .filter((post) => post.id.startsWith(`${lang}/`))
    .sort((a, b) => {
      const fa = a.data.featured ? 1 : 0;
      const fb = b.data.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    });
}

/** Strips the `<lang>/` prefix and file extension from a collection id. */
export function postSlug(id: string, lang: string): string {
  return id.replace(new RegExp(`^${lang}/`), '').replace(/\.mdx?$/, '');
}

/**
 * Picks posts to suggest after `current`: same language, never the post itself.
 * Ranks by shared tags, weighting rare tags higher (a shared `security` says
 * more than a shared `web_development`), then newest first. If fewer than
 * `limit` posts share a tag, it fills up with the newest remaining ones.
 */
export function getRelatedPosts(
  allPosts: BlogPost[],
  current: BlogPost,
  lang: string,
  limit = 3,
): BlogPost[] {
  const pool = allPosts.filter((post) => post.id.startsWith(`${lang}/`));

  const tagFreq = new Map<string, number>();
  for (const post of pool) {
    for (const tag of post.data.tags) tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
  }

  const currentTags = new Set(current.data.tags);
  const score = (post: BlogPost) =>
    post.data.tags
      .filter((tag) => currentTags.has(tag))
      .reduce((sum, tag) => sum + 1 / (tagFreq.get(tag) ?? 1), 0);

  return pool
    .filter((post) => post.id !== current.id)
    .map((post) => ({ post, score: score(post) }))
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .slice(0, limit)
    .map(({ post }) => post);
}
