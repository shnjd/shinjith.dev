/// <reference types="mdx" />
import { ComponentType } from "react";
import type { TerminalManifest } from "@/app/api/terminal/route";
import { loadNote } from "@/app/(notes)/_lib/load";
import { loadWikiFile } from "@/app/(wiki)/_lib/load";
import { split } from "@/lib/terminal/path";
import { projectDoc, projects } from "./projects";

/** What `cat` renders. */
export type Doc = {
  title?: string;
  description?: string;
  date?: string;
  Content: ComponentType;
};

export type FileNode = { type: "file"; load: () => Promise<Doc> };
export type DirNode = { type: "dir"; children: Map<string, FsNode> };
export type FsNode = FileNode | DirNode;

type MdxModule = {
  default: ComponentType;
  frontmatter?: {
    title?: string;
    description?: string;
    date?: string;
    created?: string;
    updated?: string;
  };
};

const fromMdx = ({ default: Content, frontmatter: fm = {} }: MdxModule) => ({
  title: fm.title,
  description: fm.description,
  date: fm.date ?? fm.updated ?? fm.created,
  Content,
});

const dir = (): DirNode => ({ type: "dir", children: new Map() });

function add(root: DirNode, path: string, load: () => Promise<Doc>) {
  const segments = split(path);
  const name = segments.pop()!;
  let parent = root;
  for (const segment of segments) {
    let next = parent.children.get(segment);
    if (next?.type !== "dir") {
      next = dir();
      parent.children.set(segment, next);
    }
    parent = next;
  }
  parent.children.set(name, { type: "file", load });
}

export function lookup(root: DirNode, path: string): FsNode | undefined {
  let node: FsNode | undefined = root;
  for (const segment of split(path)) {
    if (node?.type !== "dir") return undefined;
    node = node.children.get(segment);
  }
  return node;
}

/** Nearest directory at or above `path`. */
export function nearestDir(root: DirNode, path: string) {
  const segments = split(path);
  while (segments.length) {
    if (lookup(root, `/${segments.join("/")}`)?.type === "dir") break;
    segments.pop();
  }
  return `/${segments.join("/")}`;
}

/** Entries of a directory, sorted by name. */
export const entries = (node: DirNode) =>
  [...node.children.entries()].sort(([a], [b]) => a.localeCompare(b));

let pending: Promise<DirNode> | undefined;

/** The whole site as a tree: content pages as .md files in folders. */
export function loadFs() {
  pending ??= fetch("/api/terminal")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<TerminalManifest>;
    })
    .then(({ notes, wiki }) => {
      const root = dir();
      // The landing page as markdown, written from lib/data.
      add(root, "home.md", () =>
        import("@/app/_content/home.mdx").then((mod) =>
          fromMdx(mod as MdxModule),
        ),
      );
      for (const project of projects)
        add(root, `projects/${project.id}.md`, async () => projectDoc(project));
      root.children.set("notes", dir());
      root.children.set("wiki", dir());
      for (const slug of notes)
        add(root, `notes/${slug}.md`, () => loadNote(slug).then(fromMdx));
      for (const file of wiki)
        add(root, `wiki/${file}.md`, () => loadWikiFile(file).then(fromMdx));
      return root;
    })
    .catch((err) => {
      pending = undefined;
      throw err;
    });
  return pending;
}
