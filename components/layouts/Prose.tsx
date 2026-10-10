import { HTMLAttributes } from "react";
import { tw } from "@/utils/cn";

// Typography for rendered MDX (notes, wiki).
export default function Prose({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={tw(
        "prose prose-headings:font-sans prose-headings:text-fg prose-h1:text-3xl prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-medium prose-h4:font-semibold prose-p:text-subtle prose-a:text-link prose-a:hover:text-fg prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-subtle prose-figure:my-3 prose-strong:text-fg prose-code:font-mono prose-code:text-fg prose-code:before:hidden prose-code:after:hidden prose-pre:rounded prose-pre:rounded-tl-none prose-pre:bg-surface/70 prose-pre:text-fg prose-hr:border-border prose-lead:text-fg",
        className,
      )}
    />
  );
}
