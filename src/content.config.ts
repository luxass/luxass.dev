import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(40),
    description: z.string().max(120),
    date: z.string().transform((str) => new Date(str)),
    draft: z.boolean().optional().default(false),
    handle: z.string().optional(),
  }),
});

export const collections = { posts };
