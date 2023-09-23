import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function GET({ site, url }: APIContext) {
  const posts = await getCollection(
    "posts",
    ({ data, slug }) =>
      data.published
      && (data.handle || slug)
      === url.pathname.replace("/raw", "").split("/").pop(),
  );

  if (!posts || !posts.length) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const post = posts[0];

  return new Response(post.body, {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
}
