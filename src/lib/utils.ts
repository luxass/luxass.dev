import type { CollectionEntry } from "astro:content";

export function sortPosts(posts: CollectionEntry<"posts">[]): CollectionEntry<"posts">[] {
  return posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function stripProtocol(url: string): string {
  const parsedUrl = new URL(url);

  return parsedUrl.hostname + parsedUrl.pathname + parsedUrl.search;
}

export const POST_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function parsePostDate(value: string): Date {
  // Existing posts use month names. Date-only values must not inherit the
  // build machine's timezone before they reach the content collection.
  const calendarDate = /^[A-Za-z]+ \d{1,2}, \d{4}$/.test(value);
  return new Date(calendarDate ? `${value} UTC` : value);
}

const NUMBER_REGEX = /\.0$/;

export function formatDownloads(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(NUMBER_REGEX, "")}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(NUMBER_REGEX, "")}K`;
  }

  return num.toString();
}
