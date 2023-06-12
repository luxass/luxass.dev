

import {
  writeFile
} from "node:fs/promises";
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  presets: [
    presetUno({
      dark: "media"
    }),
    presetIcons({
      // scale: 1.5,
      // extraProperties: {
      //   "color": "inherit",
      //   "min-width": "1.5em"
      // }
    }),
    presetWebFonts({
      provider: "google",
      async customFetch(url) {
        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
          }
        });
        console.log("URL", url);


        if (!res.ok) {
          throw new Error(`Failed to fetch font: ${res.status} ${res.statusText}`);
        }

        const font = await res.text();
        console.log(font);
        writeFile("font.css", font);

        return font;
      },
      fonts: {
        sans: [
          {
            name: "Inter"
          },
          {
            name: "sans-serif",
            provider: "none"
          }
        ]
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
