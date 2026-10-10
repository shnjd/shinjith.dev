import { MetadataRoute } from "next";
import { getNotesSitemap } from "@/app/(notes)/_lib/notes";
import { getWikiSitemap } from "@/app/(wiki)/_lib/wiki";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shnjd.com";

  const notes = getNotesSitemap(baseUrl);
  const wiki = await getWikiSitemap(baseUrl);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://shnjd.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://shnjd.com/notes",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://shnjd.com/wiki",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://shnjd.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...notes, ...wiki];
}
