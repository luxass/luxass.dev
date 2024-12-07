import process from "node:process";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import unocss from "unocss/astro";
import { remarkAsides } from "./mdx-plugins";

const site = process.env.SITE_HOST === "luxass.com" ? "https://luxass.com" : "https://luxass.dev";

console.log("site", site);

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    unocss({
      injectReset: true,
    }),
    icon({
      include: {
        logos: ["npm-icon"],
        lucide: ["clipboard", "clipboard-check", "search"],
        tabler: ["mail"],
        mdi: ["github", "arrow-top-right-thin", "rss", "sitemap", "linkedin", "arrow-right-thin"],
      },
    }),
  ],
  experimental: {
    contentIntellisense: true,
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
});
