import "@/styles/globals.css";
import { ibmPlexMono, rubik } from "@/lib/fonts";

import type { Viewport, Metadata } from "next";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Background from "@/components/layouts/Background";
import MotionProvider from "@/components/layouts/MotionProvider";
import TerminalProvider from "@/contexts/TerminalContext";
import { THEME_COLORS } from "@/lib/constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

// Runs before first paint so a saved or system dark theme never flashes light,
// and pins theme-color to the chosen theme (the media tags follow the OS only).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var m=document.createElement("meta");m.name="theme-color";m.content=d?"${THEME_COLORS.dark}":"${THEME_COLORS.light}";document.head.prepend(m)}catch(e){}})()`;

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Shinjith P R",
  url: "https://shnjd.com",
  author: {
    "@type": "Person",
    name: "Shinjith P R",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shnjd.com"),
  openGraph: {
    siteName: "Shinjith P R",
    type: "website",
    locale: "en_US",
    description:
      "Shinjith P R – Web & App Developer from Kerala, India. Expert in React, Next.js, TypeScript, Redux, React Native, and Expo. Designer & full-stack builder.",
    images: [
      {
        url: "https://shnjd.com/assets/images/seo-cover.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  // Indexing is the default; only widen image previews in results.
  robots: { "max-image-preview": "large" },
  applicationName: "Shinjith P R",
  appleWebApp: {
    title: "Shinjith P R",
    statusBarStyle: "default",
    capable: true,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
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
    <html
      lang="en"
      className={`${rubik.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Entrance animations start hidden; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`bg-background text-fg relative h-full min-h-dvh w-full max-w-screen overflow-x-hidden overflow-y-auto font-sans text-base`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <a
          href="#main"
          className="bg-surface text-fg sr-only z-1000 rounded focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TerminalProvider>
            <Background />
            <Navbar />
            <main
              id="main"
              tabIndex={-1}
              className="relative z-10 container outline-none"
            >
              {children}
            </main>
            <Footer />
          </TerminalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
