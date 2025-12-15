import { formatDateToDisplay } from "@/utils/date";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await import(`@/notes/${slug}.mdx`);

    return {
      title: frontmatter?.title,
      description: frontmatter?.description,
      keywords: [
        ...frontmatter.tags,
        "shinjith",
        "shinjith-dev",
        "shnjd",
        "shinjith's blogs",
      ],
      openGraph: {
        url: "https://shinjith.dev",
        type: "article",
        title: frontmatter?.title,
        description: frontmatter?.description,
        images: [
          {
            url:
              frontmatter.cover || `https://shinjith.dev/api/og/note/${slug}`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter?.title,
        description: frontmatter?.description,
        creator: "@shnjd_",
        images: [
          {
            url:
              frontmatter.cover || `https://shinjith.dev/api/og/note/${slug}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (err) {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { default: Blog, frontmatter } = await import(`@/notes/${slug}.mdx`);

    const blogLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",

      headline: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.tags,
      image: frontmatter.cover || `https://shinjith.dev/api/og/note/${slug}`,

      url: `https://shinjith.dev/on/${slug}`,

      datePublished: frontmatter.date,
      dateModified: frontmatter.updatedAt || frontmatter.date,

      author: {
        "@type": "Person",
        name: "Shinjith P R",
        url: "https://shinjith.dev",
      },

      publisher: {
        "@type": "Organization",
        name: "shinjith.dev",
        logo: {
          "@type": "ImageObject",
          url: "https://shinjith.dev/assets/favicons/apple-touch-icon.png",
        },
      },

      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://shinjith.dev/on/${slug}`,
      },
    };

    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }}
        />
        <h1 className="mb-4 mt-7">{frontmatter.title}</h1>
        <p className="mb-4 text-sm italic !text-subtle">
          Added on {formatDateToDisplay(new Date(frontmatter.date))}
        </p>
        <hr className="my-7 border-t" />
        <Blog />
      </article>
    );
  } catch {
    notFound();
  }
}
