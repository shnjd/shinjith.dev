import Link from "next/link";
import type { WikiNode } from "@/app/(wiki)/_lib/wiki";

type Row = { node: WikiNode; prefix: string };

// Flattens the tree into rows prefixed like `tree` command output.
function toRows(nodes: WikiNode[], indent = ""): Row[] {
  return nodes.flatMap((node, i) => {
    const last = i === nodes.length - 1;
    return [
      { node, prefix: indent + (last ? "└── " : "├── ") },
      ...toRows(node.children, indent + (last ? "    " : "│   ")),
    ];
  });
}

export default function WikiTree({
  tree,
  root = "wiki/",
}: {
  tree: WikiNode[];
  root?: string;
}) {
  return (
    <div className="not-prose text-subtle leading-7">
      <p className="text-muted font-mono">{root}</p>
      <ul>
        {toRows(tree).map(({ node, prefix }) => (
          <li key={node.href} className="flex">
            <span
              aria-hidden
              className="text-muted/60 font-mono whitespace-pre select-none"
            >
              {prefix}
            </span>
            <Link
              href={node.href}
              className={
                node.children.length
                  ? "text-fg hover:text-link font-medium"
                  : "hover:text-link"
              }
            >
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
