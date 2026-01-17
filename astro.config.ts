import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import { rehypeCopy, remarkAsides } from "./mdx-plugins";

const site = process.env.SITE_HOST === "luxass.com" ? "https://luxass.com" : "https://luxass.dev";

console.log("Site Host", site);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "daily",
      async serialize(item) {
        let pathname = decodeURIComponent(new URL(item.url).pathname);
        if (pathname !== "/posts/" && pathname.startsWith("/posts/")) {
          if (pathname.endsWith("/")) {
            pathname = pathname.slice(0, -1);
          }
          const relativePath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

          let contentPath = path.join("./src/content", `${relativePath}.mdx`);
          let content: string;

          try {
            content = await readFile(contentPath, "utf-8");
          } catch {
            contentPath = path.join("./src/content", `${relativePath}.md`);
            content = await readFile(contentPath, "utf-8");
          }
          // parse front matter in content file.
          const frontMatterEndIndex = content.indexOf("---", 3);
          if (frontMatterEndIndex === -1) {
            throw new Error(`Front matter not found in ${pathname}`);
          }
          const frontMatter = content.slice(3, frontMatterEndIndex).trim();
          const isDraft = frontMatter.includes("draft: true");

          // If draft is set to true, do not include in sitemap.
          if (isDraft) {
            return undefined;
          }
        }
        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq: item.changefreq,
          priority: item.priority,
        };
      },
    }),
    solid(),
    icon({
      include: {
        lucide: [
          "clipboard",
          "clipboard-check",
          "search",
          "briefcase",
          "graduation-cap",
          "rocket",
          "heart-handshake",
          "user",
          "git-pull-request",
        ],
        ph: [
          "map-pin",
          "building",
          "arrow-up-right",
          "linkedin-logo",
          "github-logo",
          "envelope",
          "file-text",
        ],
      },
    }),
    mdx(),
  ],
  experimental: {
    contentIntellisense: true,
    fonts: [{
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
    }],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  markdown: {
    shikiConfig: {
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeExternalLinks, {
        target: "_blank",
        rel: ["noopener", "noreferrer"],
      }],
      rehypeCopy,
    ],
    remarkPlugins: [
      remarkDirective,
      remarkAsides,
    ],
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
