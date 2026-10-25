/**
 * Automated QA against a running instance.
 *
 *   node scripts/qa.mjs [baseUrl]
 *
 * Checks: route status, console errors, heading structure, image alt text,
 * metadata, keyboard operation of the subsystem tablist, gallery lightbox
 * focus handling, mobile navigation, and text contrast for key pairs.
 */
import { readFile } from "node:fs/promises";

import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3210";

const ROUTES = [
  "/",
  "/about",
  "/projects",
  "/projects/aegis",
  "/projects/zugbee-x1",
  "/research",
  "/team",
  "/journey",
  "/join",
  "/partners",
  "/contact",
  "/brand-assets",
  "/webmasters",
  "/gear",
  "/this-page-does-not-exist",
];

const results = [];
const record = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

function contrastRatio(rgb1, rgb2) {
  const lum = ([r, g, b]) => {
    const f = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const l1 = lum(rgb1);
  const l2 = lum(rgb2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const browser = await chromium.launch();

/* -------------------------------------------------------------------------- */
/*  Per-route structural checks                                               */
/* -------------------------------------------------------------------------- */

const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

for (const route of ROUTES) {
  const expected = route === "/this-page-does-not-exist" ? 404 : 200;
  const errors = [];
  const onConsole = (msg) => {
    // A 404 route legitimately logs a failed-resource error; that is the point.
    if (msg.type() === "error" && !(expected === 404 && /Failed to load resource/.test(msg.text()))) {
      errors.push(msg.text());
    }
  };
  page.on("console", onConsole);

  const res = await page.goto(BASE + route, { waitUntil: "networkidle" });

  if (route === "/this-page-does-not-exist") {
    record(`404 handling ${route}`, res?.status() === 404, `status ${res?.status()}`);
    const body = await page.textContent("body");
    let ok = /not on the map/i.test(body ?? "");
    let note = "";
    if (!ok) {
      // Plain static servers (e.g. python http.server) return their own 404 body
      // instead of out/404.html. Fall back to inspecting the exported file.
      try {
        const html = await readFile(new URL("../out/404.html", import.meta.url), "utf8");
        ok = /not on the map/i.test(html);
        note = ok ? "verified via out/404.html (server does not serve custom 404)" : "";
      } catch {
        note = "out/404.html not found";
      }
    }
    record("404 page shows recovery links", ok, note);
  } else {
    record(`route ${route} responds 200`, res?.status() === 200, `status ${res?.status()}`);

    const h1s = await page.$$eval("h1", (els) => els.map((e) => e.textContent?.trim() ?? ""));
    record(`single h1 on ${route}`, h1s.length === 1, `found ${h1s.length}`);

    const title = await page.title();
    record(`title on ${route}`, title.length > 10, `"${title}"`);

    const desc = await page.getAttribute('meta[name="description"]', "content");
    record(`meta description on ${route}`, Boolean(desc && desc.length > 40), `${desc?.length ?? 0} chars`);

    const imgsMissingAlt = await page.$$eval("img", (els) =>
      els.filter((e) => e.getAttribute("alt") === null).length,
    );
    record(`img alt attributes on ${route}`, imgsMissingAlt === 0, `${imgsMissingAlt} missing`);

    const brokenImgs = await page.$$eval("img", (els) =>
      els.filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.currentSrc || e.src),
    );
    record(`images load on ${route}`, brokenImgs.length === 0, brokenImgs.join(", "));
  }

  record(`no console errors on ${route}`, errors.length === 0, errors.slice(0, 2).join(" | "));
  page.off("console", onConsole);
}

/* -------------------------------------------------------------------------- */
/*  Keyboard: subsystem tablist                                               */
/* -------------------------------------------------------------------------- */

await page.goto(BASE + "/projects/aegis", { waitUntil: "networkidle" });
const tabs = page.getByRole("tab");
record("tablist exposes 3 tabs", (await tabs.count()) === 3, `${await tabs.count()} tabs`);

await tabs.nth(0).focus();
await page.keyboard.press("ArrowRight");
let selected = await tabs.nth(1).getAttribute("aria-selected");
record("ArrowRight moves tab selection", selected === "true");

await page.keyboard.press("End");
selected = await tabs.nth(2).getAttribute("aria-selected");
record("End jumps to last tab", selected === "true");

await page.keyboard.press("ArrowRight");
selected = await tabs.nth(0).getAttribute("aria-selected");
record("ArrowRight wraps to first tab", selected === "true");

const panelLabelled = await page.getAttribute('[role="tabpanel"]', "aria-labelledby");
const firstTabId = await tabs.nth(0).getAttribute("id");
record("tabpanel labelled by active tab", panelLabelled === firstTabId);

/* -------------------------------------------------------------------------- */
/*  Gallery lightbox                                                          */
/* -------------------------------------------------------------------------- */

await page.getByRole("button", { name: /Open image 1 of/i }).click();
await page.waitForTimeout(150);
record("lightbox opens", await page.getByRole("dialog").isVisible());

const dialogFocused = await page.evaluate(() => {
  const btn = document.querySelector(".lightbox__close");
  return document.activeElement === btn;
});
record("focus moves into lightbox", dialogFocused);

await page.keyboard.press("ArrowRight");
const counter = await page.textContent(".lightbox__count");
record("arrow key advances image", counter?.trim().startsWith("02") ?? false, counter ?? "");

await page.keyboard.press("Escape");
await page.waitForTimeout(150);
record("Escape closes lightbox", (await page.getByRole("dialog").count()) === 0);

const focusReturned = await page.evaluate(() => {
  const el = document.activeElement;
  // Focus should return to the trigger for the image that was open (index 2).
  return el?.getAttribute("aria-label")?.includes("Open image 2 of") ?? false;
});
record("focus returns to the active gallery trigger", focusReturned);

/* -------------------------------------------------------------------------- */
/*  Mobile navigation                                                         */
/* -------------------------------------------------------------------------- */

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(BASE + "/", { waitUntil: "networkidle" });

const toggle = mobile.locator(".nav-toggle");
record("mobile menu button visible", await toggle.isVisible());

await toggle.click();
await mobile.waitForTimeout(120);
record("mobile menu opens", (await mobile.getByRole("navigation", { name: "Mobile" }).count()) === 1);
record("menu button reports expanded", (await toggle.getAttribute("aria-expanded")) === "true");
record("menu button label switches to Close", /close/i.test((await toggle.textContent()) ?? ""));

await mobile.keyboard.press("Escape");
await mobile.waitForTimeout(150);
record("Escape closes mobile menu", (await mobile.getByRole("navigation", { name: "Mobile" }).count()) === 0);

const overflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
record("no horizontal overflow at 390px", overflow <= 1, `${overflow}px overflow`);

/* -------------------------------------------------------------------------- */
/*  Contrast                                                                  */
/* -------------------------------------------------------------------------- */

await page.goto(BASE + "/", { waitUntil: "networkidle" });

const pairs = [
  ["body text on paper", "p.body-2", null],
  ["nav link on paper", ".nav-link", null],
  ["section note", ".section-head__note", null],
  ["mono label", ".mono", null],
  ["accent link", ".link", null],
];

for (const [label, selector] of pairs) {
  const data = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;

    // getComputedStyle may return "rgb(r, g, b)", "rgba(...)" or "color(srgb r g b)"
    // (the latter from color-mix). Normalise all of them to 0-255 triplets.
    const toRgb = (c) => {
      if (!c) return null;
      const m = c.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
      if (m) return [1, 2, 3].map((i) => Math.round(parseFloat(m[i]) * 255));
      const nums = c.match(/[\d.]+/g);
      if (!nums || nums.length < 3) return null;
      const [r, g, b] = nums.slice(0, 3).map(Number);
      const alpha = nums.length >= 4 ? Number(nums[3]) : 1;
      return alpha === 0 ? null : [r, g, b];
    };

    const fg = toRgb(getComputedStyle(el).color);

    let bgEl = el;
    let bg = null;
    while (bgEl && !bg) {
      bg = toRgb(getComputedStyle(bgEl).backgroundColor);
      bgEl = bgEl.parentElement;
    }
    return { fg, bg: bg ?? [244, 241, 235] };
  }, selector);

  if (!data) {
    record(`contrast: ${label}`, false, "element not found");
    continue;
  }
  const ratio = contrastRatio(data.fg, data.bg);
  const size = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? parseFloat(getComputedStyle(el).fontSize) : 16;
  }, selector);
  const large = size >= 24;
  const min = large ? 3 : 4.5;
  record(`contrast: ${label}`, ratio >= min, `${ratio.toFixed(2)}:1 (min ${min})`);
}

/* -------------------------------------------------------------------------- */
/*  Reduced motion                                                            */
/* -------------------------------------------------------------------------- */

const rm = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
await rm.goto(BASE + "/", { waitUntil: "networkidle" });
const durations = await rm.evaluate(() => {
  const el = document.querySelector(".btn");
  if (!el) return null;
  const s = getComputedStyle(el);
  return { transition: s.transitionDuration, animation: s.animationDuration };
});
record(
  "reduced motion collapses transitions",
  durations !== null && (durations.transition === "0.00001s" || parseFloat(durations.transition) < 0.001),
  JSON.stringify(durations),
);

await browser.close();

/* -------------------------------------------------------------------------- */

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log("\nFailures:");
  for (const f of failed) console.log(`  - ${f.name} ${f.detail}`);
  process.exit(1);
}
