"use client";

import { ReactNode, useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useDarkMode from "../hooks/useDarkMode";

interface Props {
  children: ReactNode;
}

export default function Loader({ children }: Props) {
  const [progress, setProgress] = useState(0);
  useDarkMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 - prev) * 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (progress >= 99.5) return children;

  return (
    <div
      className={`flex h-svh w-screen items-center justify-center overflow-hidden bg-[#0e1d2f] transition-all`}
      style={{
        transition: "all 0.5s cubic-bezier(0.57, 0.21, 0.69, 1.25)",
      }}
    >
      <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
        <CircularProgressbarWithChildren
          value={progress}
          styles={{
            path: {
              stroke: "#ec886f",
              strokeLinecap: "round",
              transition:
                "stroke-dashoffset 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transform: "rotate(0turn)",
              transformOrigin: "center center",
            },
            trail: {
              stroke: "#fbb6a6",
              strokeLinecap: "round",
              transform: "rotate(0.5turn)",
              transformOrigin: "center center",
            },
          }}
        >
          <div
            className="text-4xl font-bold text-secondary transition-all duration-500 sm:text-5xl md:text-6xl"
            style={{
              opacity: progress > 80 ? Math.min(progress * 0.1, 1) : 0,
              scale: progress > 80 ? Math.min(progress * 0.1, 1) : 0,
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              transitionDelay: "0s",
            }}
          >
            S
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
