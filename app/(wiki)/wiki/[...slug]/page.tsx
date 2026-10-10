import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllWikiNodes,
  getWikiNode,
  getWikiPage,
} from "@/app/(wiki)/_lib/wiki";
import Breadcrumbs from "@/app/(wiki)/_components/Breadcrumbs";
import WikiTree from "@/app/(wiki)/_components/WikiTree";
import { formatDateToDisplay } from "@/utils/date";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllWikiNodes()).map((node) => ({ slug: node.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const node = await getWikiNode(slug);
  if (!node) return {};

  const { title, description } = node.frontmatter;
  const url = `https://shnjd.com${node.href}`;
  const images = [
    {
      url: "https://shnjd.com/assets/images/seo-cover.png",
      width: 1200,
      height: 630,
    },
  ];

  return {
    title: `${title} · Wiki`,
    description,
    keywords: [title, "wiki", "shinjith", "shnjd", "shinjith's wiki"],
    openGraph: { url, type: "article", title, description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@shnjd_",
      images,
    },
    alternates: { canonical: url },
  };
}

export default async function WikiPage({ params }: Props) {
  const { slug } = await params;
  const node = await getWikiNode(slug);
  if (!node) notFound();

  const { default: Content } = await getWikiPage(slug);
  const { title, created, updated } = node.frontmatter;

  return (
    <article>
      <Breadcrumbs slug={slug} />
      <h1 className="mt-5 mb-0">{title}</h1>
      <p className="text-subtle! mt-2 mb-0 text-sm">
        Added on {formatDateToDisplay(new Date(created))}
        {updated && <> · Updated on {formatDateToDisplay(new Date(updated))}</>}
      </p>
      <hr className="my-7 border-t" />
      <Content />
      {node.children.length > 0 && (
        <>
          <h2>Pages</h2>
          <WikiTree tree={node.children} root={`${slug.join("/")}/`} />
        </>
      )}
    </article>
  );
}
