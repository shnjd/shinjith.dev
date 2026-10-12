"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { tw } from "@/utils/cn";

// Copies the text of the nearest <pre> inside the button's parent.
export default function CopyButton({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    const text = ref.current?.parentElement?.querySelector("pre")?.innerText;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
      className={tw(
        "border-border bg-background/80 text-muted hover:text-fg rounded-md border p-1.5 backdrop-blur-sm transition-colors",
        className,
      )}
    >
      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
    </button>
  );
}
