import { getCollection, getDataEntryById } from "astro:content";

export async function GET() {
  const projects = (await getCollection("projects2"));
  return new Response(
    JSON.stringify({ projects }),
  );
}
