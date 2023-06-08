import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";
import { remarkBetterCodeblocks } from "./plugins/remark-better-codeblock";

export default defineConfig({
  site: "https://www.luxass.dev",
  integrations: [
    unocss({
      injectReset: true
    }),
    sitemap(),
    solidJs(),
    mdx()
  ],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "vitesse-dark"
    },
    // Override with our own config
    smartypants: false,
    remarkPlugins: [
      [remarkSmartypants, { dashes: false }],
      remarkBetterCodeblocks
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings
    ]
  }
});
