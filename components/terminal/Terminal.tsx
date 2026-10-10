"use client";
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "@/lib/lenis";
import { transition } from "@/lib/motion";
import { display, toVirtual } from "@/lib/terminal/path";
import { complete, Context, run } from "./commands";
import { DirNode, loadFs, nearestDir } from "./fs";

type Entry = {
  id: number;
  cwd?: string;
  input?: string;
  output?: ReactNode;
};

// Commands typed in earlier sessions, for ↑/↓.
const history: string[] = [];

function PromptLabel({ cwd }: { cwd: string }) {
  return (
    <span className="shrink-0 whitespace-pre">
      <span className="text-secondary-fg dark:text-secondary font-semibold">
        {display(cwd)}
      </span>
      <span className="text-secondary-fg dark:text-secondary">❯ </span>
    </span>
  );
}

const welcome: Entry = {
  id: 0,
  output: (
    <p className="text-muted">
      Type <span className="text-fg">help</span> to see what you can do. Press{" "}
      <kbd className="text-fg">`</kbd> anywhere on the site to open this again.
    </p>
  ),
};

export default function Terminal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const [fs, setFs] = useState<DirNode>();
  const [failed, setFailed] = useState(false);
  const [cwd, setCwd] = useState("/");
  const [entries, setEntries] = useState<Entry[]>([welcome]);
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(history.length);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    loadFs().then(
      (root) => {
        setFs(root);
        // Start in the folder of the page being viewed.
        setCwd(nearestDir(root, toVirtual(pathname)));
      },
      () => setFailed(true),
    );
  }, [pathname]);

  // Lock the page behind while open.
  useEffect(() => {
    // Lock through body: its overflow carries over to the viewport, so the
    // scroll position is kept (hiding html's overflow would reset it).
    lenis?.stop();
    const { body } = document;
    const overflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = overflow;
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  // Keep the input line in view as output is added.
  useLayoutEffect(() => {
    inputRef.current?.scrollIntoView({ block: "nearest" });
  }, [entries]);

  const print = useCallback((entry: Omit<Entry, "id">) => {
    setEntries((prev) => [...prev, { ...entry, id: nextId.current++ }]);
  }, []);

  const context = (): Context | undefined =>
    fs && {
      fs,
      cwd,
      setCwd,
      clear: () => setEntries([]),
      close: onClose,
      navigate: (href) => {
        onClose();
        router.push(href);
      },
    };

  const submit = () => {
    const ctx = context();
    if (!ctx) return;
    const command = input.trim();
    if (command && history.at(-1) !== command) history.push(command);
    setCursor(history.length);
    setInput("");

    if (/^clear(\s|$)/.test(command)) {
      setEntries([]);
      return;
    }
    print({ cwd, input, output: run(command, ctx) });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const ctx = context();
      if (!ctx) return;
      const result = complete(input, ctx);
      setInput(result.input);
      if (result.options)
        print({
          cwd,
          input,
          output: (
            <ul className="flex flex-wrap gap-x-6">
              {result.options.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          ),
        });
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(
        history.length,
        Math.max(0, cursor + (e.key === "ArrowUp" ? -1 : 1)),
      );
      setCursor(next);
      setInput(history[next] ?? "");
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setEntries([]);
    } else if (e.ctrlKey && e.key === "c") {
      if (window.getSelection()?.toString()) return;
      e.preventDefault();
      print({ cwd, input: `${input}^C` });
      setInput("");
    }
  };

  // Clicking the screen focuses the input, unless text is being selected.
  const focusInput = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition.fast}
      className="fixed inset-0 z-1000 flex items-center justify-center p-3 sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        initial={{ scale: 0.97, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8 }}
        transition={transition.base}
        className="bg-background/90 dark:bg-surface/85 relative z-10 h-[70dvh] w-full max-w-5xl overflow-hidden rounded-2xl font-mono text-base leading-relaxed shadow-2xl backdrop-blur-xl backdrop-saturate-150 sm:aspect-16/10 sm:h-auto sm:max-h-[80dvh] sm:text-[13px]"
      >
        <div
          data-lenis-prevent
          onClick={focusInput}
          className="text-fg h-full overflow-y-auto overscroll-contain px-3 py-2 sm:px-4 sm:py-3"
        >
          {entries.map(({ id, cwd, input, output }) => (
            <div key={id}>
              {cwd !== undefined && (
                <div className="flex">
                  <PromptLabel cwd={cwd} />
                  <span className="wrap-anywhere whitespace-pre-wrap">
                    {input}
                  </span>
                </div>
              )}
              {output}
            </div>
          ))}

          {failed ? (
            <p className="text-destructive dark:text-secondary">
              Couldn&apos;t load the filesystem. Close the terminal and try
              again.
            </p>
          ) : (
            <label className="flex">
              <PromptLabel cwd={cwd} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Command"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                className="caret-secondary min-w-0 flex-1 bg-transparent outline-none"
              />
            </label>
          )}
        </div>
      </motion.div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex h-28 items-end justify-center bg-linear-to-t from-black/85 via-black/50 to-transparent pb-5">
        <p className="pointer-events-auto font-mono text-sm text-white/75">
          press{" "}
          <kbd className="rounded border border-white/30 px-1.5 text-white">
            esc
          </kbd>{" "}
          or{" "}
          <button
            type="button"
            onClick={onClose}
            className="text-white underline underline-offset-4 hover:text-white/80"
          >
            close terminal
          </button>{" "}
          to exit
        </p>
      </div>
    </motion.div>
  );
}
