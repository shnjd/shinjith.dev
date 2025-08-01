"use client";
import { IconMailShare } from "@tabler/icons-react";
import Section from "@/components/base/Section";
import SocialLinks from "./SocialLinks";
import { useEffect, useRef, useState } from "react";
import {
  IconBrandGithub,
  IconBrandMastodon,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Devto from "@/components/icons/devto";
import NextLink from "next/link";

export default function Contact() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (targetRef.current) {
        const { top, bottom } = targetRef.current.getBoundingClientRect();
        const t = top - 400;
        const h = bottom - top - 200;
        const p = (h - t) / h;
        if (t > h && progress != 0) {
          setProgress(0);
        } else if (p < 0) setProgress(0);
        else if (p > 1) setProgress(1);
        else setProgress(p);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Section
      name="Contact"
      limitOnXl={false}
      withoutTitle
      condensed
      className="contact-bg relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
    >
      <div
        className={`contact-lines h-0.5 w-full origin-right rounded-full ${progress === 1 && "contact-line-1"}`}
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        ref={targetRef}
        style={{ transform: `translateY(-${progress * 20}px)` }}
        className="flex h-full max-h-[60svh] min-h-[300px] w-full flex-col items-center justify-center gap-6 transition-all sm:min-h-[400px] sm:gap-6 md:min-h-[500px] md:gap-8 lg:min-h-[600px]"
      >
        <h3 className="max-w-[250px] text-center text-2xl font-bold text-subtle sm:max-w-xs sm:text-3xl md:max-w-sm md:text-4xl lg:max-w-md lg:text-5xl">
          Tell me about your next project
        </h3>

        <NextLink
          href="mailto:shinjithkanhangad@gmail.com"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-fg shadow-xl transition-all hover:bg-primary/90 hover:shadow-md sm:text-lg"
        >
          Get in touch
          <IconMailShare size={20} />
        </NextLink>

        <div
          className="relative flex justify-center gap-4 transition-all duration-75 sm:gap-6"
          style={{
            transform: `scale(${progress + 0.3 < 1 ? 1 : progress + 0.3})`,
          }}
        >
          <a
            href="https://github.com/shinjith-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub
              size={24}
              className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
            />
          </a>

          <a href="https://mastodon.social/@shnjd" target="_blank" rel="me">
            <IconBrandMastodon
              size={24}
              className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary"
            />
          </a>

          <a
            href="https://dev.to/shinjithdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Devto className="text-subtle transition-all hover:text-secondary-fg dark:hover:text-secondary" />
          </a>

          <a
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
      </div>
      <div
        className={`contact-lines h-0.5 w-full origin-left rounded-full ${progress === 1 && "contact-line-2"}`}
      />

      <SocialLinks scrollProgress={progress} />
    </Section>
  );
}
