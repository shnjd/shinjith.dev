"use client";
import { createContext, ReactNode, useState } from "react";

export type TSection = "Cover" | "About" | "Experience" | "Projects" | "Services" | "Contact" | null;

interface TSectionContext {
  activeSection: TSection;
  setSection: (section: TSection) => void;
}

export const SectionContext = createContext<TSectionContext>({
  activeSection: null,
  setSection: () => {},
});

type Props = { children?: ReactNode };

export default function SectionContextProvider({ children }: Props) {
  const [activeSection, setSection] = useState<TSection>(null);

  return <SectionContext.Provider value={{ activeSection, setSection }}>{children}</SectionContext.Provider>;
}
