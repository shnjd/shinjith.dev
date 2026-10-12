import { bundledThemes } from "shiki";

// Syntax themes for rehype-pretty-code, with every token colour nudged to at
// least WCAG AA contrast (4.5:1) against the darkest (light theme) or lightest
// (dark theme) background a token can sit on: a highlighted line.
// Hue and saturation are kept; only lightness moves, so the palette still
// reads as Catppuccin.

const MIN_CONTRAST = 4.6; // a little headroom over 4.5 for rounding

const toRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const toHex = (rgb) =>
  "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const luminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const rgbToHsl = ([r, g, b]) => {
  [r, g, b] = [r / 255, g / 255, b / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === r
      ? (g - b) / d + (g < b ? 6 : 0)
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
  return [h / 6, s, l];
};

const hslToRgb = ([h, s, l]) => {
  if (s === 0) return [l, l, l].map((v) => v * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue = (t) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)].map((v) => v * 255);
};

function accessible(hex, bg, darken) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  let rgb = toRgb(hex);
  const [h, s, start] = rgbToHsl(rgb);
  for (let l = start; contrast(rgb, bg) < MIN_CONTRAST;) {
    l += darken ? -0.01 : 0.01;
    if (l < 0 || l > 1) break;
    rgb = hslToRgb([h, s, l]);
  }
  return toHex(rgb);
}

async function load(name, bgHex, darken) {
  const theme = structuredClone((await bundledThemes[name]()).default);
  const bg = toRgb(bgHex);
  for (const token of theme.tokenColors ?? []) {
    const fg = token.settings?.foreground;
    if (fg) token.settings.foreground = accessible(fg, bg, darken);
  }
  for (const key of ["editor.foreground", "foreground"]) {
    if (theme.colors?.[key])
      theme.colors[key] = accessible(theme.colors[key], bg, darken);
  }
  return theme;
}

// Highlighted-line backgrounds: --col-overlay in light and dark mode
// (styles/globals.css), measured in the browser.
export const lightCodeTheme = await load("catppuccin-latte", "#daf1ef", true);
export const darkCodeTheme = await load("catppuccin-mocha", "#35435a", false);
