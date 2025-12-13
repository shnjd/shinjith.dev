import "@/styles/globals.css";
import { ibmPlexMono, rubik } from "@/lib/fonts";
import { ReactLenis } from "@/lib/lenis";
import SectionContextProvider from "@/contexts/SectionContext";

import type { Viewport, Metadata } from "next";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Background from "@/components/layouts/Background";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shinjith P R",
  url: "https://shinjith.dev",
  author: {
    "@type": "Person",
    name: "Shinjith P R",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shinjith.dev"),
  openGraph: {
    siteName: "Shinjith P R",
    type: "website",
    locale: "en_US",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
    images: [
      {
        url: "https://shinjith.dev/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "Shinjith P R",
  appleWebApp: {
    title: "Shinjith P R",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/assets/favicon/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/assets/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/assets/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/assets/favicon/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/assets/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${ibmPlexMono.variable} max-w-screen relative h-full min-h-dvh w-full overflow-y-auto overflow-x-hidden bg-background font-sans text-base text-fg`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <ReactLenis root>
          <SectionContextProvider>
            <Background />
            <Navbar />
            <main className="container relative z-10">{children}</main>
            <Footer />
          </SectionContextProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
