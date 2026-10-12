export const toKebabCase = (str: string | null | undefined): string => {
  if (!str) return "";
  return (
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      ?.map((x) => x.toLowerCase())
      .join("-") ?? ""
  );
};

/** Plain text of a React node tree, e.g. a heading's children. */
export const textContent = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return `${node}`;
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (typeof node === "object" && "props" in node)
    return textContent((node.props as { children?: React.ReactNode }).children);
  return "";
};

/** URL-safe anchor id for a heading. */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
