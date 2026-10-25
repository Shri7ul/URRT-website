import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

/** Lint the application, not vendored skills or generated output. */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "content-audit/**",
      "scripts/**",
      "public/**",
      ".agents/**",
      ".claude/**",
      ".codebuddy/**",
      ".workbuddy-ai/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Static export serves pre-optimised WebP from /public, so next/image
      // (which requires a running optimiser) is deliberately not used.
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
