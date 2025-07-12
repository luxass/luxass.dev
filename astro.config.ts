import { readFile } from "node:fs/promises";
import process from "node:process";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import { rehypeCopy, remarkAsides } from "./mdx-plugins";

const site = process.env.SITE_HOST === "luxass.com" ? "https://luxass.com" : "https://luxass.dev";

console.log("site", site);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "daily",
      async serialize(item) {
        if (item.url !== `${site}/posts/` && item.url.includes("/posts/")) {
          const url = item.url.replace("https://luxass.dev", "");
          const content = await readFile(`./src/content${url.slice(0, url.length - 1)}.mdx`, "utf-8");
          // parse front matter in content file.
          const frontMatterEndIndex = content.indexOf("---", 3);
          if (frontMatterEndIndex === -1) {
            throw new Error(`Front matter not found in ${url}`);
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
        logos: ["npm-icon"],
        lucide: [
          "clipboard",
          "clipboard-check",
          "search",
          "briefcase",
          "graduation-cap",
          "rocket",
          "heart-handshake",
        ],
        tabler: ["mail"],
        mdi: [
          "github",
          "arrow-top-right-thin",
          "rss",
          "sitemap",
          "linkedin",
          "arrow-right-thin",
        ],
        ph: [
          "map-pin",
          "building",
          "arrow-up-right",
          "linkedin-logo",
          "github-logo",
          "envelope",
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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    isr: {
      expiration: 60 * 60 * 8,
    },
  }),
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
