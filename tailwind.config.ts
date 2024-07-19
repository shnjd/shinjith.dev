import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      maxWidth: {
        "9xl": "1400px",
        "10xl": "1500px",
      },
      rotate: {
        "40": "40deg",
      },
      colors: {
        background: "hsl(var(--col-background) / <alpha-value>)",
        surface: "hsl(var(--col-surface) / <alpha-value>)",
        overlay: "hsl(var(--col-overlay) / <alpha-value>)",
        muted: "hsl(var(--col-muted) / <alpha-value>)",
        subtle: "hsl(var(--col-subtle) / <alpha-value>)",
        fg: "hsl(var(--col-fg) / <alpha-value>)",
        accent: "hsl(var(--col-accent) / <alpha-value>)",
        "accent-fg": "hsl(var(--col-accent-fg) / <alpha-value>)",
        primary: "hsl(var(--col-primary) / <alpha-value>)",
        "primary-fg": "hsl(var(--col-primary-fg) / <alpha-value>)",
        secondary: "hsl(var(--col-secondary) / <alpha-value>)",
        "secondary-fg": "hsl(var(--col-secondary-fg) / <alpha-value>)",
        destructive: "hsl(var(--col-destructive) / <alpha-value>)",
        "destructive-fg": "hsl(var(--col-destructive-fg) / <alpha-value>)",
        border: "hsl(var(--col-border) / <alpha-value>)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
