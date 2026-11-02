import type { NextConfig } from "next";

// GitHub Pages user site (sultansaudagar1999.github.io) is served from the root,
// so the base path is empty. For a project-repo deployment set
// NEXT_PUBLIC_BASE_PATH=/repo-name at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
