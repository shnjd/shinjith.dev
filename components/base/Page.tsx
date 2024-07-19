"use client";
import { ReactNode, useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Scrollbar.init(pageRef.current!, { damping: 0.6 });

    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return (
    <main ref={pageRef} className="container relative z-10 mx-auto">
      {children}
    </main>
  );
}
