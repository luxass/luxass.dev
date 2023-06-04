import { defineCollection } from "astro:content";
import { z } from "zod";


const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    date: z.string().transform(str => new Date(str)),
    draft: z.boolean().optional().default(false)
  })
});

export const collections = { blog };
