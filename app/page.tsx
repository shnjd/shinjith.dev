import { Metadata } from "next";
import LandingPage from "./_components/LandingPage";
import { about } from "@/lib/data";

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
  title: "Shinjith P R | Web & App Developer – React, Next.js, TypeScript",
  description:
    "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
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
    "freelance developer Kerala",
    "web development services",
    "mobile app development",
    "developer portfolio",
    "web developer India",
    "UI developer",
    "JavaScript developer",
    "shinjith-dev",
    "shnjd",
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
  alternates: {
    canonical: "https://shinjith.dev",
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
