import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel/serverless";
import Icons from "unplugin-icons/vite";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";

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
    rehypePlugins: [[rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    }]],
    remarkPlugins: [],
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
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
