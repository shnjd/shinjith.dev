import { cn } from "@/lib/utils/cn";
import NextLink, { LinkProps } from "next/link";
import { HTMLProps } from "react";

type Props = LinkProps &
  HTMLProps<HTMLAnchorElement> & {
    underline?: boolean;
    secondary?: boolean;
  };
export default function Link({
  underline = true,
  className,
  children,
  secondary,
  ...props
}: Props) {
  return (
    <NextLink
      className={cn(
        `text-foreground group relative w-fit py-1 transition-all ${secondary ? "hover:text-secondary-fg dark:hover:text-secondary" : "hover:text-subtle"}`,
        className,
      )}
      {...props}
    >
      {children}
      {underline && (
        <span
          className={`absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all group-hover:w-full ${secondary ? "bg-secondary-fg dark:bg-secondary" : "bg-muted"}`}
        />
      )}
    </NextLink>
  );
}
