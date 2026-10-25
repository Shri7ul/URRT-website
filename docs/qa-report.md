# QA Report

**Build:** URRT website v1.0
**Date:** 25 October 2026
**Environment:** Windows 11, Node 22.22.2, Next.js 15.5.28, Chromium 156 (Playwright 1.64.1)

Every result below was produced by running the command shown. Nothing in this report is projected
or assumed.

---

## 1. Build, types, lint

| Check | Command | Result |
|---|---|---|
| Production build | `npx next build` | **Pass** — compiled, type-checked, exported 15 routes + 404 |
| Type check | `npx tsc --noEmit` | **Pass** — 0 errors, strict mode |
| Lint | `npx eslint .` | **Pass** — 0 errors, 0 warnings |

Lint scope was narrowed to `app/`, `components/`, `data/`, `lib/` and config files. Vendored skill
scripts in `.agents/`, `.claude/` and `.codebuddy/` are excluded — they are third-party code and
were producing 332 spurious diagnostics.

### Bundle output

| Route | Size | First Load JS |
|---|---|---|
| `/` | 1.44 kB | 108 kB |
| `/projects/[slug]` (×2) | 2.4 kB | 109 kB |
| all other pages | ≤ 1.15 kB | 103–108 kB |
| shared by all | — | 103 kB |

`out/` total: **6.7 MB** — 4.8 MB images, 1.2 MB JS/CSS, 15 HTML files.

---

## 2. Automated browser QA

`node scripts/qa.mjs <baseUrl>` — 123 assertions.

| Target | Result |
|---|---|
| Dev server (`localhost:3210`) | **123 / 123 passed** |
| Static export (`out/` on `localhost:3211`) | **123 / 123 passed** |

### Coverage

**Per route** (14 routes + a deliberate 404):

- responds with the expected status (200, or 404 for the missing route)
- exactly one `<h1>`
- `<title>` present and non-trivial
- `<meta name="description">` present, > 40 characters
- zero `<img>` elements without an `alt` attribute
- zero images that failed to decode
- zero console errors

**Keyboard interaction:**

- tablist exposes 3 tabs
- `ArrowRight` moves selection
- `End` jumps to the last tab
- `ArrowRight` wraps from last to first
- tabpanel's `aria-labelledby` matches the active tab id

**Gallery lightbox:**

- opens on click
- focus moves to the close button
- `ArrowRight` advances (counter 01 → 02)
- `Escape` closes
- focus returns to the trigger of the image that was open

**Mobile (390 × 844):**

- menu button visible
- menu opens, `aria-expanded="true"`
- button label switches to "Close"
- `Escape` closes the menu
- no horizontal overflow (0 px)

**Reduced motion:** with `prefers-reduced-motion: reduce`, computed transition and animation
durations collapse to `1e-05s`.

---

## 3. Contrast (measured, not estimated)

Ratios computed from resolved computed styles in the browser, walking up for the effective
background.

| Pair | Ratio | Required | Result |
|---|---|---|---|
| Body text on paper | 11.34:1 | 4.5 | Pass |
| Navigation link on paper | 11.34:1 | 4.5 | Pass |
| Section note (`--ink-3`) | 5.01:1 | 4.5 | Pass |
| Mono label (`--ink-3`) | 5.01:1 | 4.5 | Pass |
| Accent link (`--signal-ink`) | 6.23:1 | 4.5 | Pass |

