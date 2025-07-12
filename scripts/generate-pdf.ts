import type { Browser } from "puppeteer";
import { resolve } from "node:path";
import puppeteer from "puppeteer";

const root = resolve(import.meta.dirname, "..");

let browser: Browser | null = null;

async function run() {
  browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto("https://luxass.dev/cv", {
    waitUntil: "networkidle2",
  });

  const outputPath = resolve(root, "public", "cv.pdf");

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
  });

  console.log(`PDF generated successfully: ${outputPath}`);
}

run().catch((error) => {
  console.error("Error running script:", error);

  if (browser != null) {
    browser.close().catch(() => {});
  }

  // eslint-disable-next-line node/prefer-global/process
  process.exit(1);
}).then(() => {
  if (browser != null) {
    browser.close().catch(() => {});
  }
});
