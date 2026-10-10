import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 90;
const ERASE_MS = 45;
const HOLD_MS = 1800;
const GAP_MS = 500;

// Next word at random, never the one just shown.
const pick = (words: string[], last?: string) => {
  const pool = words.length > 1 ? words.filter((w) => w !== last) : words;
  return pool[Math.floor(Math.random() * pool.length)];
};

/** Types a word, holds it, erases it, then moves on to another one. */
export default function useTypewriter(words: string[]) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const key = words.join("\n");

  useEffect(() => {
    if (reduceMotion) return;
    const list = key.split("\n").filter(Boolean);
    if (list.length === 0) return;

    let word = pick(list);
    let length = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!erasing && length < word.length) {
        length++;
        timer = setTimeout(tick, length === word.length ? HOLD_MS : TYPE_MS);
      } else if (length > 0) {
        erasing = true;
        length--;
        timer = setTimeout(tick, length === 0 ? GAP_MS : ERASE_MS);
      } else {
        erasing = false;
        word = pick(list, word);
        timer = setTimeout(tick, TYPE_MS);
      }
      setText(word.slice(0, length));
    };

    timer = setTimeout(tick, GAP_MS);
    return () => {
      clearTimeout(timer);
      setText("");
    };
  }, [key, reduceMotion]);

  return text;
}
