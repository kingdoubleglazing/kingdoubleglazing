import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tina/__generated__/**",
  ]),
  {
    rules: {
      // TinaCMS pages intentionally return JSX from try/catch (Tina fallback pattern).
      "react-hooks/error-boundaries": "off",
      // TinaCMS integration requires `any` in several places.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
