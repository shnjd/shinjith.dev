"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { WikiNode } from "@/app/(wiki)/_lib/wiki";
import { tw } from "@/utils/cn";

function Tree({ nodes, pathname }: { nodes: WikiNode[]; pathname: string }) {
  return (
    <ul className="border-border space-y-1 border-l pl-3">
      {nodes.map((node) => (
        <li key={node.href}>
          <Link
            href={node.href}
            className={tw(
              "hover:text-fg block py-0.5 transition-colors",
              pathname === node.href ? "text-fg font-medium" : "text-subtle",
            )}
          >
            {node.frontmatter.title}
          </Link>
          {node.children.length > 0 && pathname.startsWith(node.href) && (
            <div className="mt-1">
              <Tree nodes={node.children} pathname={pathname} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function WikiSidebar({
  tree,
  className,
}: {
  tree: WikiNode[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Wiki" className={tw("text-sm", className)}>
      <Link href="/wiki" className="text-fg mb-3 block font-mono font-semibold">
        Wiki
      </Link>
      <Tree nodes={tree} pathname={pathname} />
    </nav>
  );
}
