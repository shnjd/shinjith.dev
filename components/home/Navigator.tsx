"use client"
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { toKebabCase } from "@/lib/utils/string";

const navs = ["About", "Experience", "Projects", "Services", "Contact"];

const opacityFactor = 0.5 / navs.length;

type Props = {
  active?: string
}

type ItemProps = {
  nav: string;
  active: boolean
  activeIndex: number
  index: number
}

function NavigationMenuItem({ nav, active, activeIndex, index }: ItemProps) {
  const path = toKebabCase(nav);
  const opacity =
    activeIndex === index ? 1 : 1 - (index + 1 - activeIndex) * opacityFactor;

  return (
    <motion.li
      initial={{ y: -10, x: 40, opacity: 0 }}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      transition={{ delay: 0.4 + index * 0.1, type: "tween" }}
      className="group my-1"
      style={{ opacity }}
    >
      <Link
        href={`#${path}`}
        onClick={(e) => {
          const hero = document.getElementById(path);
          e.preventDefault(); // Stop Page Reloading
          if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="flex items-center gap-2"
      >
        <div
          className={`transition-all duration-300 h-0.5 bg-subtle rounded-md ${active ? "w-6" : "w-2 group-hover:w-6"
            }`}
        />
        <div className="transition-all duration-300 text-sm text-fg dark:text-dark-200">
          {nav}
        </div>
      </Link>
    </motion.li>
  );
}

function NavigationMenu({ active = "about" }: Props) {
  const [haveBg, setHaveBg] = useState(false);

  useEffect(() => {
    if (window.scrollY > 200) setHaveBg(true);

    const checkPosition = () => {
      if (window.scrollY > 200) setHaveBg(true);
      else setHaveBg(false);
    };
    window.addEventListener("scroll", checkPosition);

    return () => window.removeEventListener("scroll", checkPosition);
  }, []);

  return (
    <nav
      className={`transition-all duration-500 fixed left-0 sm:left-[calc(50vw-320px)] md:left-[calc(50vw-384px)] lg:left-[calc(50vw-512px)] xl:left-[calc(50vw-640px)] 2xl:left-[calc(50vw-768px)] mx-auto pl-2 pt-4 ml-4 z-[999] ${haveBg ? "top-16" : "top-12"
        }`}
    >
      <ul className="transition-all hidden lg:block">
        <AnimatePresence>
          {navs.map((nav, index) => (
            <NavigationMenuItem
              key={nav}
              nav={nav}
              active={active === nav}
              activeIndex={navs.indexOf(active)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
}

export default NavigationMenu;
