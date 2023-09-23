import { getCollection } from "astro:content";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.includes("/posts") && context.url.pathname.endsWith("/raw")) {
    const posts = await getCollection("posts", ({ data, slug }) => {
      const handle = data.handle || slug;
      return handle === context.url.pathname.replace("/raw", "").split("/").pop() && data.published;
    });
    if (!posts || !posts.length) {
      return next();
    }
    const post = posts[0];
    return new Response(post.body, {
      status: 200,
    });
  }

  return next();
});
