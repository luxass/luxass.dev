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

const numberRegex = /\.0$/;

export function formatDownloads(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(numberRegex, "")}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(numberRegex, "")}K`;
  }

  return num.toString();
}

export function downloadsSort(a: CollectionEntry<"projects">, b: CollectionEntry<"projects">) {
  const aDownloads = a.data.downloads || 0;
  const bDownloads = b.data.downloads || 0;
  return bDownloads - aDownloads;
}

/**
 * Get the primary domain (luxass.dev) and alternate domain (luxass.com)
 */
export function getDomains() {
  const isAlternate = import.meta.env.SITE_HOST === "luxass.com";
  const primaryDomain = "https://luxass.dev";
  const alternateDomain = "https://luxass.com";

  return {
    current: isAlternate ? alternateDomain : primaryDomain,
    primary: primaryDomain,
    alternate: alternateDomain,
    isAlternate,
  };
}

/**
 * Get the canonical URL for a given pathname
 */
export function getCanonicalUrl(pathname: string): string {
  const { primary } = getDomains();
  return `${primary}${pathname}`;
}

/**
 * Get alternate URLs for hreflang tags
 */
export function getAlternateUrls(pathname: string) {
  const { primary, alternate } = getDomains();
  return [
    { hreflang: "x-default", url: `${primary}${pathname}` },
    { hreflang: "en", url: `${primary}${pathname}` },
    { hreflang: "en-us", url: `${alternate}${pathname}` },
  ];
}
