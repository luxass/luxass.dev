import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";
import remarkDirective from "remark-directive";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import icon from "astro-icon";
import solid from "@astrojs/solid-js";
import { FontaineTransform } from "fontaine";
import { remarkAsides } from "./integrations/asides";

// https://astro.build/config
export default defineConfig({
  site: "https://luxass.dev",
  integrations: [
    mdx(),
    sitemap({
      lastmod: new Date(),
      changefreq: "daily",
    }),
    solid(),
    unocss({
      injectReset: true,
    }),
    icon(),
    vue(),
  ],
  experimental: {
    contentCollectionCache: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
      wrap: false,
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
      remarkAsides(),
      // remarkBadges(),
      // remarkSidebar(),
    ],
  },
  compressHTML: false,
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    edgeMiddleware: true,
    functionPerRoute: false,
  }),
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url), // id is the font src value in the CSS
      }),
    ],
  },
});
