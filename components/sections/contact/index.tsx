"use client";
import { IconMailShare } from "@tabler/icons-react";
import Section from "@/components/base/Section";
import SocialLinks from "./SocialLinks";
import { useEffect, useRef, useState } from "react";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import Devto from "@/components/icons/devto";

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
    <Section name="Contact" withoutTitle condensed className="contact-bg relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      <div
        className={`contact-lines h-0.5 w-full origin-right rounded-full ${progress === 1 && "contact-line-1"}`}
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        ref={targetRef}
        style={{ transform: `translateY(-${progress * 40}px)` }}
        className="flex h-full max-h-[60vh] min-h-[400px] w-full flex-col items-center justify-center gap-4 transition-all sm:min-h-[500px] sm:gap-6 md:min-h-[600px] md:gap-8"
      >
        <h3 className="max-w-[500px] text-center text-3xl font-bold text-subtle sm:text-4xl md:text-5xl">Tell me about your next project</h3>

        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-fg shadow-xl transition-all hover:bg-primary/90 hover:shadow-md sm:text-lg">
          Get in touch
          <IconMailShare size={20} />
        </button>

        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-4 sm:hidden">
          <a href="https://github.com/shinjith-dev" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={24} className="text-subtle transition-all hover:text-muted" />
          </a>

          <a href="https://www.instagram.com/shinjith_" target="_blank" rel="noopener noreferrer">
            <IconBrandInstagram size={24} className="text-subtle transition-all hover:text-muted" />
          </a>

          <a href="https://dev.to/shinjithdev" target="_blank" rel="noopener noreferrer">
            <Devto />
          </a>

          <a href="https://www.linkedin.com/in/shinjithkanhangad" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin size={24} className="text-subtle transition-all hover:text-muted" />
          </a>

          <a href="https://twitter.com/ShinjithR" target="_blank" rel="noopener noreferrer">
            <IconBrandTwitter size={24} className="text-subtle transition-all hover:text-muted" />
          </a>
        </div>
      </div>
      <div className={`contact-lines h-0.5 w-full origin-left rounded-full ${progress === 1 && "contact-line-2"}`} />

      <SocialLinks scrollProgress={progress} />
    </Section>
  );
}
