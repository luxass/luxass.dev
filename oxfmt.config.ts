import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
  ignorePatterns: [".astro/**", ".wrangler/**", "dist/**", "node_modules/**", "public/**", "src/**/*.astro"],
});
