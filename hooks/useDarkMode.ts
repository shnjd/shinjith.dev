import { useEffect, useState } from "react";
import { THEME_COLORS } from "@/lib/constants";

// The un-media'd theme-color tag the layout's head script adds wins over the
// OS-based ones, so it has to follow the toggle.
const syncThemeColor = (mode: "light" | "dark") => {
  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]:not([media])',
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.insertBefore(meta, document.head.firstChild);
  }
  meta.content = THEME_COLORS[mode];
};

const useDarkMode = () => {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  const setSystem = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      syncThemeColor("dark");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      syncThemeColor("light");
      setMode("light");
    }
  };

  const setDark = () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    syncThemeColor("dark");
    setMode("dark");
  };

  const setLight = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    syncThemeColor("light");
    setMode("light");
  };

  useEffect(() => {
    // Sync with localStorage (external system), unavailable during SSR
    /* eslint-disable react-hooks/set-state-in-effect */
    if (localStorage.theme === "dark") setDark();
    else if (localStorage.theme === "light") setLight();
    else setSystem();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const change = (isDark: boolean) => {
    if (isDark) setDark();
    else setLight();
  };

  return { mode, change };
};

export default useDarkMode;
