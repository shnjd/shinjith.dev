import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shnjd.com";

  const notesDir = path.join(process.cwd(), "notes");
  const files = fs.readdirSync(notesDir);

  const notes = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const stats = fs.statSync(path.join(notesDir, file));

      return {
        url: `${baseUrl}/on/${slug}`,
        lastModified: stats.mtime,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

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
      url: "https://shnjd.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...notes];
}
