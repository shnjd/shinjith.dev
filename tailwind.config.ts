import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--col-background) / <alpha-value>)',
        surface: 'hsl(var(--col-surface) / <alpha-value>)',
        overlay: 'hsl(var(--col-overlay) / <alpha-value>)',
        foreground: 'hsl(var(--col-foreground) / <alpha-value>)',
        subtle: 'hsl(var(--col-subtle) / <alpha-value>)',
        muted: 'hsl(var(--col-muted) / <alpha-value>)',
        primary: 'hsl(var(--col-primary) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--col-primary-foreground) / <alpha-value>)',
        secondary: 'hsl(var(--col-secondary) / <alpha-value>)',
        'secondary-foreground': 'hsl(var(--col-secondary-foreground) / <alpha-value>)',
        accent: 'hsl(var(--col-accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--col-accent-foreground) / <alpha-value>)',
        destructive: 'hsl(var(--col-destructive) / <alpha-value>)',
        'destructive-foreground': 'hsl(var(--col-destructive-foreground) / <alpha-value>)',
        border: 'hsl(var(--col-border) / <alpha-value>)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
