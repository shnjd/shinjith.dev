import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

export default function Tag({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-full border border-overlay/45 bg-gradient-to-tr from-background/25 to-secondary/25 px-3 py-1 text-xs text-secondary-fg backdrop-blur-lg backdrop-saturate-150 sm:text-sm dark:text-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
