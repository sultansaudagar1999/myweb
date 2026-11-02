// Dev helper: screenshot local pages for visual review.
// Usage: node scripts/shoot.mjs <outDir> <width> <path...>
import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const [outDir, width, ...paths] = process.argv.slice(2);
const executablePath = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find(
  (p) => p && existsSync(p),
);
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath });
const w = Number(width);
const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: w < 600, hasTouch: w < 600 });
for (const p of paths) {
  await page.goto(`http://localhost:${process.env.PORT ?? 4173}${p}`, { waitUntil: "networkidle" });
  // Reveal everything for a full-page capture.
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((img) => (img.loading = "eager"));
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const name = (p.replace(/\//g, "_").replace(/^_|_$/g, "") || "home") + `-${w}.png`;
  await page.screenshot({ path: `${outDir}/${name}`, fullPage: true });
  console.log(name);
}
await browser.close();