The sampled accent `--signal` (#D36823) is **3.22:1** on paper and is therefore restricted to
non-text use — rules, fills, large numerals. All accent *text* uses `--signal-ink` (#9A3A12).

---

## 4. Link and asset integrity

| Check | Result |
|---|---|
| Unique internal references across all exported HTML | 71 |
| References resolving to a file | **71 / 71** |
| Generated image files validated with `sharp` | 52 files, **0 invalid** |
| Images with zero bytes | 0 |
| Broken `<img>` after full scroll | 0 |

One apparent failure in the automated sweep — `/_next/static/chunks/app/projects/%5Bslug%5D/page-*.js` —
was a false positive: the path is percent-encoded and the file exists on disk at
`out/_next/static/chunks/app/projects/[slug]/`.

---

## 5. SEO and metadata

| Item | Result |
|---|---|
| Unique `<title>` per page | Yes — template `%s — URRT` |
| `<meta name="description">` | All 14 routes, 45–160 chars |
| Canonical URLs | All 14 routes |
| Open Graph + Twitter card | Global, with a real image |
| `sitemap.xml` | Generated — 14 URLs |
| `robots.txt` | Generated — allows all, references sitemap |
| JSON-LD structured data | **Not implemented** — see §8 |
| Semantic heading order | One `h1` per page, no skipped levels |
| Custom 404 | `out/404.html`, verified to contain recovery links |

The old site had **no** robots.txt, **no** sitemap, descriptions on 2 of 11 pages, and no canonical
or Open Graph tags at all.

---

## 6. Image optimisation

`npm run optimize-images` — measured:

| | Before | After | Change |
|---|---|---|---|
| 52 images | 20.9 MB | 4.6 MB | **−78%** |

Largest single win: `tshirt.png` 4.0 MB → WebP. All originals retained in
`content-audit/raw/images/`.

---

## 7. Implemented interactions

| Interaction | Where | Keyboard | Notes |
|---|---|---|---|
| Subsystem explorer | Home, both project pages | Tablist: arrows, Home, End, roving tabindex | 3 hotspots, panel swap without layout shift |
| Prototype gallery + lightbox | Project detail pages | Enter/Space opens, ← → navigate, Esc closes, focus trapped and restored | Scroll locked while open |
| Research workflow | Home, Research | Static, no JS | Six stages |
| Milestone timeline | Home, Journey | Static | Unverified entries marked with a chip |
| Mobile navigation | All pages | Esc closes, focus returns to trigger | `aria-expanded`, `aria-controls` |
| FAQ accordions | Contact | Native `<details>` | No JavaScript |
| Mailto forms | Join, Contact | Full keyboard, native validation | Composes a `mailto:` — see §8 |
| Maps embed | Contact | Lazy iframe with `title` | `youtube-nocookie` used for the video embed |

No scroll-triggered animation, parallax, carousel, marquee or counter exists anywhere on the site.

---

## 8. Known limitations — not verified

Stated plainly, because the brief asks for measured claims rather than assurances:

1. **No Lighthouse / Core Web Vitals run.** Performance was not measured with Lighthouse or field
   data. What is known: 108 kB first-load JS, 4.6 MB of images across the whole site, no web fonts
   requested from third parties, no render-blocking scripts. A Lighthouse run on a throttled mobile
   profile is the recommended next step before launch.
2. **Single browser engine.** All browser testing was Chromium. Firefox and Safari were not
   exercised. The CSS uses `color-mix()` and `text-wrap: balance`, both broadly supported but not
   verified here; `color-mix()` degrades to the fallback background on older engines.
3. **No screen-reader session.** Accessibility was verified structurally (roles, names, focus
   order, contrast, keyboard operation) and by automated assertions — not with NVDA, JAWS or
   VoiceOver.
4. **No physical device testing.** Mobile layout verified at 390×844 in an emulated viewport only.
5. **No JSON-LD.** `Organization`/`EducationalOrganization` markup was considered and skipped:
   the site cannot supply the fields accurately (no verified founding date beyond "September 2024",
   no verified logo file in vector format). Publishing partial structured data would risk
   misrepresenting the organisation. It is a safe addition once those facts are confirmed.
6. **Forms have no backend.** They compose a `mailto:` and say so in the UI. A real endpoint
   (Formspree, a university form service, or a serverless function) would be better; the copy and
   component are structured so that swapping in a `fetch` is a small change.
7. **404 depends on host configuration.** The export includes `404.html`, but a plain
   `python -m http.server` serves its own 404 body. Apache needs `ErrorDocument 404 /404.html`;
   GitHub Pages and Netlify honour it automatically.
8. **The maps iframe is a third-party request.** It loads only on `/contact` and only when scrolled
   into view, but it does contact Google. If cookie consent is a requirement, replace it with a
   static map image and an outbound link.

---

## 9. Reproducing these results

```bash
npm install
npm run typecheck
npm run lint
npm run build

# serve the export and test the real artefact
cd out && python -m http.server 3211 &
node scripts/qa.mjs http://localhost:3211
```
