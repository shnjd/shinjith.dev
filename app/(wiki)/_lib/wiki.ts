import fs from "fs";
import path from "path";
import { cache } from "react";
import { MetadataRoute } from "next";
import { loadWikiFile } from "./load";

const WIKI_DIR = path.join(process.cwd(), "app", "(wiki)", "_content");

export type WikiFrontmatter = {
  title: string;
  description?: string;
  created: string;
  updated?: string;
  order?: number;
};

export type WikiNode = {
  slug: string[];
  href: string;
  frontmatter: WikiFrontmatter;
  children: WikiNode[];
};

// A folder's own page is its index.mdx; any other .mdx is a leaf page.
function contentPath(slug: string[]) {
  const dir = path.join(WIKI_DIR, ...slug);
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory()
    ? [...slug, "index"].join("/")
    : slug.join("/");
}

export async function getWikiPage(slug: string[]) {
  return loadWikiFile(contentPath(slug));
}

/** Every content file's path under _content, without the extension. */
export function getWikiFiles(dir: string[] = []): string[] {
  return fs
    .readdirSync(path.join(WIKI_DIR, ...dir), { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory()
        ? getWikiFiles([...dir, e.name])
        : e.name.endsWith(".mdx")
          ? [[...dir, e.name.replace(/\.mdx$/, "")].join("/")]
          : [],
    );
}

async function getFrontmatter(slug: string[]): Promise<WikiFrontmatter> {
  const mod: any = await getWikiPage(slug);
  return mod.frontmatter;
}

function byOrder(a: WikiNode, b: WikiNode) {
  const ao = a.frontmatter.order ?? Infinity;
  const bo = b.frontmatter.order ?? Infinity;
  return ao !== bo
    ? ao - bo
    : a.frontmatter.title.localeCompare(b.frontmatter.title);
}

async function readChildren(slug: string[]): Promise<WikiNode[]> {
  const entries = fs.readdirSync(path.join(WIKI_DIR, ...slug), {
    withFileTypes: true,
  });

  const nodes = await Promise.all(
    entries
      .filter(
        (e) =>
          e.isDirectory() ||
          (e.name.endsWith(".mdx") && e.name !== "index.mdx"),
      )
      .map(async (e) => {
        const childSlug = [...slug, e.name.replace(/\.mdx$/, "")];
        return {
          slug: childSlug,
          href: `/wiki/${childSlug.join("/")}`,
          frontmatter: await getFrontmatter(childSlug),
          children: e.isDirectory() ? await readChildren(childSlug) : [],
        };
      }),
  );

  return nodes.sort(byOrder);
}

/** Categories at the top level, each with its pages, in `order`. */
export const getWikiTree = cache(() => readChildren([]));

function flatten(nodes: WikiNode[]): WikiNode[] {
  return nodes.flatMap((n) => [n, ...flatten(n.children)]);
}

export async function getAllWikiNodes() {
  return flatten(await getWikiTree());
}

export async function getWikiNode(slug: string[]) {
  const href = `/wiki/${slug.join("/")}`;
  return (await getAllWikiNodes()).find((n) => n.href === href);
}

export async function getWikiSitemap(
  baseUrl: string,
): Promise<MetadataRoute.Sitemap> {
  return (await getAllWikiNodes()).map((n) => ({
    url: `${baseUrl}${n.href}`,
    lastModified: new Date(n.frontmatter.updated || n.frontmatter.created),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
}
