// Minimal static server for the exported site in ./out, mimicking GitHub Pages:
// directory URLs serve index.html, unknown paths serve 404.html with status 404.
// Usage: node scripts/serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const root = join(process.cwd(), "out");
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, clean);
  if (!file.startsWith(root)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  let path = new URL(req.url ?? "/", "http://localhost").pathname;
  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length) || "/";
  // GitHub Pages redirects /about to /about/ when a directory exists.
  if (!extname(path) && !path.endsWith("/")) {
    const dir = await resolveFile(path + "/");
    if (dir) {
      res.writeHead(301, { Location: `${basePath}${path}/` });
      return res.end();
    }
  }
  const file = await resolveFile(path);
  if (!file) {
    const notFound = await readFile(join(root, "404.html")).catch(() => "Not found");
    res.writeHead(404, { "Content-Type": types[".html"] });
    return res.end(notFound);
  }
  const body = await readFile(file);
  const type = types[extname(file)] ?? "application/octet-stream";
  // gzip text assets, as GitHub Pages does, so local performance tests are realistic.
  if (/text|javascript|json|xml|svg|manifest/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
    res.writeHead(200, { "Content-Type": type, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    return res.end(gzipSync(body));
  }
  res.writeHead(200, { "Content-Type": type });
  res.end(body);
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}${basePath}/`));
