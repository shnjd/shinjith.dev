"use client";
import { ReactNode, useEffect, useState } from "react";
import Prose from "@/components/layouts/Prose";
import { display, resolve, toHref } from "@/lib/terminal/path";
import { formatDateToDisplay } from "@/utils/date";
import { DirNode, Doc, entries, FileNode, lookup } from "./fs";

/* eslint-disable no-unused-vars -- parameter names in function types */
export type Context = {
  fs: DirNode;
  cwd: string;
  setCwd: (path: string) => void;
  clear: () => void;
  close: () => void;
  navigate: (href: string) => void;
};

type Command = {
  usage: string;
  summary: string;
  run: (args: string[], ctx: Context) => ReactNode | void;
};
/* eslint-enable no-unused-vars */

const Failure = ({ children }: { children: ReactNode }) => (
  <p className="text-destructive dark:text-secondary">{children}</p>
);

function Listing({ node }: { node: DirNode }) {
  const items = entries(node);
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-6">
      {items.map(([name, child]) => (
        <li
          key={name}
          className={
            child.type === "dir" ? "text-primary font-semibold" : "text-fg"
          }
        >
          {name}
          {child.type === "dir" && "/"}
        </li>
      ))}
    </ul>
  );
}

function Cat({ file, name }: { file: FileNode; name: string }) {
  const [doc, setDoc] = useState<Doc>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    file.load().then(setDoc, () => setFailed(true));
  }, [file]);

  if (failed) return <Failure>cat: {name}: could not be read</Failure>;
  if (!doc) return <p className="text-muted">reading {name}…</p>;

  const { title, description, date, Content } = doc;
  return (
    <Prose className="my-4 max-w-4xl font-sans">
      {title && <h1 className="mt-0 mb-0">{title}</h1>}
      {description && <p className="text-subtle! mt-2 mb-0">{description}</p>}
      {date && (
        <p className="text-muted! mt-1 mb-0 text-sm">
          {formatDateToDisplay(new Date(date))}
        </p>
      )}
      {(title || description || date) && <hr className="my-6 border-t" />}
      <Content />
    </Prose>
  );
}

export const commands: Record<string, Command> = {
  help: {
    usage: "help",
    summary: "show this list",
    run: () => (
      <table className="my-1">
        <tbody>
          {Object.values(commands).map(({ usage, summary }) => (
            <tr key={usage}>
              <td className="text-primary pr-6 align-top whitespace-nowrap">
                {usage}
              </td>
              <td className="text-subtle">{summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  ls: {
    usage: "ls [dir]",
    summary: "list a directory",
    run: ([arg], { fs, cwd }) => {
      const node = lookup(fs, resolve(cwd, arg ?? "."));
      if (!node) return <Failure>ls: {arg}: no such file or directory</Failure>;
      if (node.type === "file") return <p>{arg}</p>;
      return <Listing node={node} />;
    },
  },
  cd: {
    usage: "cd [dir]",
    summary: "change directory (~ is shnjd)",
    run: ([arg], { fs, cwd, setCwd }) => {
      const path = resolve(cwd, arg);
      const node = lookup(fs, path);
      if (!node) return <Failure>cd: no such file or directory: {arg}</Failure>;
      if (node.type === "file")
        return <Failure>cd: not a directory: {arg}</Failure>;
      setCwd(path);
    },
  },
  cat: {
    usage: "cat <file>",
    summary: "print a page",
    run: (args, { fs, cwd }) => {
      if (args.length === 0)
        return <Failure>cat: missing file operand</Failure>;
      return args.map((arg, i) => {
        const node = lookup(fs, resolve(cwd, arg));
        if (!node)
          return (
            <Failure key={i}>cat: {arg}: no such file or directory</Failure>
          );
        if (node.type === "dir")
          return <Failure key={i}>cat: {arg}: is a directory</Failure>;
        return <Cat key={i} file={node} name={arg} />;
      });
    },
  },
  open: {
    usage: "open [path]",
    summary: "go to that page on the site",
    run: ([arg], { fs, cwd, navigate }) => {
      const path = resolve(cwd, arg ?? ".");
      if (!lookup(fs, path))
        return <Failure>open: {arg}: no such file or directory</Failure>;
      navigate(toHref(path));
    },
  },
  pwd: {
    usage: "pwd",
    summary: "print the current directory",
    run: (_, { cwd }) => <p>{display(cwd)}</p>,
  },
  clear: {
    usage: "clear",
    summary: "clear the screen (ctrl+l)",
    run: (_, { clear }) => clear(),
  },
  exit: {
    usage: "exit",
    summary: "close the terminal (esc)",
    run: (_, { close }) => close(),
  },
};

export function run(input: string, ctx: Context): ReactNode {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return null;
  const command = commands[name];
  if (!command) return <Failure>command not found: {name}</Failure>;
  return command.run(args, ctx) ?? null;
}

const commonPrefix = (words: string[]) =>
  words.reduce((prefix, word) => {
    let i = 0;
    while (i < prefix.length && prefix[i] === word[i]) i++;
    return prefix.slice(0, i);
  });

/**
 * Tab completion of the last word: a command name first, a path after.
 * Returns the new input and, when it is ambiguous, the candidates.
 */
export function complete(input: string, { fs, cwd }: Context) {
  const words = input.split(" ");
  const word = words.at(-1) ?? "";
  let candidates: string[];
  let base = "";

  if (words.length === 1) {
    candidates = Object.keys(commands).filter((c) => c.startsWith(word));
  } else {
    const slash = word.lastIndexOf("/");
    base = word.slice(0, slash + 1);
    const partial = word.slice(slash + 1);
    const parent = lookup(fs, resolve(cwd, base || "."));
    if (parent?.type !== "dir") return { input };
    candidates = entries(parent)
      .filter(([name]) => name.startsWith(partial))
      .map(([name, node]) => (node.type === "dir" ? `${name}/` : name));
  }

  if (candidates.length === 0) return { input };
  const completed = commonPrefix(candidates);
  // A single command or file is followed by a space, a folder is not.
  const suffix = candidates.length === 1 && !completed.endsWith("/") ? " " : "";
  const next = [...words.slice(0, -1), base + completed + suffix].join(" ");
  return {
    input: next,
    options: candidates.length > 1 && next === input ? candidates : undefined,
  };
}
