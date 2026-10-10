"use client";
import { ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "@/lib/lenis";

export default function MotionProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ smoothWheel: !reduceMotion }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
