"use client";
import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/utils/cn";
import { rubik } from "@/lib/fonts";
import { SectionContext, TSection } from "@/contexts/SectionContext";

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  name: TSection;
  withoutTitle?: boolean;
  limitOnXl?: boolean;
  condensed?: boolean;
  subHeading?: string;
};

const Section: React.FC<Props> = ({
  name,
  withoutTitle = false,
  condensed = false,
  limitOnXl = true,
  subHeading,
  className,
  children,
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setSection } = useContext(SectionContext);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const { top, bottom } = sectionRef.current.getBoundingClientRect();
        if (
          window.scrollY > window.scrollY + top - 400 &&
          window.scrollY < window.scrollY + bottom - 400
        )
          setSection(name);
        // else setSection(null)
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [name, setSection]);

  return (
    <section
      id={name?.toLowerCase()}
      ref={sectionRef}
      className={cn(
        "min-h-dvh w-full",
        limitOnXl && "mx-auto max-w-screen-xl",
        condensed ? "py-0" : "py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24",
        className,
      )}
      {...props}
    >
      {!withoutTitle && (
        <h2
          className={`${rubik.className} ${subHeading ? "sm:mb-0.5 md:mb-1" : "sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4"} text-lg font-bold uppercase tracking-widest sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
        >
          {name}
        </h2>
      )}
      {subHeading && (
        <p className="w-full max-w-80 text-sm text-subtle sm:mb-1 sm:text-base md:mb-2 lg:mb-3 xl:mb-4">
          {subHeading}
        </p>
      )}
      {children}
    </section>
  );
};

export default Section;
