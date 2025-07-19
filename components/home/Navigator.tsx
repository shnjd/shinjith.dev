"use client";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { toKebabCase } from "@/lib/utils/string";
import { SectionContext } from "../contexts/SectionContext";

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
      transition={{ delay: 0.4 + index * 0.1, type: "tween" }}
      className="group"
      style={{ opacity }}
    >
      <Link
        href={`#${path}`}
        aria-label={nav}
        onClick={(e) => {
          const hero = document.getElementById(path);
          e.preventDefault(); // Stop Page Reloading
          if (hero) {
            hero.scrollIntoView({ behavior: "smooth", block: "start" });
            // window.scrollBy({ top: 100, left: 0, behavior: 'smooth' })
          }
        }}
        className="flex items-center gap-2"
      >
        <div
          className={`h-0.5 rounded-md bg-subtle transition-all duration-300 ${active ? "w-2.5" : "w-1 group-hover:w-2"}`}
        />
        <div className="text-sm text-fg transition-all duration-300 group-hover:text-fg/90">
          {nav}
        </div>
      </Link>
    </motion.li>
  );
}

function NavigationMenu() {
  const [haveBg, setHaveBg] = useState(false);
  const { activeSection: active } = useContext(SectionContext);
  console.log(active);

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
      className={`fixed left-0 z-[999] mx-auto ml-4 pl-2 pt-4 transition-all duration-500 sm:left-[calc(50vw-320px)] md:left-[calc(50vw-384px)] lg:left-[calc(50vw-512px)] xl:left-[calc(50vw-640px)] 2xl:left-[calc(50vw-768px)] ${
        haveBg ? "top-16" : "top-12"
      }`}
    >
      <ul className="hidden list-none space-y-2 transition-all lg:block">
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
    </nav>
  );
}

export default NavigationMenu;
