# URRT Design System

**Version 1.0** · UIU Rescue Rover Team · October 2026

---

## 1. Art direction

### The idea

**An engineering dossier, opened on a workbench.**

The site should read like documentation a serious lab produced about its own work — not like a product landing page. That single decision drives everything: serif headlines that carry editorial weight, monospaced labels that behave like annotations on a drawing, hairline rules instead of floating cards, and photography that is presented as *evidence* rather than decoration.

Two constraints shaped it:

1. **The subject is hardware.** A rescue rover is a dense, legible, repairable machine. The interface should share those values — visible structure, nothing hidden behind gloss.
2. **The team is real and small.** Fifteen students, two prototypes, one lab. Inflated marketing language would be immediately visible to any sponsor or competition judge. Restraint reads as confidence.

### What this is deliberately not

- No gradient meshes, glow, or glass. Zero blur filters.
- No purple/blue. No neon.
- No rounded-card grid applied uniformly to unrelated content.
- No decorative floating shapes, orbs, or particle fields.
- No scroll-jacking, no reveal-on-every-element.
- No invented statistics, dashboards, or counters.
- No stock photography. Every image on this site is the team's own.

---

## 2. Colour

The accent is not chosen from a trend palette. It was **sampled from the rover itself** — the orange track pads on AEGIS — by averaging the saturated warm pixels in `t1.webp`. The result, `#D36823`, is the team's own hardware colour.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F4F1EB` | Page ground. Warm bone, not white. |
| `--paper-2` | `#EAE5DB` | Alternating band / inset panel. |
| `--paper-3` | `#DED8CB` | Deepest ground, image placeholders. |
| `--ink` | `#14130F` | Primary text. 16.8:1 on paper. |
| `--ink-2` | `#35322B` | Secondary text. |
| `--ink-3` | `#6B675C` | Captions, metadata. 4.9:1 on paper. |
| `--rule` | `#CDC6B8` | Hairlines, dividers, table borders. |
| `--signal` | `#D36823` | Sampled accent. Fills, rules, large type only. 3.2:1 — **never body text**. |
| `--signal-ink` | `#9A3A12` | Accent for text and links. 6.2:1. |
| `--signal-wash` | `#F6E9DE` | Accent tint for callouts. |
| `--steel` | `#4A5248` | Diagram secondary, technical annotation. |
| `--ok` | `#3F6B4A` | Status: verified / open. |
| `--warn` | `#8A6410` | Status: unverified / pending. |

### Rules

- Body copy is always `--ink` or `--ink-2`. Never `--signal`.
- `--signal` is permitted for: rules ≥2px, filled chips, numerals ≥24px, icon strokes.
- No colour is used decoratively. If a colour does not encode state or draw attention to a real element, it is removed.
- Contrast is verified in `docs/qa-report.md`, not assumed.

---

## 3. Typography

Three faces, three jobs. No more.

| Face | Role | Weights |
|---|---|---|
| **Instrument Serif** | Display headlines, pull quotes, project names | 400, 400 italic |
| **Archivo** | Body copy, UI labels, navigation, buttons | 400, 500, 600 |
| **IBM Plex Mono** | Section indices, specs, captions, timestamps, technical annotation | 400, 500 |

Instrument Serif is the decision that separates this from a template. It is a high-contrast editorial face with real personality at large sizes, and it lends the site the register of a research report rather than a startup. Archivo keeps long-form text neutral and legible. Plex Mono carries the engineering annotation layer.

### Scale

Fluid, `clamp()`-based. Ratios tighten as type grows.

| Token | Size | Use |
|---|---|---|
| `--t-display` | `clamp(3.2rem, 8.5vw, 7.5rem)` | Hero only |
| `--t-h1` | `clamp(2.4rem, 5.2vw, 4.2rem)` | Page titles |
| `--t-h2` | `clamp(1.9rem, 3.4vw, 2.9rem)` | Section headlines |
| `--t-h3` | `clamp(1.35rem, 2vw, 1.75rem)` | Sub-heads, project names |
| `--t-lead` | `clamp(1.15rem, 1.7vw, 1.4rem)` | Standfirst / intro |
| `--t-body` | `1.0625rem` (17px) | Body copy |
| `--t-small` | `0.9375rem` (15px) | Secondary |
| `--t-mono` | `0.75rem` (12px) | Labels, uppercase, +0.08em tracking |

### Rules

