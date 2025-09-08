import { about } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const personLd = {
  "@context": "https://schema.org/",
  "@type": "Person",
  name: "Shinjith P R",
  url: "https://shinjith.dev",
  image: "https://shinjith.dev/assets/images/shinjith.jpg",
  sameAs: Object.values(about.handles),
  jobTitle: "Web & App Developer",
  worksFor: {
    "@type": "Organization",
    name: "Sustainability Economics",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Redux",
    "React Native",
    "Expo",
    "Frontend Development",
    "UI/UX",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await import(`@/blogs/${slug}.mdx`);

    return {
      title: frontmatter?.title,
      description: frontmatter?.description,
      keywords: [
        ...frontmatter.tags,
        "shinjith",
        "shinjith-dev",
        "shnjd",
        "shinjith blogs",
      ],
      openGraph: {
        url: "https://shinjith.dev",
        type: "article",
        title: frontmatter?.title,
        description: frontmatter?.description,
        images: [
          {
            url: "/assets/images/seo-cover.png",
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
            url: "/assets/images/seo-cover.png",
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
    const { default: Blog, frontmatter } = await import(`@/blogs/${slug}.mdx`);
    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <h1 className="mb-3 mt-7">{frontmatter.title}</h1>
        <hr className="my-7 border-t" />
        <Blog />
      </article>
    );
  } catch {
    notFound();
  }
}
