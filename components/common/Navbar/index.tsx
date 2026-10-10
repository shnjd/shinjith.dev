"use client";
import ModeSwitch from "./ModeSwitch";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "@/components/core/Link";
import { transition } from "@/lib/motion";
import { tw } from "@/utils/cn";
import MenuButton from "./MenuButton";
import Prompt from "./Prompt";
import { useTerminal } from "@/contexts/TerminalContext";

const links = [
  {
    label: "Resume",
    href: "https://resume.shnjd.com/?download=true",
    download: "resume.pdf",
  },
  { label: "Notes", href: "/notes" },
  { label: "Projects", href: "/projects" },
  { label: "Wiki", href: "/wiki" },
];

const fade = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: transition.base },
  exit: { opacity: 0, y: -8, transition: transition.fast },
};

const Navbar = () => {
  const [haveBg, setHaveBg] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { open: openTerminal } = useTerminal();
  const isHome = usePathname() === "/";
  // Pinned on inner pages; on home it shows once the page is scrolled.
  const showBrand = !isHome || haveBg || menu;

  useEffect(() => {
    const checkPosition = () => {
      if (window.scrollY > 100) setHaveBg(true);
      else setHaveBg(false);
    };
    window.addEventListener("scroll", checkPosition, { passive: true });

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  useEffect(() => {
    const hideMenu = (e: MouseEvent) => {
      if (!(
        navRef.current &&
        e.target &&
        navRef.current.contains(e.target as Node)
      )) {
        setMenu(false);
      }
    };

    if (menu) {
      window.addEventListener("click", hideMenu);
    } else {
      window.removeEventListener("click", hideMenu);
    }

    return () => window.removeEventListener("click", hideMenu);
  }, [menu]);

  return (
    <header className="fixed top-0 left-0 z-999 mt-0 w-screen text-sm">
      <div
        aria-hidden
        className={tw(
          "pointer-events-none absolute inset-0 backdrop-blur-lg backdrop-saturate-150 transition-opacity duration-300",
          haveBg && !menu ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={navRef}
        className={tw(
          "relative z-999 container w-full rounded-b-2xl p-5 transition-[background-color,backdrop-filter] duration-300",
          menu
            ? "navbar-gradient bg-surface/50 backdrop-blur-lg backdrop-saturate-150"
            : "bg-transparent",
        )}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="min-w-0">
            <AnimatePresence>
              {showBrand && (
                <motion.div key="brand" {...fade}>
                  <Prompt onOpen={openTerminal} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ul className="hidden items-center gap-4 lg:flex">
            {links.map(({ label, ...props }) => (
              <li key={label}>
                <Link {...props}>{label}</Link>
              </li>
            ))}
            <li>
              <ModeSwitch />
            </li>
          </ul>

          <MenuButton
            isClosed={!menu}
            onClick={() => setMenu((prev) => !prev)}
            className="shrink-0 lg:hidden"
          />
        </div>

        <AnimatePresence initial={false}>
          {menu && (
            <motion.div
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition.base}
              className="w-full overflow-hidden lg:hidden"
            >
              <div className="flex w-full items-end gap-2 pt-6">
                <ul className="flex w-full flex-col gap-3">
                  {links.map(({ label, ...props }) => (
                    <li key={label}>
                      <Link
                        {...props}
                        underline={false}
                        onClick={() => setMenu(false)}
                        className="hover:bg-accent/75 hover:text-accent-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ModeSwitch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
