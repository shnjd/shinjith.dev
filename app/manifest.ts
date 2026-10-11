import { MetadataRoute } from "next";
import { THEME_COLORS } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shinjith P R",
    short_name: "shnjd",
    description:
      "Shinjith P R, web and app developer: portfolio, notes and a personal wiki.",
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
    icons: [
      {
        src: "/assets/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/favicon/maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
