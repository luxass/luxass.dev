export const siteDomains = {
  primary: "https://luxass.dev",
  alternate: "https://luxass.com",
};

export function getCurrentDomain(siteHost?: string): string {
  return siteHost === "luxass.com" ? siteDomains.alternate : siteDomains.primary;
}

export function getDomains() {
  const current = getCurrentDomain(import.meta.env.SITE_HOST);

  return {
    current,
    primary: siteDomains.primary,
    alternate: siteDomains.alternate,
    isAlternate: current === siteDomains.alternate,
  };
}

export function getCanonicalUrl(pathname: string): string {
  return `${siteDomains.primary}${pathname}`;
}

export function getAlternateUrls(pathname: string) {
  return [
    { hreflang: "x-default", url: `${siteDomains.primary}${pathname}` },
    { hreflang: "en", url: `${siteDomains.primary}${pathname}` },
  ];
}
