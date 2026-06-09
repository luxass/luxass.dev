import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["eslint", "import", "jsx-a11y", "oxc", "typescript", "unicorn"],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [".astro/**", ".wrangler/**", "dist/**", "node_modules/**"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  rules: {
    "import/no-cycle": "warn",
    "typescript/triple-slash-reference": "off",
  },
  overrides: [
    {
      files: ["*.astro", "src/**/*.astro"],
      rules: {
        "jsx-a11y/anchor-has-content": "off",
      },
    },
  ],
});
