"use client";

<<<<<<< HEAD
import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
=======
import React, { HTMLAttributes, ReactNode, useContext, useEffect, useRef } from "react";
>>>>>>> dev
import { SectionContext, TSection } from "../contexts/SectionContext";
import { cn } from "@/lib/utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  name: TSection;
}

export default function Section({
  name,
  className,
  children,
  ...props
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setSection } = useContext(SectionContext);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        if (window.scrollY > window.scrollY + top - 400 && window.scrollY < window.scrollY + bottom - 400) setSection(name);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef.current]);

  return (
    <section
      id={name?.toLowerCase()}
      ref={sectionRef}
      className={cn("min-h-screen w-full", className)}
      {...props}
    >
      {children}
    </section>
  );
}
