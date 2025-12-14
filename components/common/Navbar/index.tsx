"use client";
import NextLink from "next/link";
import ModeSwitch from "./ModeSwitch";
import { useContext, useEffect, useRef, useState } from "react";
import { toKebabCase } from "@/utils/string";
import { AnimatePresence, motion } from "motion/react";
import { SectionContext } from "@/contexts/SectionContext";
import { usePathname } from "next/navigation";
import Link from "@/components/core/Link";
import MenuButton from "./MenuButton";

const navs = ["About", "Experience", "Projects", "Services", "Contact"];

const opacityFactor = 0.5 / navs.length;

type ItemProps = {
  nav: string;
  active: boolean;
  activeIndex: number;
  index: number;
  close: () => void;
};

function NavigationMenuItem({
  nav,
  active,
  activeIndex,
  index,
  close,
}: ItemProps) {
  const path = toKebabCase(nav);
  const opacity =
    activeIndex === index ? 1 : 1 - (index + 1 - activeIndex) * opacityFactor;

  return (
    <motion.li
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ delay: index * 0.05, type: "tween" }}
      className="group"
      style={{ opacity }}
    >
      <Link
        href={`#${path}`}
        onClick={(e) => {
          const hero = document.getElementById(path);
          e.preventDefault();
          if (hero) {
            hero.scrollIntoView({ behavior: "smooth", block: "start" });
            // window.scrollBy({ top: 100, left: 0, behavior: 'smooth' })
          }
          close();
        }}
        alwaysUnderline={active}
        className="flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-accent/75 hover:text-accent-fg lg:px-0 lg:hover:bg-transparent lg:hover:text-fg"
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
  const pathname = usePathname();

  useEffect(() => {
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
      className={`fixed left-0 top-0 z-[999] mt-0 w-screen text-sm transition-all duration-300 ${haveBg && !menu ? "nav-slide-in backdrop-blur-lg backdrop-saturate-150" : "translate-y-0"}`}
    >
      <div
        ref={navRef}
        className={`container relative z-[999] w-full p-5 transition-all ${menu ? "navbar-gradient rounded-b-2xl bg-surface/50 backdrop-blur-lg backdrop-saturate-150" : "border-0 border-transparent bg-[transparent]"}`}
      >
        <div
          className={`flex w-full items-center ${haveBg || menu ? "justify-between" : "justify-end"}`}
        >
          {(haveBg || menu) && (
            <>
              <NextLink
                href="/"
                className="text-lg text-secondary-fg sm:text-xl md:text-2xl dark:text-secondary"
              >
                <span className="mr-1 text-sm sm:text-base md:text-lg">❯</span>
                shnjd
                <span className="blink text-sm sm:text-base md:text-lg">_</span>
              </NextLink>

              <ul className="hidden list-none gap-6 transition-all lg:flex">
                <AnimatePresence>
                  {navs.map((nav, index) => (
                    <NavigationMenuItem
                      key={nav}
                      nav={nav}
                      active={active === nav}
                      activeIndex={navs.indexOf(active ?? "")}
                      index={index}
                      close={() => setMenu(false)}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}

          <ul
            className={`${pathname === "/" ? "hidden" : "flex"} items-center gap-4 lg:flex`}
          >
            <li>
              <Link
                download="resume.pdf"
                href="https://resume.shinjith.dev/?download=true"
              >
                Resume
              </Link>
            </li>
            <li>
              <Link href="/notes">Notes</Link>
            </li>

            <li>
              <ModeSwitch />
            </li>
          </ul>

          {pathname === "/" && (
            <MenuButton
              isClosed={!menu}
              onClick={() => setMenu((prev) => !prev)}
              className="lg:hidden"
            />
          )}
        </div>

        <div
          className={`h-full w-full pt-6 transition-all lg:hidden ${menu && pathname === "/" ? "translate-y-0" : "hidden -translate-y-[200%]"}`}
        >
          <ul className="grid w-full list-none grid-cols-1 place-items-stretch gap-3 sm:grid-cols-2">
            <AnimatePresence>
              {navs.map((nav, index) => (
                <NavigationMenuItem
                  key={nav}
                  nav={nav}
                  active={active === nav}
                  activeIndex={navs.indexOf(active ?? "")}
                  index={index}
                  close={() => setMenu(false)}
                />
              ))}
            </AnimatePresence>
          </ul>

          <hr className="my-4 border-b border-border" />

          <div className="flex w-full items-end gap-2">
            <ul className="flex w-full flex-col gap-3">
              <li>
                <Link
                  download="resume.pdf"
                  href="https://resume.shinjith.dev/?download=true"
                  className="flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-accent/50 hover:text-accent-fg"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  href={"https://notes.shinjith.dev"}
                  className="flex w-full items-center gap-2 rounded px-3 py-1.5 hover:bg-accent hover:text-accent-fg"
                >
                  Notes
                </Link>
              </li>
            </ul>

            <ModeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
