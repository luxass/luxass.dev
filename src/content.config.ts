import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/" }),
  schema: z.object({
    title: z.string().max(40),
    description: z.string().max(120),
    date: z.string().transform((str) => new Date(str)),
    draft: z.boolean().optional().default(false),
    handle: z.string().optional(),
  }),
});

export const collections = { posts };
