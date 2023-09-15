import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel/serverless";
import Icons from "unplugin-icons/vite";
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
    {
      name: "astro-plugin-redirects",
      hooks: {
        "astro:config:setup": async (options) => {
          // options.injectRoute({
          //   pattern: "/sitemap.xml",
          //   entryPoint: "./sitemap.xml.ts",
          // });
        },
        "astro:build:setup": async (options) => {
          console.info("OPTIONS", JSON.stringify(options.pages, (key, val) => {
            if (val instanceof Map) {
              return [...val];
            }
            return val;
          }, 2));
        },
      },
    },
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
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
      }),
    ],
  },
});
