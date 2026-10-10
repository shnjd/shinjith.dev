"use client";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import { join, split, toHref, toVirtual } from "@/lib/terminal/path";
import { tw } from "@/utils/cn";

const PLACES = ["notes", "wiki", "projects"];

// Commands worth trying from here; `cd` targets use ~ off the root so they
// stay valid wherever the prompt is.
function suggestions(path: string) {
  const [place] = split(path);
  return [
    ...PLACES.filter((p) => p !== place).map((p) =>
      place ? `cd ~/${p}` : `cd ${p}`,
    ),
    "ls",
  ];
}

type Props = {
  onOpen?: () => void;
  className?: string;
};

/** The brand as a shell prompt: `shnjd/<page path>❯ <command>`. */
export default function Prompt({ onOpen, className }: Props) {
  const path = toVirtual(usePathname());
  const segments = split(path);
  const typed = useTypewriter(suggestions(path));

  return (
    <nav
      aria-label="Breadcrumb"
      className={tw(
        "flex flex-wrap items-baseline font-mono text-xs leading-snug sm:text-sm md:text-base",
        className,
      )}
    >
      <NextLink
        href="/"
        className="text-secondary-fg dark:text-secondary font-semibold"
      >
        shnjd
      </NextLink>
      {segments.map((segment, i) => (
        <Fragment key={i}>
          <span className="text-muted">/</span>
          <NextLink
            href={toHref(join(segments.slice(0, i + 1)))}
            aria-current={i === segments.length - 1 ? "page" : undefined}
            className="text-subtle hover:text-fg break-all transition-colors"
          >
            {segment}
          </NextLink>
        </Fragment>
      ))}
      <button
        type="button"
        onClick={onOpen}
        title="Open terminal"
        aria-label="Open terminal"
        className="flex cursor-text items-baseline pr-3 text-left"
      >
        <span className="text-secondary-fg dark:text-secondary mr-2 ml-1">
          ❯
        </span>
        <span className="text-muted/70 whitespace-pre">{typed}</span>
        <span className="blink text-muted/70">_</span>
      </button>
    </nav>
  );
}
