import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET({ site }: APIContext) {
  const posts = (await getCollection("post", ({ data }) => data.published))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "luxass' blog",
    description: "luxass' blog",
    site: site?.toString() || "https://luxass.dev",
    items: posts.map(({ body, slug, data: { title, description, date: pubDate } }) => ({
      title,
      description,
      pubDate,
      link: `/posts/${slug}`,
      content: sanitizeHtml(parser.render(body)),
    })),
  });
}
