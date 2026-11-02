// Post-export fix for static hosting (GitHub Pages).
//
// Next.js writes per-segment prefetch payloads as nested folders, e.g.
//   out/work/__next.work/__PAGE__.txt
// but the client router requests them with dotted names, e.g.
//   /work/__next.work.__PAGE__.txt
// A static host has no rewrite rules, so we add a flat copy for each nested file.
import { copyFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? filesIn(join(dir, e.name)) : [join(dir, e.name)])),
  );
  return files.flat();
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesIn(full)) {
        const flatName = `${entry.name}.${relative(full, file).split(sep).join(".")}`;
        await copyFile(file, join(dir, flatName));
        copied++;
      }
    } else if (entry.name !== "_next") {
      await walk(full);
    }
  }
}

if (!(await stat(OUT).catch(() => null))) {
  console.error("postbuild: ./out not found — run `next build` first.");
  process.exit(1);
}
await walk(OUT);
console.log(`postbuild: added ${copied} flat prefetch payload file(s).`);
