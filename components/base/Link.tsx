import { cn } from "@/lib/utils/cn";
import NextLink, { LinkProps } from 'next/link'
import { HTMLProps } from "react";

type Props = LinkProps & HTMLProps<HTMLAnchorElement> & {
  underline?: true
}
export default function Link({ underline = true, className, children, ...props }: Props) {
  return (
    <NextLink className={cn("relative py-1 flex flex-col items-center group text-foreground w-fit hover:text-subtle", className)}{...props}>
      {children}
      <div className="w-0 h-0.5 bg-muted transition-all group-hover:w-full" />
    </NextLink>
  )
}
