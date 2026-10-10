import { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/common/BackLink";
import Prose from "@/components/layouts/Prose";
import { getWikiTree } from "@/app/(wiki)/_lib/wiki";
import WikiList from "@/app/(wiki)/_components/WikiList";

const description =
  "Shinjith's personal wiki: short reference notes on computer networks, web, security and system administration.";

export const metadata: Metadata = {
  title: "Shinjith's Wiki",
  description,
  keywords: ["wiki", "networking", "web security", "shinjith", "shnjd"],
  openGraph: {
    url: "https://shnjd.com/wiki",
    type: "website",
    title: "Shinjith's Wiki",
    description,
    images: [
      {
        url: "https://shnjd.com/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinjith's Wiki",
    description,
    creator: "@shnjd_",
    images: [
      {
        url: "https://shnjd.com/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: "https://shnjd.com/wiki",
  },
};

export default async function WikiIndexPage() {
  const tree = await getWikiTree();

  return (
    <Prose className="mx-auto min-h-[calc(100dvh-52px)] max-w-5xl py-20">
      <BackLink className="not-prose mb-2" />
      <h1>Wiki</h1>
      <p>
        Short reference notes I keep while learning, mostly on networks, the web
        and security.
      </p>
      <div className="mt-10 gap-x-10 sm:columns-2">
        {tree.map((category) => (
          <section key={category.href} className="break-inside-avoid">
            <h3 className="mt-4">
              <Link href={category.href}>{category.frontmatter.title}</Link>
            </h3>
            {category.children.length > 0 && (
              <WikiList nodes={category.children} />
            )}
          </section>
        ))}
      </div>
    </Prose>
  );
}
