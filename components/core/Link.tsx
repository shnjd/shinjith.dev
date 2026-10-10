import { tw } from "@/utils/cn";
import NextLink, { LinkProps } from "next/link";
import { HTMLProps } from "react";

type Props = LinkProps &
  HTMLProps<HTMLAnchorElement> & {
    underline?: boolean;
    alwaysUnderline?: boolean;
    secondary?: boolean;
  };
export default function Link({
  underline = true,
  alwaysUnderline = false,
  className,
  children,
  secondary,
  ...props
}: Props) {
  return (
    <NextLink
      className={tw(
        "text-foreground group relative w-fit py-1 transition-colors",
        secondary
          ? "hover:text-secondary-fg dark:hover:text-secondary"
          : "hover:text-subtle",
        className,
      )}
      {...props}
    >
      {children}
      {(underline || alwaysUnderline) && (
        <span
          className={tw(
            "absolute bottom-0 left-1/2 hidden h-0.5 w-0 -translate-x-1/2 rounded-full transition-[width] duration-300 group-hover:w-full sm:block",
            secondary ? "bg-secondary-fg dark:bg-secondary" : "bg-muted",
            alwaysUnderline && "w-full",
          )}
        />
      )}
    </NextLink>
  );
}
