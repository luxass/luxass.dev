import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { parsePostDate } from "./lib/utils";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().max(40),
    description: z.string().max(120),
    date: z.string().transform(parsePostDate).pipe(z.date()),
    draft: z.boolean().optional().default(false),
    handle: z.string().optional(),
  }),
});

export const collections = { posts };
