import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  const setSystem = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  };

  const setDark = () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setMode("dark");
  };

  const setLight = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setMode("light");
  };

  useEffect(() => {
    if (localStorage.theme === "dark") setDark();
    else if (localStorage.theme === "light") setLight();
    else setSystem();
  }, []);

  const change = (isDark: boolean) => {
    if (isDark) setDark();
    else setLight();
  };

  return { mode, change };
};

export default useDarkMode;
