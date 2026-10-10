"use client";
import { rubik } from "@/lib/fonts";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import Section from "@/components/layouts/Section";
import { displayName } from "@/lib/constants";
import { about } from "@/lib/data";
import { duration, ease } from "@/lib/motion";

// Intro plays once on load: greeting, then the name letter by letter,
// then the portrait and copy rising in sequence.
const container: Variants = {
  hidden: {},
  visible: (delayChildren: number = 0) => ({
    transition: { delayChildren, staggerChildren: 0.08 },
  }),
};

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.04 } },
};

const rise = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
});

const letter = rise(40);
const portrait = rise(24);
const item = rise(16);

export default function Cover() {
  return (
    <Section
      name={"Cover"}
      className="relative flex items-center justify-center"
      limitOnXl={false}
      withoutTitle
    >
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 pt-5">
        <motion.p
          variants={item}
          initial="hidden"
          animate="visible"
          className="text-subtle mb-5 text-sm font-medium xl:pl-3 xl:text-2xl"
        >
          Hey, I am
        </motion.p>

        <motion.h1
          variants={nameContainer}
          initial="hidden"
          animate="visible"
          className={`${rubik.className} text-primary/50 flex w-full justify-between text-center text-9xl text-[min(16rem,max(15vw,3rem))] font-bold tracking-wide uppercase`}
        >
          {displayName.map((l, index) => (
            <motion.span key={`shinjith-${l}-${index}`} variants={letter}>
              {l}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        variants={container}
        custom={0.45}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 flex flex-col items-center p-3 text-center md:bottom-12 xl:bottom-16"
      >
        <motion.div
          variants={portrait}
          className="relative mb-3 h-32 w-32 xl:h-40 xl:w-40"
        >
          <Image
            src="/assets/images/shinjith.jpg"
            height={160}
            width={160}
            className="rounded-full object-cover object-top"
            alt="shinjith's portrait"
            priority
          />
        </motion.div>

        <motion.h2
          variants={item}
          className="text-fg text-xl font-semibold sm:text-2xl md:text-3xl"
        >
          {about.title}
        </motion.h2>
        <motion.h3
          variants={item}
          className="text-subtle mb-1.5 text-sm font-medium sm:text-base md:text-lg"
        >
          {about.caption}
        </motion.h3>
        <motion.p
          variants={item}
          className="text-muted max-w-lg text-sm font-normal sm:text-base"
        >
          {about.description}
        </motion.p>
      </motion.div>
    </Section>
  );
}
