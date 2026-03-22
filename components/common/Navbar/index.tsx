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
        className="hover:bg-accent/75 hover:text-accent-fg lg:hover:text-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5 lg:px-0 lg:hover:bg-transparent"
      >
        <div className="text-fg group-hover:text-fg/90 text-sm transition-all duration-300">
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

    return () => window.removeEventListener("click", hideMenu);
  }, [menu]);

  return (
    <header
      className={`fixed top-0 left-0 z-999 mt-0 w-screen text-sm transition-all duration-300 ${haveBg && !menu ? "nav-slide-in backdrop-blur-lg backdrop-saturate-150" : "translate-y-0"}`}
    >
      <div
        ref={navRef}
        className={`relative z-999 container w-full p-5 transition-all ${menu ? "navbar-gradient bg-surface/50 rounded-b-2xl backdrop-blur-lg backdrop-saturate-150" : "border-0 border-transparent bg-transparent"}`}
      >
        <div
          className={`flex w-full items-center ${haveBg || menu ? "justify-between" : "justify-end"}`}
        >
          {(haveBg || menu) && (
            <>
              <NextLink
                href="/"
                className="text-secondary-fg dark:text-secondary text-lg sm:text-xl md:text-2xl"
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
                href="https://resume.shnjd.com/?download=true"
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

          <hr className="border-border my-4 border-b" />

          <div className="flex w-full items-end gap-2">
            <ul className="flex w-full flex-col gap-3">
              <li>
                <Link
                  download="resume.pdf"
                  href="https://resume.shnjd.com/?download=true"
                  className="hover:bg-accent/50 hover:text-accent-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  href={"https://notes.shnjd.com"}
                  className="hover:bg-accent hover:text-accent-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5"
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
