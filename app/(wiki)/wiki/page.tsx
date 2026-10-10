import { Metadata } from "next";
import BackLink from "@/components/common/BackLink";
import Listing, { ListingItem } from "@/components/layouts/Listing";
import { formatToDisplay } from "@/lib/date";
import { getWikiTree, WikiNode } from "@/app/(wiki)/_lib/wiki";

const description =
  "Shinjith's personal wiki: short reference notes on computer networks, web, security and system administration.";

const images = [
  {
    url: "https://shnjd.com/assets/images/seo-cover.png",
    width: 1200,
    height: 630,
  },
];

export const metadata: Metadata = {
  title: "Shinjith's Wiki",
  description,
  keywords: ["wiki", "networking", "web security", "shinjith", "shnjd"],
  openGraph: {
    url: "https://shnjd.com/wiki",
    type: "website",
    title: "Shinjith's Wiki",
    description,
    images,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinjith's Wiki",
    description,
    creator: "@shnjd_",
    images,
  },
  alternates: {
    canonical: "https://shnjd.com/wiki",
  },
};

const RECENT_COUNT = 10;

const modifiedAt = (node: WikiNode) =>
  new Date(node.frontmatter.updated || node.frontmatter.created);

// Every page with the title of the section it sits in.
function withSection(nodes: WikiNode[], section?: string) {
  return nodes.flatMap((node): { node: WikiNode; section?: string }[] => [
    { node, section },
    ...withSection(node.children, node.frontmatter.title),
  ]);
}

export default async function WikiIndexPage() {
  const tree = await getWikiTree();
  const recent = withSection(tree)
    .sort((a, b) => modifiedAt(b.node).getTime() - modifiedAt(a.node).getTime())
    .slice(0, RECENT_COUNT);

  return (
    <Listing>
      <BackLink className="not-prose mb-2" />
      <h1>Wiki</h1>
      <p>
        Short reference notes I keep while learning, mostly on networks, the web
        and security.
      </p>
      <h3>Recent</h3>
      <ul>
        {recent.map(({ node, section }) => (
          <ListingItem
            key={node.href}
            href={node.href}
            title={
              <>
                {node.frontmatter.title}
                {section && <span className="text-muted">· {section}</span>}
              </>
            }
            meta={formatToDisplay(modifiedAt(node))}
          />
        ))}
      </ul>
    </Listing>
  );
}
