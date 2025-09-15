import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    author: z.string().optional().default('Raúl Casado'),
    lang: z.enum(['es', 'en']).optional(),
    tags : z.array(z.string()),
    featured: z.boolean().optional().default(false),
  })
});

export const collections = {
  blog: blogCollection
};