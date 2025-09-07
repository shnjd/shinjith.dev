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
  const defaultMeta = {
    title: "Shinjith P R | Web & App Developer – React, Next.js, TypeScript",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
    keywords: ["shinjith", "shnjd", "shnjd on", "shnjd blogs"],
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: "index, follow",
    },
    openGraph: {
      url: "https://shinjith.dev",
      type: "website",
      title: "Shinjith P R | Web & App Developer – React, Next.js, TypeScript",
      description:
        "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
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
      title: "Shinjith P R | Web & App Developer – React, Next.js, TypeScript",
      description:
        "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
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

  const { slug } = await params;
  try {
    const { default: Post, frontmatter } = await import(`@/blogs/${slug}.mdx`);

    return {
      ...defaultMeta,
      title: frontmatter?.title,
      keywords: [...frontmatter.tags, ...defaultMeta.keywords],
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
    const { default: Post, frontmatter } = await import(`@/blogs/${slug}.mdx`);
    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <h1>{frontmatter.title}</h1>
        <hr />
        <Post />
      </article>
    );
  } catch {
    notFound();
  }
}
