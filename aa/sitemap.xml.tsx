import type { GetServerSideProps } from "next";

const createSitemap = (
  urls: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map((url) => {
            return `
                <url>
                    <loc>https://luxass.dev/${url}</loc>
                </url>
            `;
          })
          .join("")}
    </urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPages = [
    "",
    "about",
    "projects"
  ];

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
};

export default function Sitemap() {
  return null;
}
