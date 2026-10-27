import Listing, { ListingItem } from "@/components/layouts/Listing";
import { about } from "@/lib/data";
import { formatToDisplay } from "@/lib/date";
import { getAllNotes } from "@/app/(notes)/_lib/notes";
import { Metadata } from "next";
import { breadcrumbLd, openGraphBase } from "@/lib/seo";

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
    name: "Hexad Infosoft",
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
  openGraph: {
    ...openGraphBase,
    url: "https://shnjd.com/notes",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: "Notes", path: "/notes" }]),
          ),
        }}
      />
      <Listing>
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
        <h2>Recent</h2>
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
