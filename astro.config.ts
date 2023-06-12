import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";
import { FontaineTransform } from "fontaine";


export default defineConfig({
  site: "https://luxass.dev",
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
    smartypants: false,
    remarkPlugins: [
      [remarkSmartypants, { dashes: false }]
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings
    ]
  },
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["Inter"],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url) // id
      })
    ]
  }
});
