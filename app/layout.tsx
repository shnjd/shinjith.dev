import "./globals.css";
import Navbar from "@/components/common/navbar";
import { rubik } from "@/lib/fonts";
import Background from "@/components/common/Background";
import { ReactLenis } from "@/lib/lenis";
import SectionContextProvider from "@/components/contexts/SectionContext";
import Loader from "@/components/common/loader";

import type { Viewport, Metadata } from "next";
import Footer from "@/components/common/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shinjith.dev"),
  openGraph: {
    siteName: "Shinjith P R",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  // alternates: {
  //   types: {
  //     "application/rss+xml": "https://dminhvu.com/rss.xml"
  //   }
  // },
  applicationName: "Shinjith P R",
  appleWebApp: {
    title: "Shinjith P R",
    statusBarStyle: "default",
    capable: true,
  },
  // verification: {
  //   google: "YOUR_DATA",
  //   yandex: ["YOUR_DATA"],
  //   other: {
  //     "msvalidate.01": ["YOUR_DATA"],
  //     "facebook-domain-verification": ["YOUR_DATA"]
  //   }
  // },
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
        className={`${rubik.className} max-w-screen relative h-full min-h-svh w-full overflow-y-auto overflow-x-hidden bg-background text-base text-fg`}
      >
        <Loader>
          <ReactLenis root>
            <SectionContextProvider>
              <Background />
              <Navbar />
              <main className="container relative z-10">{children}</main>
              <Footer />
            </SectionContextProvider>
          </ReactLenis>
        </Loader>
      </body>
    </html>
  );
}
