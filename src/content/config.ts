import { defineCollection } from "astro:content";
import { z } from "zod";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().transform((val, ctx) => {
      if (val.length > 30) {
        val = val.slice(0, 30);
      }
      return val;
    }),
    description: z.string().max(120),
    date: z.string().transform(str => new Date(str)),
    published: z.boolean().optional().default(true),
    icon: z.string().optional().default("📝"),
    handle: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
});

export const collections = { posts, projects };
