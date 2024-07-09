import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isClosed: boolean
}

export default function MenuButton({ isClosed, children, className, ...props }: Props) {
  return (
    <button className={cn(`group max-h-4 max-w-5 h-4 w-5 items-end overflow-hidden transition-all flex justify-between flex-col`, className)} {...props}>
      <div className={`transition-all w-full h-0.5 origin-right bg-subtle rounded-full ${isClosed ? "rotate-0 group-hover:-rotate-[5deg]" : "-rotate-45 group-hover:-rotate-[40deg]"}`} />
      <div className={`h-0.5 transition-all bg-subtle rounded-full w-1/2 ${isClosed ? "translate-x-0" : "translate-x-full"}`} />
      <div className={`transition-all w-full h-0.5 origin-right bg-subtle rounded-full ${isClosed ? "rotate-0 group-hover:rotate-[5deg]" : "rotate-45 group-hover:rotate-[40deg]"}`} />
    </button >
  );
}
