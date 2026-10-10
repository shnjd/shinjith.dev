import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { loadNote } from "./load";

const NOTES_DIR = path.join(process.cwd(), "app", "(notes)", "_content");

export const getNote = loadNote;

export function getNoteSlugs() {
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllNotes() {
  const notes = await Promise.all(
    getNoteSlugs().map(async (slug) => {
      const mod: any = await getNote(slug);

      return {
        slug,
        frontmatter: mod.frontmatter,
      };
    }),
  );

  return notes.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export function getNotesSitemap(baseUrl: string): MetadataRoute.Sitemap {
  return getNoteSlugs().map((slug) => ({
    url: `${baseUrl}/on/${slug}`,
    lastModified: fs.statSync(path.join(NOTES_DIR, `${slug}.mdx`)).mtime,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
