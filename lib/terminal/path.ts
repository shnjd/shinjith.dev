// The site as a directory tree rooted at `shnjd`. Virtual paths are
// absolute ("/", "/notes", "/wiki/web"); notes live under /notes but are
// served from /on/<slug>.

/** Path segments, without empty parts. */
export const split = (path: string) => path.split("/").filter(Boolean);

export const join = (segments: string[]) => `/${segments.join("/")}`;

/** Virtual path of a site URL path, e.g. /on/git -> /notes/git. */
export function toVirtual(pathname: string) {
  const [first, ...rest] = split(pathname);
  if (first === "on") return join(["notes", ...rest]);
  return join(first ? [first, ...rest] : []);
}

/**
 * Site URL of a virtual path (a directory or an .md file), e.g.
 * /notes/git.md -> /on/git, /wiki/web/index.md -> /wiki/web.
 */
export function toHref(path: string) {
  const segments = split(path.replace(/\.md$/, ""));
  if (segments.at(-1) === "index") segments.pop();
  const [first, ...rest] = segments;

  if (first === "home" && rest.length === 0) return "/";
  if (first === "notes" && rest.length > 0) return join(["on", ...rest]);
  // Projects have no page of their own, only the archive.
  if (first === "projects") return "/projects";
  return join(segments);
}

/**
 * Resolves `arg` against `cwd`. `~` and a leading `/` mean the root; `..`
 * never climbs above it.
 */
export function resolve(cwd: string, arg = "~") {
  const absolute = arg === "~" || arg.startsWith("~/") || arg.startsWith("/");
  const segments = absolute ? [] : split(cwd);

  for (const part of split(arg.replace(/^~/, ""))) {
    if (part === ".") continue;
    if (part === "..") segments.pop();
    else segments.push(part);
  }

  return join(segments);
}

/** How a path reads in a prompt: shnjd, shnjd/notes, ... */
export const display = (path: string) => ["shnjd", ...split(path)].join("/");
