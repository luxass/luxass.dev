import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel/serverless";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://luxass.dev",
  integrations: [
    unocss({
      injectReset: true,
    }),
    sitemap({
      filter(page) {
        return !page.includes("$");
      },
    }),
    mdx(),
    vue({
      jsx: true,
    }),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "vitesse-dark",
    },
    smartypants: true,
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  output: "server",
  adapter: vercel({
    analytics: true,
    edgeMiddleware: true,
    functionPerRoute: false,
  }),
});
