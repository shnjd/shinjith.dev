"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";

// Loaded on first open, so pages don't ship the terminal up front.
const Terminal = dynamic(() => import("@/components/terminal/Terminal"), {
  ssr: false,
});

type TTerminalContext = { open: () => void };

const TerminalContext = createContext<TTerminalContext>({ open: () => {} });

export const useTerminal = () => useContext(TerminalContext);

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export default function TerminalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  // ` opens the terminal from anywhere, unless typing somewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key !== "`" ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        isEditable(e.target)
      )
        return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <TerminalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && <Terminal key="terminal" onClose={close} />}
      </AnimatePresence>
    </TerminalContext.Provider>
  );
}
