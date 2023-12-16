import { writeFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import rehypeExternalLinks from "rehype-external-links";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { remove } from "unist-util-remove";
import { remarkAsides } from "./integrations/asides";
import { remarkBadges } from "./integrations/badges";

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
      remarkBadges(),
      () => {
        return (tree) => {
          writeFileSync("./test.json", JSON.stringify(tree, null, 2));
          visit(tree, "paragraph", (node, index, parent) => {
            if (!parent || index === undefined) {
              return;
            }

            if (parent.type !== "blockquote") {
              return;
            }

            // check if the first child is a text node
            const firstChild = node.children[0];
            if (!firstChild || firstChild.type !== "text") {
              return;
            }

            const variant = firstChild.value.match(/^\[\!(NOTE|TIP|WARNING|DANGER|IMPORTANT)\]/);
            if (!variant) {
              return;
            }

            remove(node, (child) => {

            });

            const aside = h(
              "aside",
              {
                "aria-label": title,
                "class": `callout callout-${variant}`,
              },
              [
                h("p", { "class": "callout-title", "aria-hidden": "true" }, [
                  icons[variant],
                  { type: "text", value: title },
                ]),
                ...node.children,
              ],
            );

            console.log(node);

            parent.children[index] = aside;
          });
        };
      },
      // () => {
      //   return (tree) => {
      //     visit(tree, ["heading"], (node) => {
      //       if (node.type === "heading" && node.depth === 1) {
      //         const textNode = node.children[0];
      //         if (!textNode || textNode.type !== "text") {
      //           throw new Error("No text node found");
      //         }

      //         // check if the first character is an emoji
      //         if (!/^[\p{Emoji}]/u.test(textNode.value)) {
      //           return;
      //         }
      //         console.log(textNode.value);

      //         tree.children.splice(tree.children.indexOf(node) + 1, 0, {
      //           ...node,
      //           type: "link",
      //           url: "#",

      //         });
      //       }
      //       // add a node directly after the current node
      //     });
      //     // console.log(JSON.stringify(tree.children.slice(0, 4), null, 2));
      //   };
      // },
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
