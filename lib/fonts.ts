import { Inconsolata, Oleo_Script, Rubik } from "next/font/google";

export const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const inconsolata = Inconsolata({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const oleoScript = Oleo_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
