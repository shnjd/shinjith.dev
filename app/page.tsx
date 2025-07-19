import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Cover from "@/components/sections/Cover";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import { Metadata, Viewport } from "next";

const personLd = {
  "@context": "https://schema.org/",
  "@type": "Person",
  name: "Shinjith P R",
  url: "https://shinjith.dev",
  image: "https://shinjith.dev/assets/images/shinjith.jpg",
  sameAs: [
    "https://x.com/shinjithr",
    "https://www.instagram.com/shinjith_",
    "https://www.linkedin.com/in/shinjithkanhangad",
    "https://github.com/shinjith-dev",
  ],
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
    creator: "@shinjithr",
    images: [
      {
        url: "/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="h-full w-full text-fg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Cover />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
