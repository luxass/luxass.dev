import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";
import vercel from "@astrojs/vercel/static";

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
    solidJs(),
    mdx(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "vitesse-dark",
    },
    smartypants: false,
    remarkPlugins: [[remarkSmartypants, {
      dashes: false,
    }]],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  output: "static",
  adapter: vercel({
    analytics: true,
  }),
});
