import { Metadata } from "next";
import ProjectList from "./_components/ProjectList";

const breadCrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://shnjd.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://shnjd.com/projects",
    },
  ],
};

export const metadata: Metadata = {
  title: "Projects | Shinjith P R",
  description:
    "Projects Shinjith P R has built, listed by date: web and desktop apps made with React, Next.js, TypeScript, Tailwind, Material UI and Tauri.",
  keywords: [
    "JavaScript",
    "React",
    "TypeScript",
    "Material UI",
    "Next.js",
    "Tailwind",
    "Tauri",
  ],
  openGraph: {
    url: "https://shnjd.com/projects",
    type: "website",
    title: "Projects | Shinjith P R",
    description:
      "Projects Shinjith P R has built, listed by date: web and desktop apps made with React, Next.js, TypeScript, Tailwind, Material UI and Tauri.",

    images: [
      {
        url: "/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: "https://shnjd.com/projects",
  },
};

export default function Projects() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbLd) }}
      />
      <div className="text-fg min-h-[calc(100dvh-84px)] w-full sm:min-h-[calc(100svh-52px)]">
        <ProjectList />
      </div>
    </>
  );
}
