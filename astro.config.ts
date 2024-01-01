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
import { remarkAsides } from "./integrations/asides";

// https://astro.build/config
export default defineConfig({
  site: "https://luxass.dev",
  integrations: [
    unocss({
      injectReset: true,
    }),
    sitemap({
      lastmod: new Date(),
      changefreq: "daily",
    }),
    mdx({
      // optimize: {
      //   customComponentNames: [
      //     "a",
      //   ],
      // },
    }),
    vue({
      jsx: true,
    }),
    icon(),
  ],
  experimental: {
    contentCollectionCache: true,
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      experimentalThemes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
      wrap: false,
    },
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    }]],
    remarkPlugins: [
      remarkDirective,
      remarkAsides(),
      // remarkBadges(),
      // remarkSidebar(),
    ],
  },
  compressHTML: false,
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    edgeMiddleware: true,
    functionPerRoute: false,
  }),
});
