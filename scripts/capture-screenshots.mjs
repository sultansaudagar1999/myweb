// Captures real screenshots of each live portfolio project with headless Chrome.
// Usage: npm run screenshots            (all projects)
//        npm run screenshots -- loanly  (one project)
import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

// `details`: extra shots for case studies — either a CSS selector on the home
// page (element screenshot) or a separate path (viewport screenshot).
const PROJECTS = [
  {
    slug: "saudagar-driving-school",
    url: "https://sultansaudagar1999.github.io/saudagar-driving-school/",
    details: [
      { name: "detail-1", selector: "#gallery" },
      { name: "detail-2", selector: "#courses" },
    ],
  },
  {
    slug: "loanly",
    url: "https://sultansaudagar1999.github.io/loanly/",
    details: [
      { name: "detail-1", selector: "section.mt-16:has(h2:text-is('Yearly breakdown'))" },
      { name: "detail-2", selector: "section.mt-16:has(h2:text-is('Repayment schedule'))" },
    ],
  },
  {
    slug: "beforebuy",
    url: "https://plain-pine-2cb5.sultansaudagar1999.workers.dev/",
    details: [
      { name: "detail-1", path: "calculators.html" },
      { name: "detail-2", path: "compare.html" },
    ],
  },
];

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const executablePath = CHROME_PATHS.find((p) => existsSync(p));
if (!executablePath) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

const only = process.argv[2];
const browser = await chromium.launch({ executablePath });

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  // Scroll through once so lazy content and reveal animations render.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

for (const project of PROJECTS.filter((p) => !only || p.slug === only)) {
  const dir = `public/images/work/${project.slug}`;
  await mkdir(dir, { recursive: true });

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await desktop.goto(project.url, { waitUntil: "load", timeout: 60000 });
  await settle(desktop);
  const hero = await desktop.screenshot();
  await sharp(hero).resize(1800).webp({ quality: 82 }).toFile(`${dir}/desktop.webp`);
  await sharp(hero).resize(1200, 630, { position: "top" }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${dir}/og.jpg`);

  const full = await desktop.screenshot({ fullPage: true });
  const meta = await sharp(full).metadata();
  // Cap very tall pages so the scrolling preview stays light.
  const maxHeight = Math.min(meta.height, Math.round(meta.width * 4.5));
  await sharp(full)
    .extract({ left: 0, top: 0, width: meta.width, height: maxHeight })
    .resize(1200)
    .webp({ quality: 74 })
    .toFile(`${dir}/full.webp`);

  for (const detail of project.details) {
    let shot;
    if (detail.selector) {
      const el = desktop.locator(detail.selector).first();
      await el.scrollIntoViewIfNeeded();
      // Hide sticky headers and floating buttons so they don't overlap the section.
      await desktop.evaluate(() => {
        for (const node of document.querySelectorAll("body *")) {
          const pos = getComputedStyle(node).position;
          if (pos === "fixed" || pos === "sticky") node.style.visibility = "hidden";
        }
      });
      await desktop.waitForTimeout(600);
      shot = await el.screenshot();
    } else {
      await desktop.goto(new URL(detail.path, project.url).href, { waitUntil: "load", timeout: 60000 });
      await settle(desktop);
      shot = await desktop.screenshot();
    }
    await sharp(shot)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${dir}/${detail.name}.webp`);
  }
  await desktop.close();

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(project.url, { waitUntil: "load", timeout: 60000 });
  await settle(mobile);
  await sharp(await mobile.screenshot()).resize(585).webp({ quality: 82 }).toFile(`${dir}/mobile.webp`);
  await mobile.close();

  console.log(`Captured ${project.slug}`);
}

await browser.close();
