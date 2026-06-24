import type { CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 9;

type BlogPost = CollectionEntry<'blog'>;

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
