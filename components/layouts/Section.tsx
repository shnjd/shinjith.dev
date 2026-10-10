"use client";
import React, { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
import { tw } from "@/utils/cn";
import { reveal } from "@/lib/motion";
import { rubik } from "@/lib/fonts";

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  name: string;
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
  return (
    <section
      id={name.toLowerCase()}
      className={tw(
        "min-h-dvh w-full",
        limitOnXl && "mx-auto max-w-(--breakpoint-xl)",
        condensed ? "py-0" : "py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24",
        className,
      )}
      {...props}
    >
      {!withoutTitle && (
        <motion.h2
          {...reveal()}
          className={`${rubik.className} ${subHeading ? "sm:mb-0.5 md:mb-1" : "sm:mb-1 md:mb-2 lg:mb-3 xl:mb-4"} text-lg font-bold tracking-widest uppercase sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
        >
          {name}
        </motion.h2>
      )}
      {subHeading && (
        <motion.p
          {...reveal({ delay: 0.06 })}
          className="text-subtle w-full max-w-80 text-sm sm:mb-1 sm:text-base md:mb-2 lg:mb-3 xl:mb-4"
        >
          {subHeading}
        </motion.p>
      )}
      {children}
    </section>
  );
};

export default Section;
