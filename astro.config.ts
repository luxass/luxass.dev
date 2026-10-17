import process from "node:process";
import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icons from "unplugin-icons/vite";
import { satteriAsides } from "./src/markdown/asides";
import { getCurrentDomain } from "./src/lib/domains";

const site = getCurrentDomain(process.env.SITE_HOST);

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
      filter: (page) => page !== `${site}/posts/`,
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
      defaultColor: false,
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
  },
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
    // Keep binding types without adding Workers globals to browser scripts.
    // @ts-expect-error: cloudflare adapter does not expose types in its option types yet.
    types: { includeRuntime: false },
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
