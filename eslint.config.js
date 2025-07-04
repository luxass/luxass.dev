// @ts-check
import luxass from "@luxass/eslint-config";

export default luxass({
  unocss: true,
  astro: true,
  formatters: true,
}, {
  ignores: [
    "**/vercel.json",
    // vercel seems to put pnpm-store in the root of the project
    ".pnpm-store/**",
  ],
});
