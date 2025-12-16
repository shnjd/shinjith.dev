"use client";

import {
  animate,
  useMotionValue,
  motion,
  useTransform,
  AnimationPlaybackControlsWithThen,
} from "motion/react";
import { useEffect, useState } from "react";

export default function ViewCount({
  slug,
  initialViews,
}: {
  slug: string;
  initialViews: number;
}) {
  const views = useMotionValue(0);
  const rounded = useTransform(() => Math.round(views.get()));

  useEffect(() => {
    let controls: AnimationPlaybackControlsWithThen;

    fetch(`/api/content-views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data: any) => {
        if (data.views) {
          controls = animate(views, data.views, {
            duration: 1,
            ease: [0.25, 1, 0.5, 1],
          });
        }
      })
      .catch((err) => console.error("Failed to update views", err));

    return () => controls?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <span className="flex gap-1 font-mono text-sm text-subtle">
      <motion.span>{rounded}</motion.span>
      <span>views</span>
    </span>
  );
}
