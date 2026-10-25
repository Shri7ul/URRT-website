import type { NextConfig } from "next";

/**
 * Deployment target: static export.
 *
 * The original site is plain static HTML served from
 * https://rescuerover.uiu.ac.bd/ (an Apache host). A static export keeps the
 * same deployment model — no Node server required — so the existing hosting
 * arrangement keeps working.
 *
 * For a GitHub Pages *project* site (user.github.io/URRT-website) set
 * NEXT_PUBLIC_BASE_PATH=/URRT-website at build time. For the custom domain
 * (rescuerover.uiu.ac.bd) leave it unset.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
