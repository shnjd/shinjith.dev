"use client";
import Link from "@/components/base/Link";
import NextLink from "next/link";
import ModeSwitch from "./ModeSwitch";
import { useEffect, useRef, useState } from "react";
import { inconsolata } from "@/lib/fonts";
import MenuButton from "@/components/base/MenuButton";

const Navbar = () => {
  const [haveBg, setHaveBg] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);

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
      if (!(navRef.current && e.target && navRef.current.contains(e.target as Node))) {
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
    <nav
      className={`fixed left-0 top-0 z-[999] mt-0 w-screen text-sm transition-all duration-300 ${haveBg && !menu ? "navbar-gradient nav-slide-in backdrop-blur-lg backdrop-saturate-150" : "translate-y-0"} ${menu && "p-3"}`}
    >
      <div
<<<<<<< HEAD
        className={`container relative z-[999] mx-auto w-full p-5 transition-all ${menu ? "rounded-lg backdrop-blur-lg backdrop-saturate-150" : "bg-[transparent]"}`}
      >
        <div className="flex w-full items-center justify-between">
          <NextLink
            href="/"
            className={`text-lg text-secondary sm:text-xl md:text-2xl ${inconsolata.className}`}
          >
=======
        ref={navRef}
        className={`container relative z-[999] mx-auto w-full p-5 transition-all ${menu ? "border-boder/40 navbar-gradient rounded-lg border backdrop-blur-lg backdrop-saturate-150" : "border-0 border-transparent bg-[transparent]"}`}
      >
        <div className="flex w-full items-center justify-between">
          <NextLink href="/" className={`text-lg text-secondary-fg sm:text-xl md:text-2xl dark:text-secondary ${inconsolata.className}`}>
>>>>>>> dev
            /shinjith-dev<span className="blink">_</span>
          </NextLink>

          <ul className="hidden items-center gap-3 sm:flex">
            <li>
              <Link download="resume.pdf" href="https://resume.shinjith.dev">
                Resume
              </Link>
            </li>
            <li>
              <Link href={"https://notes.shinjith.dev"}>Notes</Link>
            </li>
            <li>
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li>
              <ModeSwitch />
            </li>
          </ul>

<<<<<<< HEAD
          <MenuButton
            isClosed={!menu}
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden"
          />
        </div>

        <div
          className={`h-fit w-full pt-4 transition-all sm:hidden ${menu ? "translate-y-0" : "hidden -translate-y-[200%]"}`}
        >
          <ul className="flex flex-col gap-3">
=======
          <MenuButton isClosed={!menu} onClick={() => setMenu((prev) => !prev)} className="sm:hidden" />
        </div>

        <div
          className={`flex h-fit w-full items-end justify-between gap-4 pt-4 transition-all sm:hidden ${menu ? "translate-y-0" : "hidden -translate-y-[200%]"}`}
        >
          <ul className="flex w-full flex-col gap-3">
>>>>>>> dev
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
              <Link href={"/projects"} className="w-full items-start rounded px-3 py-1.5 hover:bg-accent hover:text-accent-fg" underline={false}>
                Projects
              </Link>
            </li>
          </ul>

          <ModeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
