import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icons from "unplugin-icons/vite";
import { satteriAsides } from "./src/markdown/asides";

const site = process.env.SITE_HOST === "luxass.com" ? "https://luxass.com" : "https://luxass.dev";

// https://astro.build/config
export default defineConfig({
  site,
  session: {
    driver: {
      entrypoint: "unstorage/drivers/null",
    },
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "daily",
      async serialize(item) {
        let pathname = decodeURIComponent(new URL(item.url).pathname);
        if (pathname !== "/posts/" && pathname.startsWith("/posts/")) {
          if (pathname.endsWith("/")) {
            pathname = pathname.slice(0, -1);
          }
          const relativePath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

          let contentPath = path.join("./src/content", `${relativePath}.mdx`);
          let content: string;

          try {
            content = await readFile(contentPath, "utf-8");
          } catch {
            contentPath = path.join("./src/content", `${relativePath}.md`);
            content = await readFile(contentPath, "utf-8");
          }
          // parse front matter in content file.
          const frontMatterEndIndex = content.indexOf("---", 3);
          if (frontMatterEndIndex === -1) {
            throw new Error(`Front matter not found in ${pathname}`);
          }
          const frontMatter = content.slice(3, frontMatterEndIndex).trim();
          const isDraft = frontMatter.includes("draft: true");

          // If draft is set to true, do not include in sitemap.
          if (isDraft) {
            return undefined;
          }
        }
        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq: item.changefreq,
          priority: item.priority,
        };
      },
    }),
    mdx(),
  ],
  experimental: {
    contentIntellisense: true,
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
    },
  ],
  prefetch: false,
  markdown: {
    processor: satteri({
      mdastPlugins: [satteriAsides],
      features: {
        directive: true,
      },
    }),
    shikiConfig: {
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
  },
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: "astro",
      }),
    ],
  },
});
