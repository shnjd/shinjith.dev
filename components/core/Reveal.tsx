"use client";
import { HTMLMotionProps, motion } from "motion/react";
import { reveal } from "@/lib/motion";

type Props = {
  delay?: number;
  y?: number;
};

export function Reveal({ delay, y, ...props }: Props & HTMLMotionProps<"div">) {
  return <motion.div {...reveal({ delay, y })} {...props} />;
}

export function RevealItem({
  delay,
  y,
  ...props
}: Props & HTMLMotionProps<"li">) {
  return <motion.li {...reveal({ delay, y })} {...props} />;
}
