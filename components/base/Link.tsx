import { cn } from "@/lib/utils/cn";
import NextLink, { LinkProps } from "next/link";
import { HTMLProps } from "react";

type Props = LinkProps &
  HTMLProps<HTMLAnchorElement> & {
    underline?: true;
  };
export default function Link({
  underline = true,
  className,
  children,
  ...props
}: Props) {
  return (
    <NextLink
      className={cn(
        "text-foreground group relative flex w-fit flex-col items-center py-1 hover:text-subtle",
        className,
      )}
      {...props}
    >
      {children}
      <div className="h-0.5 w-0 bg-muted transition-all group-hover:w-full" />
    </NextLink>
  );
}
