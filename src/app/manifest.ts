import type { MetadataRoute } from "next";
import { asset, site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.name,
    description: site.description,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#010617",
    theme_color: "#010617",
    icons: [
      { src: asset("/brand/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/icon.png"), sizes: "192x192", type: "image/png" },
    ],
  };
}
