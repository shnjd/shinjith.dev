"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { tw } from "@/utils/cn";

type Heading = { id: string; text: string; level: number };

// "On this page" list built from the rendered article's h2/h3 headings.
export default function WikiToc({
  contentId,
  className,
}: {
  contentId: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        `#${contentId} h2[id], #${contentId} h3[id]`,
      ),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- headings come from the DOM after render
    setHeadings(
      elements.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: Number(el.tagName[1]),
      })),
    );
    setActiveId(undefined);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [contentId, pathname]);

  if (!headings.length) return null;

  return (
    <nav aria-label="On this page" className={tw("text-sm", className)}>
      <p className="text-fg mb-3 font-semibold">On this page</p>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${h.id}`}
              className={tw(
                "block transition-colors",
                activeId === h.id
                  ? "text-link font-medium"
                  : "text-subtle hover:text-fg",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <hr className="border-border my-4" />
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-muted hover:text-fg transition-colors"
      >
        Scroll to top ↑
      </button>
    </nav>
  );
}
