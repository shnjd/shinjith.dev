import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

export default function Tag({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "rounded-full border border-overlay/45 bg-gradient-to-tr from-background/25 to-secondary/25 px-3 py-1 text-xs text-secondary-fg backdrop-blur-lg backdrop-saturate-150 sm:text-sm dark:text-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}
