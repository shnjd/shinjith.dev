import { IBM_Plex_Mono, Rubik } from "next/font/google";

export const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
