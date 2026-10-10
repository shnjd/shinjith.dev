import type { Transition } from "motion/react";

// Shared motion tokens. Keep in sync with the `--ease-*` and
// `--default-transition-*` values in styles/globals.css.

export const duration = {
  fast: 0.2,
  base: 0.3,
  slow: 0.6,
} as const;

export const ease = {
  // Soft deceleration, used for entrances and most UI transitions
  out: [0.22, 1, 0.36, 1],
  // Symmetric, used for elements that move both ways (e.g. menus)
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const transition: Record<"fast" | "base" | "slow", Transition> = {
  fast: { duration: duration.fast, ease: ease.out },
  base: { duration: duration.base, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.out },
};

// Delay for the nth item of a list, capped so long lists don't lag behind
export const stagger = (index: number, step = 0.06, max = 4) =>
  Math.min(index, max) * step;

export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" };

type RevealOptions = { delay?: number; y?: number };

// Subtle fade-and-rise on first scroll into view
export const reveal = ({ delay = 0, y = 12 }: RevealOptions = {}) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { ...transition.slow, delay },
});
