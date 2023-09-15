import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET({ site }: APIContext) {
  const posts = (await getCollection("posts", ({ data }) => data.published))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <url>
      <loc>${site?.toString()}</loc>
      <priority>1.00</priority>
  </url>
  ${posts.map(post => {
  const loc = new URL(`/${post.collection}/${post.slug}`, site?.toString()).href;
  return `
          <url>
              <loc>${loc}</loc>
              <lastmod>${post.data.date.toISOString()}</lastmod>
              <priority>0.80</priority>
          </url>
      `.trim();
}).join("")}
  </urlset>
`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
