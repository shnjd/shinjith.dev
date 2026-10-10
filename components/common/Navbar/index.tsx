"use client";
import NextLink from "next/link";
import ModeSwitch from "./ModeSwitch";
import { useContext, useEffect, useRef, useState } from "react";
import { toKebabCase } from "@/utils/string";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  Variants,
} from "motion/react";
import { SectionContext } from "@/contexts/SectionContext";
import { usePathname } from "next/navigation";
import Link from "@/components/core/Link";
import { transition } from "@/lib/motion";
import { tw } from "@/utils/cn";
import MenuButton from "./MenuButton";

const navs = ["About", "Experience", "Projects", "Services", "Contact"];

const opacityFactor = 0.5 / navs.length;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...transition.base, delay: index * 0.04 },
  }),
  exit: { opacity: 0, y: -8, transition: transition.fast },
};

const fade = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: transition.base },
  exit: { opacity: 0, y: -8, transition: transition.fast },
};

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
  const reduceMotion = useReducedMotion();
  const opacity =
    activeIndex === index
      ? 1
      : Math.min(1, 1 - (index + 1 - activeIndex) * opacityFactor);

  return (
    <motion.li
      variants={itemVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group"
    >
      <Link
        href={`#${path}`}
        onClick={(e) => {
          const hero = document.getElementById(path);
          e.preventDefault();
          if (hero) {
            hero.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            });
            // window.scrollBy({ top: 100, left: 0, behavior: 'smooth' })
          }
          close();
        }}
        className="hover:bg-accent/75 hover:text-accent-fg lg:hover:text-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5 lg:px-0 lg:hover:bg-transparent"
      >
        <div
          style={{ opacity }}
          className="text-fg group-hover:text-fg/90 text-sm transition-[color,opacity] duration-300"
        >
          {nav}
        </div>
        {active && (
          <motion.span
            layoutId="nav-indicator"
            transition={transition.base}
            className="bg-muted absolute bottom-0 left-0 hidden h-0.5 w-full rounded-full sm:block"
          />
        )}
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
  const showBrand = haveBg || menu;

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
        <div className="flex w-full items-center justify-between">
          <div>
            <AnimatePresence>
              {showBrand && (
                <motion.div key="brand" {...fade}>
                  <NextLink
                    href="/"
                    className="text-secondary-fg dark:text-secondary text-lg sm:text-xl md:text-2xl"
                  >
                    <span className="mr-1 text-sm sm:text-base md:text-lg">
                      ❯
                    </span>
                    shnjd
                    <span className="blink text-sm sm:text-base md:text-lg">
                      _
                    </span>
                  </NextLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ul className="hidden list-none gap-6 lg:flex">
            <LayoutGroup id="desktop-nav">
              <AnimatePresence>
                {showBrand &&
                  navs.map((nav, index) => (
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
            </LayoutGroup>
          </ul>

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
              <Link href="/wiki">Wiki</Link>
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

        <AnimatePresence initial={false}>
          {menu && pathname === "/" && (
            <motion.div
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition.base}
              className="w-full overflow-hidden lg:hidden"
            >
              <div className="pt-6">
                <ul className="grid w-full list-none grid-cols-1 place-items-stretch gap-3 sm:grid-cols-2">
                  <LayoutGroup id="mobile-nav">
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
                  </LayoutGroup>
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
                    <li>
                      <Link
                        href="/wiki"
                        className="hover:bg-accent hover:text-accent-fg flex w-full items-center gap-2 rounded-sm px-3 py-1.5"
                      >
                        Wiki
                      </Link>
                    </li>
                  </ul>

                  <ModeSwitch />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
