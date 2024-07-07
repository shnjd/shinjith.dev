"use client";
import Link from "next/link";
import ModeSwitch from "./ModeSwitch";
import { useEffect, useState } from "react";
import { inconsolata } from "@/lib/fonts";

const Navbar = () => {
  const [haveBg, setHaveBg] = useState(window.scrollY > 200);
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    if (window.scrollY > 100) setHaveBg(true);

    const checkPosition = () => {
      if (window.scrollY > 100) setHaveBg(true);
      else setHaveBg(false);
    };
    window.addEventListener("scroll", checkPosition);

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-[999] mt-0 w-screen text-sm transition-all duration-300 ${haveBg ? "slide-in-top backdrop-blur-lg backdrop-saturate-150" : "translate-y-0"}`}
    >
      <div className="container relative z-[999] mx-auto flex w-full justify-between p-5">
        <Link
          href="/"
          className={`text-lg text-secondary sm:text-xl md:text-2xl ${inconsolata.className}`}
        >
          /shinjith-dev<span className="blink">_</span>
        </Link>

        <ul className="flex items-center gap-3">
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
      </div>
    </nav>
  );
};

export default Navbar;
