// Shared bits of page metadata. Next.js replaces a parent's openGraph object
// instead of merging it, so every page spreads `openGraphBase` into its own.

export const SITE_URL = "https://shnjd.com";

export const openGraphBase = {
  siteName: "Shinjith P R",
  locale: "en_US",
} as const;

export const author = {
  "@type": "Person",
  name: "Shinjith P R",
  url: SITE_URL,
} as const;

/** BreadcrumbList JSON-LD for a trail of `{ name, path }`, starting at Home. */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...trail].map(
      ({ name, path }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
        item: `${SITE_URL}${path}`,
      }),
    ),
  };
}
