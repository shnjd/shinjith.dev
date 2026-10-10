"use client";
import { motion, MotionValue, useTransform } from "motion/react";
import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { about } from "@/lib/data";

type Props = {
  scrollProgress: MotionValue<number>;
};

export default function SocialLinks({ scrollProgress }: Props) {
  // Fade and drop the rail away as the contact section takes over
  const opacity = useTransform(scrollProgress, [0, 0.4], [0.8, 0]);
  const y = useTransform(scrollProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`fixed right-0 bottom-0 z-50 mr-2 hidden origin-bottom flex-col items-center gap-4 sm:right-[calc(50vw-320px)] sm:flex md:right-[calc(50vw-384px)] md:mr-3 lg:right-[calc(50vw-512px)] lg:mr-5 xl:right-[calc(50vw-640px)] xl:mr-7 2xl:right-[calc(50vw-768px)] 2xl:mr-9`}
    >
      <div className="relative flex flex-col gap-2.5 text-lg sm:gap-3 sm:text-xl md:text-2xl">
        <a
          aria-label="Bluesky"
          href={about.handles.bluesky}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandBluesky className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors" />
        </a>

        <a
          rel="me noopener noreferrer"
          aria-label="Instagram"
          href={about.handles.instagram}
          target="_blank"
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
          aria-label="X(Twitter)"
          href={about.handles.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandTwitter
            size={24}
            className="text-subtle hover:text-secondary-fg dark:hover:text-secondary transition-colors"
          />
        </a>
      </div>
      <div className={`bg-muted h-16 w-0.5 origin-bottom rounded-t-full`} />
    </motion.div>
  );
}
