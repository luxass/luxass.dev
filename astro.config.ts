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

// The beta adapter forwards `types` to Vite but does not expose it in its option types yet.
const cloudflareOptions = {
  imageService: "compile",
  prerenderEnvironment: "node",
  // Keep binding types without adding Workers globals to browser scripts.
  types: { includeRuntime: false },
} as const;

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
  adapter: cloudflare(cloudflareOptions),
  vite: {
    plugins: [
      tailwindcss(),
      icons({
        compiler: "astro",
      }),
    ],
  },
});
