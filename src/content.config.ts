import { z, defineCollection } from "astro:content";

const schema = z.object({
  title: z.optional(z.string()),
  relatedContents: z.optional(
    z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      }),
    ),
  ),
});

const guidesCollection = defineCollection({
  type: "content",
  schema: schema,
});

const developerCollection = defineCollection({
  type: "content",
  schema: schema,
});

const referenceCollection = defineCollection({
  type: "content",
  schema: schema,
});

export const collections = {
  guides: guidesCollection,
  developer: developerCollection,
  reference: referenceCollection,
};
