import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET({ url }: APIContext) {
  const projects = await getCollection(
    "projects",
    ({
      slug, data: {
        handle,
      },
    }) =>
      handle || slug
      === url.pathname.replace("/raw", "").split("/").pop(),
  );

  if (!projects || !projects.length) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const project = projects[0];

  return new Response(project.body, {
    status: 200,
    headers: {
      "content-type": "text/plain",
    },
  });
}
