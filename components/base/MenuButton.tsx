import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isClosed: boolean;
}

export default function MenuButton({
  isClosed,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        `group flex h-4 max-h-4 w-5 max-w-5 flex-col items-end justify-between overflow-hidden transition-all`,
        className,
      )}
      {...props}
    >
      <div
        className={`h-0.5 w-full origin-right rounded-full bg-subtle transition-all ${isClosed ? "rotate-0" : "-rotate-45"}`}
      />
      <div
        className={`h-0.5 w-1/2 rounded-full bg-subtle transition-all duration-300 ${isClosed ? "translate-x-0" : "translate-x-full"}`}
      />
      <div
        className={`h-0.5 w-full origin-right rounded-full bg-subtle transition-all ${isClosed ? "rotate-0" : "rotate-45"}`}
      />
    </button>
  );
}
