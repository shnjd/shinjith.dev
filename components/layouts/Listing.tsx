import { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { tw } from "@/utils/cn";

// Page shell for content listings (notes, wiki). Section headings are h2
// under the page h1, sized small since a listing has only a few of them.
export default function Listing({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={tw(
        "prose-a:text-subtle, prose prose-headings:font-sans prose-headings:text-fg prose-h1:text-3xl prose-h1:font-semibold prose-h2:mt-[1.6em] prose-h2:mb-[0.6em] prose-h2:text-[1.25em] prose-h2:leading-[1.6] prose-h2:font-medium prose-h3:font-medium prose-h4:font-semibold prose-p:text-subtle prose-a:font-normal prose-a:text-subtle prose-a:no-underline prose-blockquote:text-subtle prose-strong:text-fg prose-code:font-mono prose-code:text-fg prose-code:before:hidden prose-code:after:hidden prose-pre:bg-surface/70 prose-pre:text-fg prose-hr:border-border prose-lead:text-fg mx-auto min-h-[calc(100dvh-52px)] max-w-7xl pt-32 pb-20",
        className,
      )}
    />
  );
}

/** A listing row: title, a dotted leader, then trailing meta (e.g. a date). */
export function ListingItem({
  href,
  title,
  meta,
}: {
  href: string;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="flex w-full items-center gap-1.5">
        {title}
        <span className="border-border flex-1 border-t" />
        {meta && <span className="text-muted text-sm">{meta}</span>}
      </Link>
    </li>
  );
}
