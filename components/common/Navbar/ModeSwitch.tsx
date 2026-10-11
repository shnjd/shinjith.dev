"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import useDarkMode from "@/hooks/useDarkMode";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { transition } from "@/lib/motion";

const ModeSwitch = () => {
  const { change, mode } = useDarkMode();

  const getIcon = () => {
    if (mode === "light") return <IconMoon size={18} className="text-subtle" />;
    return <IconSun size={18} className="text-subtle" />;
  };

  const getNextMode = () => {
    if (mode === "light") return "dark";
    return "light";
  };

  return (
    <motion.button
      aria-label={`Switch to ${getNextMode()} mode`}
      title={`Switch to ${getNextMode()} mode`}
      onClick={() => change(mode === "light")}
      whileTap={{ scale: 0.9 }}
      transition={transition.fast}
      className="hover:shadow-spread-xs group rounded-full p-1 transition-shadow sm:p-2"
    >
      <span className="grid size-[18px]">
        <AnimatePresence initial={false}>
          {mode && (
            <motion.span
              key={mode}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={transition.base}
              className="col-start-1 row-start-1 flex"
            >
              {getIcon()}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
};

export default ModeSwitch;
