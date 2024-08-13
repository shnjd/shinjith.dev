"use client";
import Link from "@/components/base/Link";
import NextLink from "next/link";
import ModeSwitch from "./ModeSwitch";
import { useContext, useEffect, useRef, useState } from "react";
import { inconsolata, rubik } from "@/lib/fonts";
import MenuButton from "@/components/base/MenuButton";
import { toKebabCase } from "@/lib/utils/string";
import { AnimatePresence, motion } from "framer-motion";
import { SectionContext } from "@/components/contexts/SectionContext";

const navs = ["About", "Experience", "Projects", "Services", "Contact"];

const opacityFactor = 0.5 / navs.length;

type ItemProps = {
  nav: string;
  active: boolean;
  activeIndex: number;
  index: number;
};

function NavigationMenuItem({ nav, active, activeIndex, index }: ItemProps) {
  const path = toKebabCase(nav);
  const opacity =
    activeIndex === index ? 1 : 1 - (index + 1 - activeIndex) * opacityFactor;

  return (
    <motion.li
      initial={{ y: -10, x: 40, opacity: 0 }}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "tween" }}
      className="group"
      style={{ opacity }}
    >
      <Link
        href={`#${path}`}
        onClick={(e) => {
          const hero = document.getElementById(path);
          e.preventDefault(); // Stop Page Reloading
          if (hero) {
            hero.scrollIntoView({ behavior: "smooth", block: "start" });
            // window.scrollBy({ top: 100, left: 0, behavior: 'smooth' })
          }
        }}
        alwaysUnderline={active}
        className="flex items-center gap-2"
      >
        <div className="text-sm text-fg transition-all duration-300 group-hover:text-fg/90">
          {nav}
        </div>
      </Link>
    </motion.li>
  );
}

const Navbar = () => {
  const [haveBg, setHaveBg] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { activeSection: active } = useContext(SectionContext);

  useEffect(() => {
    if (window.scrollY > 100) setHaveBg(true);

    const checkPosition = () => {
      if (window.scrollY > 100) setHaveBg(true);
      else setHaveBg(false);
    };
    window.addEventListener("scroll", checkPosition);

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  useEffect(() => {
    const hideMenu = (e: MouseEvent) => {
      if (
        !(
          navRef.current &&
          e.target &&
          navRef.current.contains(e.target as Node)
        )
      ) {
        setMenu(false);
      }
    };

    if (menu) {
      window.addEventListener("click", hideMenu);
    } else {
      window.removeEventListener("click", hideMenu);
    }

    () => window.removeEventListener("click", hideMenu);
  }, [menu]);

  return (
    <header
      className={`fixed left-0 top-0 z-[999] mt-0 w-screen text-sm transition-all duration-300 ${haveBg && !menu ? "nav-slide-in backdrop-blur-lg backdrop-saturate-150" : "translate-y-0"} ${menu && "p-3"}`}
    >
      <div
        ref={navRef}
        className={`container relative z-[999] w-full p-5 transition-all ${menu ? "border-boder/40 navbar-gradient rounded-lg border backdrop-blur-lg backdrop-saturate-150" : "border-0 border-transparent bg-[transparent]"}`}
      >
        <div
          className={`flex w-full items-center ${haveBg ? "justify-between" : "justify-end"}`}
        >
          {haveBg && (
            <>
              <NextLink
                href="/"
                className={`text-lg text-secondary-fg sm:text-xl md:text-2xl dark:text-secondary ${rubik.className}`}
              >
                /shinjith-dev<span className="blink">_</span>
              </NextLink>

              <ul className="hidden gap-6 transition-all lg:flex">
                <AnimatePresence>
                  {navs.map((nav, index) => (
                    <NavigationMenuItem
                      key={nav}
                      nav={nav}
                      active={active === nav}
                      activeIndex={navs.indexOf(active ?? "")}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}

          <ul className="hidden items-center gap-4 sm:flex">
            <li>
              <Link download="resume.pdf" href="https://resume.shinjith.dev">
                Resume
              </Link>
            </li>
            <li>
              <Link href={"https://notes.shinjith.dev"}>Notes</Link>
            </li>

            <li>
              <ModeSwitch />
            </li>
          </ul>

          <MenuButton
            isClosed={!menu}
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden"
          />
        </div>

        <div
          className={`flex h-fit w-full items-end justify-between gap-4 pt-4 transition-all sm:hidden ${menu ? "translate-y-0" : "hidden -translate-y-[200%]"}`}
        >
          <ul className="flex w-full flex-col gap-3">
            <li>
              <Link
                download="resume.pdf"
                href="https://resume.shinjith.dev"
                className="w-full items-start rounded px-3 py-1.5 hover:bg-accent hover:text-accent-fg"
                underline={false}
              >
                Resume
              </Link>
            </li>
            <li>
              <Link
                href={"https://notes.shinjith.dev"}
                className="w-full items-start rounded px-3 py-1.5 hover:bg-accent hover:text-accent-fg"
                underline={false}
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                href={"/projects"}
                className="w-full items-start rounded px-3 py-1.5 hover:bg-accent hover:text-accent-fg"
                underline={false}
              >
                Projects
              </Link>
            </li>
          </ul>

          <ModeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
