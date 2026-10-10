import Link from "next/link";
import { getWikiNode } from "@/app/(wiki)/_lib/wiki";

export default async function Breadcrumbs({ slug }: { slug: string[] }) {
  const ancestors = await Promise.all(
    slug.slice(0, -1).map((_, i) => getWikiNode(slug.slice(0, i + 1))),
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="not-prose text-subtle flex flex-wrap items-center gap-1.5 font-mono text-sm"
    >
      <Link href="/wiki" className="hover:text-fg transition-colors">
        wiki
      </Link>
      {ancestors.map(
        (node) =>
          node && (
            <span key={node.href} className="flex items-center gap-1.5">
              <span>/</span>
              <Link
                href={node.href}
                className="hover:text-fg transition-colors"
              >
                {node.frontmatter.title}
              </Link>
            </span>
          ),
      )}
    </nav>
  );
}
