import { about } from "@/lib/data";
import { formatToDisplay } from "@/lib/date";
import { getAllNotes } from "@/lib/notes";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Shinjith's Notes",
  description:
    "Shinjith P R – Web & App Developer from Kerala, India. This is a small corner where I write notes (very rarely). Here you can discover notes on various topics, mostly tech related.",
  keywords: [
    "git",
    "shinjith-dev",
    "shnjd",
    "shinjith's notes",
    "shinjith's blogs",
  ],
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
    title: "Shinjith's Notes",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. This is a small corner where I write notes (very rarely). Here you can discover notes on various topics, mostly tech related.",
    images: [
      {
        url: "https://shinjith.dev/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinjith's Notes",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. This is a small corner where I write notes (very rarely). Here you can discover notes on various topics, mostly tech related.",
    creator: "@shnjd_",
    images: [
      {
        url: "https://shinjith.dev/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: "https://shinjith.dev/notes",
  },
};

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <div className="prose-a:text-subtle, prose mx-auto min-h-[calc(100dvh-52px)] max-w-4xl py-20 prose-headings:font-sans prose-headings:text-fg prose-h1:text-3xl prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-semibold prose-p:text-subtle prose-a:font-normal prose-a:text-subtle prose-a:no-underline prose-blockquote:text-subtle prose-strong:text-fg prose-code:font-mono prose-code:text-fg prose-code:before:hidden prose-code:after:hidden prose-pre:bg-surface/70 prose-pre:text-fg prose-hr:border-border prose-lead:text-fg">
        <h1>Notes</h1>
        <p>
          Hello, I&apos;m Shinjith, a software engineer from kerala, India.{" "}
          <br />
          This is a small corner where I write notes (very rarely).
          <br />
          Here you can discover notes on various topics, mostly tech related.
          <br />
          <br />
          Good day!
        </p>
        <h3>Recent</h3>
        <ul>
          {notes.map((b) => (
            <li key={b.slug}>
              <a
                href={`/on/${b.slug}`}
                className="flex w-full items-center gap-1"
              >
                {b.frontmatter?.title}
                <span className="flex-1 border-t border-border" />
                <span className="text-sm text-muted">
                  {formatToDisplay(new Date(b.frontmatter?.date))}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
