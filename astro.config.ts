import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel/serverless";
import Icons from "unplugin-icons/vite";
import vue from "@astrojs/vue";

import prefetch from "@astrojs/prefetch";

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
    mdx({
      optimize: true,
    }),
    vue({
      jsx: true,
    }),
    prefetch({
      throttle: 5
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: false,
    },
    smartypants: true,
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
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
