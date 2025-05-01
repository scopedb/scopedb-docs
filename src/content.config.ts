import {z, defineCollection} from 'astro:content';

const referenceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.optional(z.string()),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: ({image}) =>
    z.object({
      title: z.optional(z.string()),
      description: z.optional(z.string()),
      date: z.optional(z.string()),
      tags: z.optional(z.array(z.string())),
      cover: z.optional(image()),
    }),
});

export const collections = {
  reference: referenceCollection,
  blogs: blogCollection,
};
