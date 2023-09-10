import { defineCollection } from "astro:content";
import { z } from "zod";

const post = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(120),
    date: z.string().transform(str => new Date(str)),
    published: z.boolean().optional().default(true),
  }),
});

export const collections = { post };
