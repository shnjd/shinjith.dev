import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Cover from "@/components/sections/Cover";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shinjith P R",
  description:
    "Shinjith P R | App Developer, Web Developer, Designer. Experienced developer with expertise in NextJS, React, TypeScript, Redux, React Native, Expo, and other technologies... | Kerala, India",
  keywords: [
    "developer",
    "engineer",
    "shinjith",
    "shinjith p r",
    "web",
    "react",
  ],
  openGraph: {
    url: "https://shinjith.dev",
    type: "website",
    title: "Shinjith P R",
    description:
      "Shinjith P R | App Developer, Web Developer, Designer. Experienced developer with expertise in NextJS, React, TypeScript, Redux, React Native, Expo, and other technologies... | Kerala, India",
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
  //   canonical: "https://shinjith.pages.dev",
  // },
};

export default function Home() {
  return (
    <div className="h-full w-full text-fg">
      <Cover />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </div>
  );
}
