"use client";
import React from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Devto from "@/components/icons/devto";

type Props = {
  scrollProgress: number;
};

export default function SocialLinks({ scrollProgress }: Props) {
  return (
    <div
      style={{
        opacity: scrollProgress > 0 ? 0.4 - scrollProgress : 1,
        transform: `translateY(${scrollProgress > 0 ? `${scrollProgress * 100}px` : 0})`,
      }}
      className={`fixed bottom-0 right-0 z-50 mr-2 hidden origin-bottom flex-col items-center gap-4 opacity-80 transition-all duration-75 sm:right-[calc(50vw-320px)] sm:flex md:right-[calc(50vw-384px)] md:mr-3 lg:right-[calc(50vw-512px)] lg:mr-5 xl:right-[calc(50vw-640px)] xl:mr-7 2xl:right-[calc(50vw-768px)] 2xl:mr-9`}
    >
      <div className="relative flex flex-col gap-2.5 text-lg transition-all sm:gap-3 sm:text-xl md:text-2xl">
        <a
          aria-label="Github"
          href="https://github.com/shinjith-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub
            size={24}
            className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
          />
        </a>

        <a
          aria-label="Instagram"
          href="https://www.instagram.com/shinjith_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandInstagram
            size={24}
            className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
          />
        </a>

        <a
          aria-label="Dev.to"
          href="https://dev.to/shinjithdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Devto className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
        </a>

        <a
          aria-label="Linkedin"
          href="https://www.linkedin.com/in/shinjithkanhangad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin
            size={24}
            className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
          />
        </a>

        <a
          aria-label="X(Twitter)"
          href="https://twitter.com/ShinjithR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandTwitter
            size={24}
            className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
          />
        </a>
      </div>
      <div className={`h-16 w-0.5 origin-bottom rounded-t-full bg-muted`} />
    </div>
  );
}
