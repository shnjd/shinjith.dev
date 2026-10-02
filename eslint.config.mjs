import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".open-next/**",
    "node_modules/**",
    "cloudflare-env.d.ts",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
