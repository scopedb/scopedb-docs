import {z, defineCollection} from 'astro:content';

const referenceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.optional(z.string()),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.optional(z.string()),
    description: z.optional(z.string()),
    date: z.optional(z.string()),
    tags: z.optional(z.array(z.string())),
  }),
});

export const collections = {
  reference: referenceCollection,
  blogs: blogCollection,
};
