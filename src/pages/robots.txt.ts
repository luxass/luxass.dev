import { getDomains } from "../lib/utils";

export async function GET() {
  const domains = getDomains();
  const sitemapUrl = `${domains.current}/sitemap-index.xml`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
