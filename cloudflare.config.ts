import { bindings, defineConfig } from "cf/config";

export default defineConfig(({ mode }) => ({
  worker: {
    name: mode === "luxass-com" ? "luxass-com" : "luxass-dev",
    domains:
      mode === "luxass-com"
        ? [
            { hostname: "luxass.com", production: true, previews: false },
            { hostname: "cv.luxass.com", production: true, previews: false },
            { hostname: "previews.luxass.com", production: false, previews: true },
          ]
        : [
            { hostname: "luxass.dev", production: true, previews: false },
            { hostname: "cv.luxass.dev", production: true, previews: false },
            { hostname: "previews.luxass.dev", production: false, previews: true },
          ],
    previewUrls: true,
    compatibilityDate: "2026-08-04",
    compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
    entrypoint: "@astrojs/cloudflare/entrypoints/server",
    assets: {
      htmlHandling: "drop-trailing-slash",
    },
    env: {
      ASSETS: bindings.assets(),
    },
    observability: {
      enabled: true,
    },
  },
}));
