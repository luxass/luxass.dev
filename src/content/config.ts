import { defineCollection } from "astro:content";
import { z } from "zod";


const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(120),
    image: z.string().url().optional(),
    date: z.string().transform(str => new Date(str)),
    draft: z.boolean().optional().default(true)
  })
});

export const collections = { blog };
