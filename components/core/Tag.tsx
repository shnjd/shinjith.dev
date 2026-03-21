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
        "border-overlay/45 from-background/25 to-secondary/25 text-secondary-fg dark:text-subtle rounded-full border bg-linear-to-tr px-3 py-1 text-xs backdrop-blur-lg backdrop-saturate-150 sm:text-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}
