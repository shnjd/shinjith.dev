import Link from "next/link";
import type { WikiNode } from "@/app/(wiki)/_lib/wiki";

// Nested list of wiki pages, used by the contents page and category pages.
export default function WikiList({ nodes }: { nodes: WikiNode[] }) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.href}>
          <Link href={node.href}>{node.frontmatter.title}</Link>
          {node.children.length > 0 && <WikiList nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}
