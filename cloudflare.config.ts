import { bindings, defineConfig } from "cf/config";

export default defineConfig(({ mode }) => {
  const targets = {
    "luxass-dev": {
      name: "luxass-dev",
      domains: ["luxass.dev", "cv.luxass.dev"],
    },
    "luxass-com": {
      name: "luxass-com",
      domains: ["luxass.com", "cv.luxass.com"],
    },
  };

  const deployment = mode === "luxass-dev" || mode === "luxass-com" ? targets[mode] : { name: "luxass" };

  return {
    worker: {
      ...deployment,
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
  };
});
