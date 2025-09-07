import { cn } from "@/utils/cn";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isClosed: boolean;
};

const MenuButton: React.FC<Props> = ({
  isClosed,
  children,
  className,
  ...props
}) => {
  return (
    <button
      aria-label="Menu"
      className={cn(
        `group flex h-6 max-h-6 w-5 max-w-5 flex-col items-end gap-[5px] overflow-hidden transition-all`,
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
};

export default MenuButton;
