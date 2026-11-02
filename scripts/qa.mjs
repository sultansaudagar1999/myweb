// Automated QA against the exported site served locally (npm run start).
//   node scripts/qa.mjs                 — pages, links, SEO, a11y, layout, menu, form (unconfigured)
//   node scripts/qa.mjs --form-configured — also tests the Web3Forms flow (build with a dummy key first)
import { chromium } from "playwright-core";
import { existsSync, readFileSync } from "node:fs";

const BASE = process.env.QA_BASE ?? "http://localhost:4173";
const formConfigured = process.argv.includes("--form-configured");
const skipExternal = process.argv.includes("--skip-external");
const executablePath = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find(
  (p) => p && existsSync(p),
);
const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");

const results = { pass: 0, fail: 0, warn: 0 };
const failures = [];
const warnings = [];
const ok = (cond, msg) => {
  if (cond) results.pass++;
  else {
    results.fail++;
    failures.push(msg);
  }
};
const warn = (msg) => {
  results.warn++;
  warnings.push(msg);
};

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const site = sitemap.match(/<loc>([^<]+)<\/loc>/)[1].replace(/\/$/, "");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(site, "") || "/");
console.log(`Found ${routes.length} routes in sitemap.`);

const browser = await chromium.launch({ executablePath });

// ---------------------------------------------------------------- per-page checks
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const externalLinks = new Set();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("requestfailed", (r) => r.url().startsWith(BASE) && !/ERR_ABORTED/.test(r.failure()?.errorText ?? "") && failedRequests.push(r.url()));
  page.on("response", (r) => r.url().startsWith(BASE) && r.status() >= 400 && failedRequests.push(`${r.status()} ${r.url()}`));

  const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
  ok(res.status() === 200, `${route}: HTTP ${res.status()}`);

  const info = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter((h) => !h.closest("dialog"))
      .map((h) => Number(h.tagName[1]));
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      ogImage: meta('meta[property="og:image"]'),
      ogTitle: meta('meta[property="og:title"]'),
      lang: document.documentElement.lang,
      h1: document.querySelectorAll("h1").length,
      headings,
      imgsNoAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).map((i) => i.src),
      brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.src),
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      links: [...document.querySelectorAll("a[href]")].map((a) => ({
        href: a.href,
        raw: a.getAttribute("href"),
        target: a.target,
        rel: a.rel,
        name: (a.getAttribute("aria-label") || a.textContent || "").trim(),
      })),
      priceLike: /(₹|Rs\.?|INR)\s?\d/.test(document.querySelector("main")?.innerText.replace(/Under ₹|₹\d[\d,]* – ₹|Above ₹/g, "") ?? ""),
    };
  });

  ok(info.title && info.title.length >= 10 && info.title.length <= 70, `${route}: title length ${info.title?.length} "${info.title}"`);
  ok(info.description && info.description.length >= 50 && info.description.length <= 170, `${route}: meta description length ${info.description?.length}`);
  ok(info.canonical === site + route, `${route}: canonical ${info.canonical}`);
  ok(!!info.ogImage && info.ogImage.startsWith("https://"), `${route}: og:image ${info.ogImage}`);
  ok(info.lang === "en-IN", `${route}: html lang`);
  ok(info.h1 === 1, `${route}: ${info.h1} h1 elements`);
  for (let i = 1; i < info.headings.length; i++) {
    if (info.headings[i] > info.headings[i - 1] + 1) {
      ok(false, `${route}: heading level skips h${info.headings[i - 1]} → h${info.headings[i]}`);
      break;
    }
  }
  ok(info.imgsNoAlt.length === 0, `${route}: images without alt: ${info.imgsNoAlt.join(", ")}`);
  ok(info.brokenImgs.length === 0, `${route}: broken images: ${info.brokenImgs.join(", ")}`);
  for (const j of info.jsonLd) {
    try {
      JSON.parse(j);
      results.pass++;
    } catch {
      ok(false, `${route}: invalid JSON-LD`);
    }
  }
  ok(!info.priceLike, `${route}: page shows something that looks like a price`);
  if (titles.has(info.title)) ok(false, `${route}: duplicate title with ${titles.get(info.title)}`);
  titles.set(info.title, route);
  if (descriptions.has(info.description)) ok(false, `${route}: duplicate description with ${descriptions.get(info.description)}`);
  descriptions.set(info.description, route);

  for (const l of info.links) {
    if (!l.name) ok(false, `${route}: link without accessible name → ${l.raw}`);
    if (l.href.startsWith(BASE)) internalLinks.add(l.href.split("#")[0]);
    else if (l.href.startsWith("http")) {
      externalLinks.add(l.href);
      ok(l.target === "_blank" && l.rel.includes("noopener"), `${route}: external link not opening safely → ${l.raw}`);
    }
  }

  // Scroll through so lazy images load, then check for any failures.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(500);
  ok(consoleErrors.length === 0, `${route}: console errors: ${consoleErrors.join(" | ")}`);
  ok(failedRequests.length === 0, `${route}: failed requests: ${failedRequests.join(", ")}`);

  // Accessibility (WCAG 2.x A/AA) with axe-core.
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    await new Promise((r) => setTimeout(r, 1200));
    const r = await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] });
    return r.violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.length} node(s) — ${v.nodes[0]?.target.join(" ")}`);
  });
  for (const v of axe) {
    if (/^(critical|serious)/.test(v)) ok(false, `${route}: axe ${v}`);
    else warn(`${route}: axe ${v}`);
  }
  if (!axe.length) results.pass++;
  await page.close();

  // Horizontal overflow at common widths.
  for (const width of [320, 390, 768, 1024, 1440]) {
    const p = await browser.newPage({ viewport: { width, height: 800 }, isMobile: width < 768, hasTouch: width < 768 });
    await p.goto(BASE + route, { waitUntil: "networkidle" });
    const overflow = await p.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > docW + 1 || r.left < -1) && !el.closest("[aria-hidden=true], .pointer-events-none, dialog");
        })
        .slice(0, 3)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
      return { scroll: document.documentElement.scrollWidth > docW || window.innerWidth > docW + 1, offenders };
    });
    ok(!overflow.scroll && overflow.offenders.length === 0, `${route} @${width}px: horizontal overflow ${overflow.offenders.join(", ")}`);
    await p.close();
  }
  process.stdout.write(".");
}
console.log("");

// ---------------------------------------------------------------- internal links
for (const href of internalLinks) {
  const r = await fetch(href, { redirect: "manual" });
  ok(r.status === 200, `internal link ${href} → ${r.status}`);
}
console.log(`Checked ${internalLinks.size} internal links.`);

// ---------------------------------------------------------------- 404 handling
{
  const r = await fetch(`${BASE}/this-page-does-not-exist/`);
  ok(r.status === 404 && (await r.text()).includes("wrong turn"), "custom 404 page served");
}

// ---------------------------------------------------------------- external links
if (!skipExternal) {
  for (const href of externalLinks) {
    try {
      const r = await fetch(href, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (QA link check)" } });
      if (r.status >= 400) {
        // Instagram and some hosts reject automated requests; record as a warning to verify manually.
        if (/instagram\.com/.test(href)) warn(`external ${href} → ${r.status} (bot-blocked; verify manually)`);
        else ok(false, `external link ${href} → ${r.status}`);
      } else results.pass++;
    } catch (e) {
      warn(`external ${href} → ${e.message}`);
    }
  }
  console.log(`Checked ${externalLinks.size} external links.`);
}

// ---------------------------------------------------------------- no-JS rendering
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "load" });
  const hidden = await p.evaluate(
    () => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0").length,
  );
  ok(hidden === 0, `no-JS: ${hidden} reveal elements stay hidden`);
  await ctx.close();
}

// ---------------------------------------------------------------- reduced motion
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await p.evaluate(
    () => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0").length,
  );
  ok(hidden === 0, `reduced motion: ${hidden} reveal elements hidden`);
  await ctx.close();
}

// ---------------------------------------------------------------- mobile menu
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Open menu" }).click();
  ok(await p.locator("dialog[open]").isVisible(), "mobile menu opens");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Close menu"), "mobile menu focuses close button");
  await p.keyboard.press("Escape");
  ok(!(await p.locator("dialog[open]").count()), "mobile menu closes on Escape");
  await p.getByRole("button", { name: "Open menu" }).click();
  await p.locator("dialog").getByRole("link", { name: /^Services/ }).click();
  await p.waitForURL(/\/services\/$/);
  ok(!(await p.locator("dialog[open]").count()), "mobile menu closes after navigation");
  await p.close();
}

// ---------------------------------------------------------------- keyboard: skip link
{
  const p = await browser.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.keyboard.press("Tab");
  ok((await p.evaluate(() => document.activeElement?.textContent)) === "Skip to content", "skip link is first focusable");
  await p.close();
}

// ---------------------------------------------------------------- enquiry form
async function fillValid(p) {
  await p.getByLabel("Full name").fill("Test Customer");
  await p.getByLabel("Business name").fill("Test Shop");
  await p.getByLabel("Email address").fill("test@example.com");
  await p.getByLabel("WhatsApp / phone number").fill("+91 98765 43210");
  await p.getByLabel("Business industry").selectOption({ index: 1 });
  await p.getByLabel("Required service").selectOption("business-website-development");
  await p.getByLabel("Project description").fill("We need a new website for our shop with a product gallery and contact options.");
  await p.getByLabel("Estimated budget").selectOption({ index: 1 });
  await p.getByLabel("Expected timeline").selectOption({ index: 1 });
  await p.getByLabel("Reference website").fill("example.com");
  await p.getByRole("checkbox").check();
}

{
  const ctx = await browser.newContext();
  const p = await ctx.newPage();
  await p.goto(BASE + "/contact/?service=ecommerce-website-development", { waitUntil: "networkidle" });
  ok((await p.getByLabel("Required service").inputValue()) === "ecommerce-website-development", "form: ?service= preselects service");

  // Empty submit → error summary, focused, with links.
  await p.getByRole("button", { name: /send/i }).click();
  const summary = p.locator('[role="alert"]').first();
  ok(await summary.isVisible(), "form: error summary on empty submit");
  ok(await p.evaluate(() => document.activeElement?.getAttribute("role") === "alert"), "form: error summary receives focus");
  ok((await p.locator('[aria-invalid="true"]').count()) >= 3, "form: invalid fields flagged with aria-invalid");

  // Invalid formats.
  await p.getByLabel("Email address").fill("not-an-email");
  await p.getByLabel("WhatsApp / phone number").fill("12");
  await p.getByLabel("Reference website").fill("not a url");
  ok(await p.getByText("valid email address", { exact: false }).first().isVisible(), "form: email format validated");
  ok(await p.getByText("valid phone number", { exact: false }).first().isVisible(), "form: phone format validated");
  ok(await p.getByText("valid website address", { exact: false }).first().isVisible(), "form: reference URL validated");

  await fillValid(p);
  await p.waitForTimeout(2600);

  if (!formConfigured) {
    const popup = ctx.waitForEvent("page");
    await p.getByRole("button", { name: /send via whatsapp/i }).click();
    const wa = await popup;
    await wa.waitForURL(/wa\.me|whatsapp/, { timeout: 15000 }).catch(() => {});
    ok(await p.getByText("send it on WhatsApp", { exact: false }).isVisible(), "form (unconfigured): WhatsApp fallback state shown");
    ok(/wa\.me|whatsapp/.test(wa.url()) && /Test(%20|\+)Customer/.test(wa.url()), `form (unconfigured): WhatsApp opened with enquiry (${wa.url().slice(0, 80)})`);
  } else {
    // Mock Web3Forms: first a failure, then success.
    let calls = 0;
    let lastBody = null;
    await ctx.route("https://api.web3forms.com/submit", async (route) => {
      calls++;
      lastBody = JSON.parse(route.request().postData() ?? "{}");
      await new Promise((r) => setTimeout(r, 400));
      if (calls === 1) return route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ success: false, message: "Server error" }) });
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
    });
    await p.getByRole("button", { name: /send enquiry/i }).click();
    ok(await p.getByRole("button", { name: /sending/i }).isDisabled(), "form: loading state disables submit");
    await p.getByText("couldn’t be sent", { exact: false }).waitFor();
    ok(true, "form: server error message shown");
    await p.getByRole("button", { name: /send enquiry/i }).click();
    await p.getByText("Your enquiry has been sent", { exact: false }).waitFor();
    ok(calls === 2, `form: exactly one request per submit (got ${calls})`);
    ok(lastBody?.Email === "test@example.com" && lastBody?.botcheck === "" && lastBody?.replyto === "test@example.com", "form: payload contents");
    ok(await p.getByRole("link", { name: /continue on whatsapp/i }).isVisible(), "form: success offers WhatsApp continuation");

    // Duplicate protection.
    await p.getByRole("button", { name: /send another/i }).click();
    await fillValid(p);
    await p.waitForTimeout(2600);
    await p.getByRole("button", { name: /send enquiry/i }).click();
    ok(await p.getByText("already sent this enquiry", { exact: false }).isVisible(), "form: duplicate submission blocked");
    ok(calls === 2, "form: duplicate did not hit the network");

    // Honeypot: bots filling the hidden field never reach the network.
    const p2 = await ctx.newPage();
    await p2.goto(BASE + "/contact/", { waitUntil: "networkidle" });
    await fillValid(p2);
    await p2.getByLabel("Project description").fill("A different description so this is not a duplicate enquiry.");
    await p2.locator('input[name="botcheck"]').fill("spam", { force: true });
    await p2.waitForTimeout(2600);
    await p2.getByRole("button", { name: /send enquiry/i }).click();
    await p2.waitForTimeout(600);
    ok(calls === 2, "form: honeypot submission not sent");

    // Time trap.
    const p3 = await ctx.newPage();
    await p3.goto(BASE + "/contact/", { waitUntil: "networkidle" });
    await fillValid(p3);
    await p3.getByLabel("Project description").fill("Yet another description to test the time trap behaviour.");
    await p3.getByRole("button", { name: /send enquiry/i }).click();
    ok(await p3.getByText("very quick", { exact: false }).isVisible(), "form: too-fast submission caught");
    ok(calls === 2, "form: too-fast submission not sent");
  }
  await ctx.close();
}

await browser.close();

console.log(`\nPASS ${results.pass}   FAIL ${results.fail}   WARN ${results.warn}`);
if (warnings.length) console.log("\nWarnings:\n  " + warnings.join("\n  "));
if (failures.length) {
  console.log("\nFailures:\n  " + failures.join("\n  "));
  process.exit(1);
}
