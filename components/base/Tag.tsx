import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Tag({ children }: Props) {
  return (
    <div className="rounded-full border border-overlay/45 bg-gradient-to-tr from-background/25 to-secondary/25 px-3 py-1 text-sm text-secondary-fg backdrop-blur-lg backdrop-saturate-150 dark:text-subtle">
      {children}
    </div>
  );
}
