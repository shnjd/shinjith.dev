"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight } from "@tabler/icons-react";
import type { WikiNode } from "@/app/(wiki)/_lib/wiki";
import { tw } from "@/utils/cn";

const itemClass = (active: boolean) =>
  tw(
    "block flex-1 rounded-md px-2 py-1.5 transition-colors",
    active
      ? "bg-accent/60 text-accent-fg font-medium"
      : "text-subtle hover:bg-accent/30 hover:text-fg",
  );

function Item({ node, pathname }: { node: WikiNode; pathname: string }) {
  const active = pathname === node.href;
  const inside = pathname.startsWith(`${node.href}/`);
  const [open, setOpen] = useState(active || inside);

  if (!node.children.length) {
    return (
      <li>
        <Link href={node.href} className={itemClass(active)}>
          {node.frontmatter.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-center gap-1">
        <Link href={node.href} className={itemClass(active)}>
          {node.frontmatter.title}
        </Link>
        <button
          type="button"
          aria-label={`${open ? "Collapse" : "Expand"} ${node.frontmatter.title}`}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="text-muted hover:bg-accent/30 hover:text-fg rounded-md p-1.5 transition-colors"
        >
          <IconChevronRight
            size={14}
            className={tw("transition-transform", open && "rotate-90")}
          />
        </button>
      </div>
      {open && (
        <ul className="border-border mt-1 ml-3 space-y-0.5 border-l pl-2">
          {node.children.map((child) => (
            <Item key={child.href} node={child} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
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
      <ul className="space-y-0.5">
        {tree.map((node) => (
          <Item key={node.href} node={node} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}
