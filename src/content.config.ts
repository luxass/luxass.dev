import { file, glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { parse } from "smol-toml";
import { z } from "zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().max(40),
    description: z.string().max(120),
    date: z.string().transform((str) => new Date(str)),
    draft: z.boolean().optional().default(false),
    handle: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.toml", {
    parser(text) {
      const parsed = parse(text);

      const entries = Object.entries(parsed).map(([slug, project]) => {
        if (typeof project !== "object" || project === null || Array.isArray(project) || project instanceof Date) {
          throw new TypeError("expected project to be an object");
        }

        return {
          slug,
          ...project,
        };
      });

      return entries;
    },
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    href: z.string(),
  }),
});

const contributions = defineCollection({
  loader: file("src/data/contributions.toml", {
    parser(text) {
      const parsed = parse(text);

      const entries = Object.entries(parsed).map(([slug, contribution]) => {
        if (typeof contribution !== "object" || contribution === null || Array.isArray(contribution) || contribution instanceof Date) {
          throw new TypeError("expected contribution to be an object");
        }

        return {
          slug,
          ...contribution,
        };
      });

      return entries;
    },
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    href: z.string(),
  }),
});

export const collections = { posts, projects, contributions };
