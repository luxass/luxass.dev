import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media",
    }),
    presetAttributify(),
    presetIcons(),
    // presetTypography({
    // }),
    // {
    //   name: "typography-preset",
    //   enforce: "post",
    //   layers: {
    //     typography: -20
    //   },
    //   rules: [

    //   ]
    // },
    presetWebFonts({
      provider: "google",
      async customFetch(url) {
        const res = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch font: ${res.status} ${res.statusText}`,
          );
        }

        let result = await res.text();

        const fontFaces = result.match(
          /\/\*([^*]*)\*+(?:[^/*][^*]*\*+)*\/\s*@font-face\s*{([^}]+)}/g,
        );
        if (!fontFaces) throw new Error("No results");
        for (const fontFace of fontFaces) {
          const family = fontFace.match(/font-family:\s*['"](.+?)['"]/i);
          const weight = fontFace.match(/font-weight:\s*(.+?);/i);
          const url = fontFace.match(/url\(.*?\)/gi);
          if (!url) throw new Error("No url");
          if (!family) throw new Error("No family");
          if (!weight) throw new Error("No weight");

          const res = await fetch(url[0].replace(/url\((.*?)\)/i, "$1"));
          const blob = await res.blob();

          await writeFile(
            `./public/fonts/${family[1]
              .replace(/['"]/g, "")
              .toLowerCase()}.woff2`,
            Buffer.from(await blob.arrayBuffer()),
          );
          result = result.replace(
            url[0],
            `url(/fonts/${family[1].replace(/['"]/g, "").toLowerCase()}.woff2)`,
          );
        }

        return result;
      },
      fonts: {
        sans: "Lexend",
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        50: "rgb(239 246 255 / <alpha-value>)",
        100: "rgb(219 234 254 / <alpha-value>)",
        200: "rgb(191 219 254 / <alpha-value>)",
        300: "rgb(147 197 253 / <alpha-value>)",
        400: "rgb(96 165 250 / <alpha-value>)",
        500: "rgb(59 130 246 / <alpha-value>)",
        600: "rgb(37 99 235 / <alpha-value>)",
        700: "rgb(29 78 216 / <alpha-value>)",
        800: "rgb(30 64 175 / <alpha-value>)",
        900: "rgb(30 58 138 / <alpha-value>)",
        950: "rgb(23 37 84 / <alpha-value>)",
        DEFAULT: "rgb(37 99 235 / <alpha-value>)",
      },
    },
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      "animate-wiggle",
      {
        animation: "wiggle 1s ease-in-out infinite",
      },
    ],
  ],
});
