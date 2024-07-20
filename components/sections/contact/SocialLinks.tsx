"use client";
import React from "react";
import { motion, MotionValue } from "framer-motion";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import Devto from "@/components/icons/devto";
import { getEllipseY } from "@/lib/utils/math";

type Props = {
  scrollProgress: number;
};

const TOTAL_SOCIAL = 5;

export default function SocialLinks({ scrollProgress }: Props) {
  const getXRadius = () => {
    const screen = document.documentElement.clientWidth;
    if (screen >= 1536) return 748;
    if (screen >= 1280) return 620;
    if (screen >= 1024) return 492;
    if (screen >= 768) return 364;
    if (screen >= 640) return 300;
    return 0;
  };

  const getTransform = (order: number) => {
    if (scrollProgress === 0) return "";

    const screen = document.documentElement.clientWidth;

    const xr = getXRadius();
    const yr = screen <= 768 ? 550 : 600;
    const xo = 0;
    const yo = 0;
    const gapY = 40;
    const gapX = 54;
    const xOffset = 173;
    const yOffset = 100;
    const scaleFactor = 1.2;

    if (scrollProgress === 1) return `translate(${gapX * order - xOffset}px, ${yr - yOffset}px) scale(${scaleFactor})`;

    const x = xr - xr * scrollProgress + (order - TOTAL_SOCIAL / 2 - 1) * scrollProgress * gapX;
    const y = getEllipseY(x, xo, yo, xr, yr) - (TOTAL_SOCIAL - order) * (1 - scrollProgress) * gapY - yOffset;
    const scale = 1 + (scaleFactor - 1) * scrollProgress;

    return `translate(${x}px, ${y}px) scale(${scale})`;
  };

  return (
    <div
      className={` ${scrollProgress != 0 ? "absolute -top-[80px] left-0 opacity-90" : "fixed bottom-0 mr-2 opacity-80 sm:right-[calc(50vw-320px)] md:right-[calc(50vw-384px)] lg:right-[calc(50vw-512px)] xl:right-[calc(50vw-640px)] 2xl:right-[calc(50vw-768px)]"} right-0 z-50 hidden flex-col items-center gap-4 sm:flex`}
    >
      <div className="relative flex flex-col gap-2.5 text-lg transition-all sm:gap-3 sm:text-xl md:text-2xl">
        <a
          className={`${scrollProgress != 0 && "absolute bottom-0"}`}
          style={{ transform: getTransform(1) }}
          href="https://github.com/shinjith-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub size={24} className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>

        <a
          className={`${scrollProgress != 0 && "absolute bottom-0"}`}
          style={{ transform: getTransform(2) }}
          href="https://www.instagram.com/shinjith_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandInstagram size={24} className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>

        <a
          className={`${scrollProgress != 0 && "absolute bottom-0"}`}
          style={{ transform: getTransform(3) }}
          href="https://dev.to/shinjithdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Devto className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>

        <a
          className={`${scrollProgress != 0 && "absolute bottom-0"}`}
          style={{ transform: getTransform(4) }}
          href="https://www.linkedin.com/in/shinjithkanhangad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin size={24} className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>

        <a
          className={`${scrollProgress != 0 && "absolute bottom-0"}`}
          style={{ transform: getTransform(5) }}
          href="https://twitter.com/ShinjithR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandTwitter size={24} className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>
      </div>
      <div
        style={{ transform: `translateX(${scrollProgress != 0 ? getXRadius() : 0}px) scaleY(min(1,${1 - scrollProgress}))` }}
        className={`h-16 w-0.5 origin-bottom rounded-t-full bg-muted ${scrollProgress != 0 && "social-line"}`}
      />
    </div>
  );
}
