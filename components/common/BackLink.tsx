"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { reveal } from "@/lib/motion";
import { tw } from "@/utils/cn";

export default function BackLink({ className }: { className?: string }) {
  return (
    <motion.div {...reveal()} className={tw("w-full", className)}>
      <Link
        href="/"
        className="text-secondary flex items-baseline font-mono text-sm leading-none font-semibold transition-colors sm:text-base md:text-xl"
      >
        <span className="mr-1 text-xs sm:text-sm md:text-base">❯</span>
        shnjd
        <span className="blink text-sm sm:text-base md:text-lg">_</span>
      </Link>
    </motion.div>
  );
}
