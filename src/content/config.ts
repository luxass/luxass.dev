import { defineCollection } from "astro:content"
import { z } from "zod"

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(40),
    description: z.string().max(120),
    date: z.string().transform((str) => new Date(str)),
    draft: z.boolean().optional().default(false),
    handle: z.string().optional(),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    handle: z.string().optional(),
    githubUrl: z.string(),
    // github repo names is a maximum of 100 characters, but why do we need that much?
    name: z.string().max(30),
    owner: z.string(),
    description: z.string().max(120).optional(),
    npm: z.string().optional(),
    handles: z.array(z.string()).optional(),
    icon: z.string().optional(),
  }),
})

export const collections = { posts, projects }
