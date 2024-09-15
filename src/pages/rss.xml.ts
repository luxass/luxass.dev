import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET({ site }: APIContext) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "luxass's blog",
    description: "writing about web development, programming, and more",
    site: site?.toString() || "https://luxass.dev",
    items: posts.map(({ body, slug, data: { title, description, date: pubDate } }) => ({
      title,
      description,
      pubDate,
      link: `/posts/${slug}`,
      content: sanitizeHtml(parser.render(body)),
    })),
    stylesheet: "/rss/styles.xsl",
  });
}
