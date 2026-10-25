import type { MetadataRoute } from "next";

import { projects, site } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: "monthly" | "yearly" }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/research", priority: 0.8, changeFrequency: "monthly" },
    { path: "/team", priority: 0.7, changeFrequency: "yearly" },
    { path: "/journey", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/join", priority: 0.8, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/brand-assets", priority: 0.4, changeFrequency: "yearly" },
    { path: "/gear", priority: 0.3, changeFrequency: "yearly" },
    { path: "/webmasters", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}/`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
