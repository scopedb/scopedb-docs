import { z, defineCollection } from 'astro:content'

const referenceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.optional(z.string()),
    }),
});

export const collections = {
    'reference': referenceCollection,
};
