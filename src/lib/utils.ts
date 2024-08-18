import type { CollectionEntry } from "astro:content";

export function sortPosts(
  posts: CollectionEntry<"posts">[],
): CollectionEntry<"posts">[] {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const GLOBAL_TEXT_DECODER = new TextDecoder();

export function base64ToString(str: string): string {
  const byteArray = new Uint8Array(
    atob(str)
      .split("")
      .map((char) => char.charCodeAt(0)),
  );
  return GLOBAL_TEXT_DECODER.decode(byteArray);
}
