import { MetadataRoute } from "next";
import { getNotesSitemap } from "@/app/(notes)/_lib/notes";
import { getWikiSitemap } from "@/app/(wiki)/_lib/wiki";

// A listing changes when its newest entry does.
const latest = (entries: MetadataRoute.Sitemap) =>
  entries.reduce<Date | undefined>((max, { lastModified }) => {
    const date = lastModified ? new Date(lastModified) : undefined;
    return date && (!max || date > max) ? date : max;
  }, undefined);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shnjd.com";

  const notes = await getNotesSitemap(baseUrl);
  const wiki = await getWikiSitemap(baseUrl);

  // Home and projects have no content date to report, so they omit lastmod
  // rather than claiming a change on every build.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://shnjd.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shnjd.com/notes",
      lastModified: latest(notes),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://shnjd.com/wiki",
      lastModified: latest(wiki),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://shnjd.com/projects",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...notes, ...wiki];
}
