/**
 * Prefix a public asset path with the deployment base path.
 *
 * Next.js applies `basePath` to <Link> and next/image automatically, but not to
 * raw <img src="/media/...">. Every local asset goes through this helper so a
 * GitHub Pages project deployment (NEXT_PUBLIC_BASE_PATH=/URRT-website) works
 * without touching components.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}

export const media = (name: string) => asset(`/media/${name}.webp`);
