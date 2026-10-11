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

// lastmod comes from frontmatter, not file mtimes, which change on every
// checkout and would make every build look like an update.
export const noteModifiedAt = (frontmatter: {
  date: string;
  updatedAt?: string;
}) => new Date(frontmatter.updatedAt || frontmatter.date);

export async function getNotesSitemap(
  baseUrl: string,
): Promise<MetadataRoute.Sitemap> {
  return (await getAllNotes()).map(({ slug, frontmatter }) => ({
    url: `${baseUrl}/on/${slug}`,
    lastModified: noteModifiedAt(frontmatter),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
