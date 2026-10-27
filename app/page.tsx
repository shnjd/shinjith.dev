import { Metadata } from "next";
import LandingPage from "./_components/LandingPage";
import { about } from "@/lib/data";
import { openGraphBase } from "@/lib/seo";

const personLd = {
  "@context": "https://schema.org/",
  "@type": "Person",
  name: "Shinjith P R",
  url: "https://shnjd.com",
  image: "https://shnjd.com/assets/images/shinjith.jpg",
  sameAs: Object.values(about.handles),
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Hexad Infosoft",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Python",
    "Frappe",
    "Docker",
    "Full Stack Development",
    "UI/UX",
  ],
};

export const metadata: Metadata = {
  title: "Shinjith P R | Software Engineer – React, Next.js, TypeScript",
  description:
    "Shinjith P R – Software Engineer in Bengaluru, India, building web, mobile and ERP products end to end with React, Next.js, TypeScript, Python and Frappe.",
  keywords: [
    "web developer",
    "app developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "TypeScript developer",
    "Redux developer",
    "Expo developer",
    "front end developer",
    "full stack web developer",
    "freelance web developer",
    "software engineer Bengaluru",
    "web development services",
    "mobile app development",
    "developer portfolio",
    "web developer India",
    "UI developer",
    "JavaScript developer",
    "shinjith-dev",
    "shnjd",
  ],
  openGraph: {
    ...openGraphBase,
    url: "https://shnjd.com",
    type: "website",
    title: "Shinjith P R | Software Engineer – React, Next.js, TypeScript",
    description:
      "Shinjith P R – Software Engineer in Bengaluru, India, building web, mobile and ERP products end to end with React, Next.js, TypeScript, Python and Frappe.",
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
    title: "Shinjith P R | Software Engineer – React, Next.js, TypeScript",
    description:
      "Shinjith P R – Software Engineer in Bengaluru, India, building web, mobile and ERP products end to end with React, Next.js, TypeScript, Python and Frappe.",
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
    canonical: "https://shnjd.com",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <LandingPage />
    </>
  );
}
