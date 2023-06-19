import type { APIContext } from "astro";

export async function get({ site }: APIContext) {
  const { data } = await fetch("https://api.github.com/repos/microsoft/vscode/releases?per_page=1", {
    headers: {
      "Authorization": `bearer ${import.meta.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    }
  }).then((res) => res.json());

  if (!data) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }

  const release = data[0];

  if (!("tag_name" in release)) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }

  return new Response(release.tag_name, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, immutable"
    }
  });
}
