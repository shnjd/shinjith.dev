"use client";
import SocialLinks from "./SocialLinks";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMailShare,
  IconBrandBluesky,
  IconBrandInstagram,
} from "@tabler/icons-react";
import NextLink from "next/link";
import Section from "@/components/layouts/Section";
import { about } from "@/lib/data";

export default function Contact() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: targetRef,
    offset: ["start end", "start 0.45"],
  });
  const lift = useTransform(progress, [0, 1], [0, -20]);
  const socialScale = useTransform(progress, [0.7, 1], [1, 1.3]);

  return (
    <Section
      name="Contact"
      limitOnXl={false}
      withoutTitle
      condensed
      className="contact-bg relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
    >
      <motion.div
        className="contact-lines contact-line-1 h-0.5 w-full origin-right rounded-full"
        style={{ scaleX: progress }}
      />
      <motion.div
        ref={targetRef}
        style={{ y: lift }}
        className="flex h-full max-h-[60svh] min-h-[300px] w-full flex-col items-center justify-center gap-6 sm:min-h-[400px] sm:gap-6 md:min-h-[500px] md:gap-8 lg:min-h-[600px]"
      >
        <h3 className="text-subtle max-w-[250px] text-center text-2xl font-bold sm:max-w-xs sm:text-3xl md:max-w-sm md:text-4xl lg:max-w-md lg:text-5xl">
          Tell me about your next project
        </h3>

        <NextLink
          href="mailto:me@shnjd.com"
          className="group bg-primary text-primary-fg hover:bg-primary/90 flex items-center gap-1.5 rounded-2xl px-5 py-2.5 font-medium shadow-xl transition-[background-color,box-shadow,scale] hover:shadow-md active:scale-[0.97] sm:text-lg"
        >
          Get in touch
          <IconMailShare
            size={20}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </NextLink>

        <motion.div
          className="relative flex justify-center gap-4 sm:gap-6"
          style={{ scale: socialScale }}
        >
          <a
            aria-label="Bluesky"
            href={about.handles.bluesky}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandBluesky className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors" />
          </a>

          <a
            href={about.handles.instagram}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Instagram"
          >
            <IconBrandInstagram
              size={24}
              className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors"
            />
          </a>

          <a
            aria-label="Github"
            href={about.handles.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub
              size={24}
              className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors"
            />
          </a>

          <a
            aria-label="Linkedin"
            href={about.handles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin
              size={24}
              className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors"
            />
          </a>

          <a
            aria-label="X (Twitter)"
            href={about.handles.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandTwitter
              size={24}
              className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors"
            />
          </a>
        </motion.div>
      </motion.div>
      <div className="contact-lines contact-line-2 h-0.5 w-full origin-left rounded-full" />

      <SocialLinks scrollProgress={progress} />
    </Section>
  );
}
