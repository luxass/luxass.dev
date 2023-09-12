import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";
import AutoImport from "unplugin-auto-import/astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://luxass.dev",
  integrations: [unocss({
    injectReset: true,
  }), sitemap({
    filter(page) {
      return !page.includes("$");
    },
  }), solidJs(), mdx(), AutoImport({
    dts: true,
  })],
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
  output: "server",
  adapter: vercel({
    analytics: true,
    edgeMiddleware: true,
    functionPerRoute: false,
  }),
});
