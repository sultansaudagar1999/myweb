import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/work/", priority: 0.9 },
    { path: "/services/", priority: 0.9 },
    { path: "/about/", priority: 0.8 },
    { path: "/contact/", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/work/${p.slug}/`, priority: 0.7 })),
    { path: "/privacy-policy/", priority: 0.2 },
    { path: "/terms/", priority: 0.2 },
  ];
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
