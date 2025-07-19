import ProjectList from "@/components/projects/project-list";
import { Metadata } from "next";

const breadCrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://shinjith.dev",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://shinjith.dev/projects",
    },
  ],
};

export const metadata: Metadata = {
  title: "Projects | Shinjith P R",
  description:
    "Archive of Projects made using using technologies like JavaScript, React, TypeScript, Material UI, Next.js, Tailwind, Tauri, etc...  | Shinjith P R",
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
    url: "https://shinjith.dev",
    type: "website",
    title: "Projects | Shinjith P R",
    description:
      "Archive of Projects made using using technologies like JavaScript, React, TypeScript, Material UI, Next.js, Tailwind, Tauri, etc...  | Shinjith P R",

    images: [
      {
        url: "/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Elastic Stack, Next.js, Python, JavaScript Tutorials | dminhvu",
  //   description:
  //     "dminhvu.com - Programming blog for everyone to learn Elastic Stack, Next.js, Python, JavaScript, React, Machine Learning, Data Science, and more.",
  //   creator: "@dminhvu02",
  //   site: "@dminhvu02",
  //   images: [
  //     {
  //       url: "https://dminhvu.com/images/home/thumbnail.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "dminhvu"
  //     }
  //   ]
  // },
  // alternates: {
  //   canonical: "https://shinjith.pages.dev/projects",
  // },
};

export default function Projects() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbLd) }}
      />
      <div className="h-[calc(100svh-84px)] w-full text-fg sm:h-[calc(100svh-52px)]">
        <ProjectList />
      </div>
    </>
  );
}