- Display and h1/h2 use Instrument Serif, `line-height: 0.98–1.06`, `letter-spacing: -0.015em`.
- Body: Archivo, `line-height: 1.62`, max `68ch`.
- Mono labels are **uppercase with 0.08em tracking** — the only place uppercase is allowed, and never for sentences.
- No letter-spacing on serif headlines beyond the negative tracking above.
- One weight jump per hierarchy level. No faux-bold.

---

## 4. Layout

### Grid

12 columns, `--gutter: clamp(1.25rem, 4vw, 3.5rem)`, max content width `1320px`.

Editorial asymmetry is the default, not the exception:

- **Full-bleed photography** breaks the grid edge-to-edge.
- **Text measures** stay 6–7 columns wide even inside a 12-column band.
- **Offset columns** — an image in cols 1–7, caption in col 9 — create tension without decoration.
- **Symmetric grids only for genuinely comparable items** (team roster, partner logos).

### Rhythm

Section spacing `clamp(5rem, 11vw, 9rem)` vertical. A hairline rule and a mono index label (`01 —`) open each major section. This numbering is the through-line that makes the homepage read as a document with chapters.

### Cards

Cards are used for exactly two things: **team members** and **partner logos**. Everything else — projects, research areas, milestones, subsystem detail — uses rules, whitespace, and typographic hierarchy. No `border-radius` above `2px` anywhere. No drop shadows.

---

## 5. Components

| Component | Spec |
|---|---|
| **Rule** | `1px solid var(--rule)`. Section-opening rule spans full content width. |
| **SectionIndex** | Mono, `--t-mono`, `--ink-3`, format `01 —`. Paired with serif headline. |
| **SpecTable** | Two-column definition list. `--rule` bottom border per row. Mono key, Archivo value. No zebra striping. |
| **SubsystemExplorer** | SVG rover schematic + hotspot buttons. Tablist semantics, arrow-key nav, `aria-selected`. Detail panel swaps text, never layout. |
| **Timeline** | Vertical rail, `1px` rule, mono dates, serif titles. Two entries only (X1, AEGIS) — honest about how young the programme is. |
| **Gallery** | CSS grid, mixed aspect ratios. Click opens lightbox with focus trap, Esc to close, arrow keys to navigate. |
| **Figure** | Image + mono caption + optional credit. Caption always present. |
| **StatusChip** | Mono uppercase, 1px border, semantic colour. Used for verified / unverified / open / closed. |
| **Form** | Native inputs, 1px `--rule` border, `--ink` text, focus ring `2px --signal`. No floating labels. Composes a `mailto:` — see §7. |

---

## 6. Motion

Motion is used to explain, not to decorate.

- **Permitted:** hotspot panel cross-fade (120ms), nav open/close (180ms), lightbox fade (160ms), focus ring transition (100ms).
- **Forbidden:** scroll-triggered reveals on sections, parallax, counters, marquees, autoplay carousels.
- All transitions sit inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion, everything resolves instantly to its end state.
- No element may animate on page load except the hero image's single 600ms opacity fade.

---

## 7. Forms and honesty

The original site's forms had no `action` and no `method` — they displayed "MESSAGE TRANSMITTED" while sending nothing. **This design system forbids that pattern.**

Forms here compose a `mailto:` URI and hand off to the user's mail client. The interface says so plainly: *"This opens your email app with the message pre-filled."* No simulated success. No fake progress. If a real endpoint is added later, the component swaps to a `fetch` and the copy changes — the honest state is the default, not the fallback.

---

## 8. Accessibility contract

Non-negotiable, checked in QA:

- Body contrast ≥ 4.5:1; large text and UI boundaries ≥ 3:1.
- Visible focus on every interactive element: `2px solid var(--signal-ink)`, `outline-offset: 2px`.
- Full keyboard operability, including the subsystem tablist (arrow keys), gallery (arrows + Esc), and mobile nav (Esc closes, focus returns to trigger).
- One `<h1>` per page; no skipped heading levels.
- Skip-to-content link as the first focusable element.
- Every image has descriptive `alt`; decorative images use `alt=""`.
- `prefers-reduced-motion` respected globally.
- Landmarks: `header`, `nav`, `main`, `footer` with accessible names.

---

## 9. Content rules

- Every factual claim in the UI is traceable to `content-audit/` or is marked as newly written editorial copy.
- Competition capability is described as **design intent**, never as demonstrated field performance.
- Where a fact is unverified, the UI either omits it or shows a `StatusChip` reading *Unverified* — it is never smoothed into confident prose.
- No superlatives without a source. "Bangladesh's first RoboCup Rescue team" was removed: it is not supported.
