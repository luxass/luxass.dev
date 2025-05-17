import { readFile } from "node:fs/promises";
import process from "node:process";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import { FontaineTransform } from "fontaine";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import unocss from "unocss/astro";
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
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        logos: ["npm-icon"],
        lucide: ["clipboard", "clipboard-check", "search"],
        tabler: ["mail"],
        mdi: ["github", "arrow-top-right-thin", "rss", "sitemap", "linkedin", "arrow-right-thin"],
        ph: ["arrow-up-right", "map-pin", "building", "arrow-up-right"],
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
    edgeMiddleware: true,
  }),
  output: "server",
  vite: {
    plugins: [FontaineTransform.vite({
      fallbacks: ["Arial"],
      // id is the font src value in the CSS
      resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
    })],
  },
});
