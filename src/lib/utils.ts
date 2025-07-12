import type { CollectionEntry } from "astro:content";

export function sortPosts(
  posts: CollectionEntry<"posts">[],
): CollectionEntry<"posts">[] {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function stripProtocol(url: string): string {
  const parsedUrl = new URL(url);

  return parsedUrl.hostname + parsedUrl.pathname + parsedUrl.search;
}
