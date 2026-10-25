# UIU Rescue Rover Team — website

The official site of the UIU Rescue Rover Team (URRT), United International University, Dhaka.

Rebuilt from the ground up in October 2026 after a full content audit of the previous site at
`rescuerover.uiu.ac.bd`. The audit found that the old site attributed another team's competition
awards to URRT, carried two contradictory recruitment deadlines, listed three different phone
numbers, and shipped five forms that displayed "message sent" while sending nothing. All of that is
documented in [`content-audit/`](content-audit/) and corrected here.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, strict |
| Styling | Hand-authored CSS with custom-property design tokens — no utility framework |
| Fonts | Instrument Serif, Archivo, IBM Plex Mono — self-hosted via `next/font` |
| Images | WebP derivatives generated at build time with `sharp` |
| Output | **Static export** (`output: "export"`) — no Node server required |
| JavaScript | ~108 kB first load; three interactive components only |

There is no database, no CMS, no authentication and no API. Content lives in typed TypeScript
files under [`data/`](data/).

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Requires Node 20+.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Type-check, lint, and export the static site to `out/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run optimize-images` | Regenerate `public/media/` from the archived originals |
| `node scripts/qa.mjs <url>` | Automated browser QA against a running instance |

---

## Project structure

```
app/                    routes (one directory per page)
  layout.tsx            shell: fonts, metadata, header, footer
  page.tsx              homepage — the ten-section narrative
  projects/[slug]/      statically generated project detail pages
  sitemap.ts            generates /sitemap.xml
  robots.ts             generates /robots.txt
components/             header, footer, subsystem explorer, gallery, form, primitives
data/content.ts         ALL site content — the file you edit to change anything
lib/                    types, asset-path helper
public/media/           optimised WebP images (52 files, 4.6 MB)
scripts/                image pipeline + QA harness
content-audit/          source audit: inventories, factual issues, migration map
docs/                   design system, QA report, migration summary, content status
```

### Editing content

Everything user-visible comes from `data/content.ts`: contact details, team roster, advisors,
projects and their subsystems, milestones, partners, research areas, recruitment state. Edit that
file, not the JSX.

Each record carries a `source` and a `verification` field. `verification: "source-only"` means the
claim appears on the old site but was not independently confirmed — the UI surfaces this as a
*Team-stated only* chip rather than presenting it as fact. Do not remove those markers without
actually verifying the claim.

---

## Build and deploy

```bash
npm run build        # writes ./out
```

`out/` is a complete static site. Upload it to any web host.

### Existing host (rescuerover.uiu.ac.bd)

The old site is static HTML on Apache. Replace the document root with the contents of `out/`.
No server-side runtime is needed.

For the custom 404 page to work, add to `.htaccess`:

```apache
ErrorDocument 404 /404.html
```

### GitHub Pages

The repository has no `basePath` set by default, which suits a custom domain. For a **project**
site served from `https://<user>.github.io/URRT-website/`, build with:

```bash
NEXT_PUBLIC_BASE_PATH=/URRT-website npm run build
```

Then publish `out/` (for example with `gh-pages`, or by committing it to a `gh-pages` branch).
`trailingSlash: true` is enabled so directory-style URLs resolve correctly on Pages.

### Any static host

Netlify, Cloudflare Pages, Vercel, S3 + CloudFront: build command `npm run build`, publish
directory `out`.

---

## Images

The originals downloaded from the old site are kept unmodified in
`content-audit/raw/images/` for traceability. `npm run optimize-images` regenerates
`public/media/` from them:

- portraits → 640×800 cover, WebP q80
- logos → max 480 px, WebP q90 with alpha
- photography → max 1800 px, WebP q82

Result: 20.9 MB → 4.6 MB (78% smaller). If the team supplies new photographs, drop the originals
into `content-audit/raw/images/`, add the filename to the right set in
`scripts/optimize-images.mjs`, and re-run the script.

`next/image` is intentionally not used: the static export has no image optimiser at runtime, so
images are pre-optimised at build time and served with explicit `width`/`height`.

---

## Accessibility

Targeting WCAG 2.2 AA. Verified in `docs/qa-report.md`:

- Body text 11.34:1, captions 5.01:1, accent links 6.23:1 — all above AA thresholds.
- Every interactive component is keyboard operable, with visible focus rings.
- Subsystem explorer is a proper tablist (arrow keys, Home/End, roving tabindex).
- Gallery lightbox traps focus, closes on Escape, and restores focus to the trigger.
- `prefers-reduced-motion` collapses all transitions.
- Skip link is the first focusable element on every page.

---

## Documentation

| Document | Contents |
|---|---|
| [`docs/design-system.md`](docs/design-system.md) | Art direction, colour, type, layout, component specs, motion rules |
| [`docs/qa-report.md`](docs/qa-report.md) | Actual test results, interactions, known limitations |
| [`docs/migration-summary.md`](docs/migration-summary.md) | Page-by-page mapping from old site to new |
| [`docs/content-status.md`](docs/content-status.md) | Everything missing, unverified, or awaiting team input |
| [`content-audit/factual-issues.md`](content-audit/factual-issues.md) | Every factual defect found in the old site |

---

## Open items

The build is complete and deployable, but eight facts could not be verified from public sources and
are deliberately **not** published. They are listed in
[`docs/content-status.md`](docs/content-status.md). The most important:

1. URRT's own competition record (the old site showed another team's awards).
2. Whether URRT competed at RoboCup 2026.
3. The current recruitment deadline (two contradictory, expired dates were found).
4. Whether AEGIS has been field-tested.

Each is a data edit in `data/content.ts` once the team confirms the facts.
