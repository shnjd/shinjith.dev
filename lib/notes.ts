import fs from "fs";
import path from "path";

const NOTES_DIR = path.join(process.cwd(), "notes");

export async function getAllNotes() {
  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));

  const notes = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(".mdx", "");
      const mod: any = await import(`@/notes/${slug}.mdx`);

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
