import BackLink from "@/components/common/BackLink";
import Listing, { ListingItem } from "@/components/layouts/Listing";
import { about } from "@/lib/data";
import { formatToDisplay } from "@/lib/date";
import { getAllNotes } from "@/app/(notes)/_lib/notes";
import { Metadata } from "next";

const personLd = {
  "@context": "https://schema.org/",
  "@type": "Person",
  name: "Shinjith P R",
  url: "https://shnjd.com",
  image: "https://shnjd.com/assets/images/shinjith.jpg",
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
    url: "https://shnjd.com",
    type: "website",
    title: "Shinjith's Notes",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. This is a small corner where I write notes (very rarely). Here you can discover notes on various topics, mostly tech related.",
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
    title: "Shinjith's Notes",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. This is a small corner where I write notes (very rarely). Here you can discover notes on various topics, mostly tech related.",
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
    canonical: "https://shnjd.com/notes",
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
      <Listing>
        <BackLink className="not-prose mb-2" />
        <h1>Notes</h1>
        <p>
          Hello, I&apos;m Shinjith, a software engineer from kerala, India.{" "}
          <br />
          This is a small corner where I write notes (very rarely). Here you can
          discover notes on various topics, mostly tech related.
          <br />
          <br />
          Good day!
        </p>
        <h3>Recent</h3>
        <ul>
          {notes.map((b) => (
            <ListingItem
              key={b.slug}
              href={`/on/${b.slug}`}
              title={b.frontmatter?.title}
              meta={formatToDisplay(new Date(b.frontmatter?.date))}
            />
          ))}
        </ul>
      </Listing>
    </>
  );
}
