import { Metadata } from 'next';
import ProjectList from './_components/ProjectList';

const breadCrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://shnjd.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://shnjd.com/projects',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Projects | Shinjith P R',
  description:
    'Archive of Projects made using using technologies like JavaScript, React, TypeScript, Material UI, Next.js, Tailwind, Tauri, etc...  | Shinjith P R',
  keywords: [
    'JavaScript',
    'React',
    'TypeScript',
    'Material UI',
    'Next.js',
    'Tailwind',
    'Tauri',
  ],
  openGraph: {
    url: 'https://shnjd.com',
    type: 'website',
    title: 'Projects | Shinjith P R',
    description:
      'Archive of Projects made using using technologies like JavaScript, React, TypeScript, Material UI, Next.js, Tailwind, Tauri, etc...  | Shinjith P R',

    images: [
      {
        url: '/assets/images/seo-cover.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://shnjd.com/projects',
  },
};

export default function Projects() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbLd) }}
      />
      <div className="text-fg h-[calc(100dvh-84px)] w-full sm:h-[calc(100svh-52px)]">
        <ProjectList />
      </div>
    </>
  );
}
