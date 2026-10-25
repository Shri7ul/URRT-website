# Migration Summary — page by page

Old site: `https://rescuerover.uiu.ac.bd/` — 11 static HTML pages, ~4,900 words total.
New site: 14 routes, statically exported.

Status key: **Migrated** (content preserved) · **Rewritten** (meaning kept, words rebuilt) ·
**Corrected** (fact fixed) · **Withheld** (not published, reason given) · **Consolidated** ·
**Dropped** (no value or no evidence).

---

## Page inventory

| Old page | Title on old site | New route | Status |
|---|---|---|---|
| `index.html` | URRT - UIU Rescue Rover Team | `/` | Rewritten + parts withheld |
| `projects.html` | Rover Projects — URRT | `/projects`, `/projects/aegis`, `/projects/zugbee-x1` | Migrated, split into detail pages |
| `member.html` | Team Members - URRT | `/team` | Migrated |
| `Advisors.html` | Our Team - URRT | `/team` | Consolidated into `/team` |
| `Join.html` | Join US- URRT Quick Application | `/join` | Migrated, deadlines withheld |
| `contact.html` | Contact Us — URRT | `/contact` | Migrated + corrected |
| `sponsor.html` | Sponsors — URRT | `/partners` | Rewritten (tiers were empty) |
| `video.html` | URRT - Qualification Videos | `/journey` | Consolidated |
| `gears.html` | URRT Gear — Official Merchandise | `/gear` | Migrated, retail framing dropped |
| `Assets.html` | URRT — Brand Assets | `/brand-assets` | Migrated, counter fixed |
| `webmaster.html` | URRT - Webmasters | `/webmasters` | Migrated |

**New routes with no old equivalent:** `/about`, `/research`, `/journey` (as a full page),
`/404`.

**Old pages with no new equivalent:** none — every old URL has a destination.

---

## `index.html` → `/`

| Old content | Outcome |
|---|---|
| "WE INNOVATE AT THE RESCUE SCALE" + mission paragraph | Rewritten as the opening statement; the claim is preserved, the sloganeering is not |
| Vision section ("Building the next generation of rescue systems") | Rewritten into the Mission section |
| Research & development partners (SolidWorks, Protospace, Dassault, DFRobot) | → `/partners`, marked *team-stated* |
| Academic supporters (UIU, CAIR) | → `/partners` |
| Mission timeline (5 dated entries) | → `/journey`, dates preserved verbatim |
| "TARGETED GLOBAL ROBOTICS CHALLENGES — RoboCup Rescue" | Rewritten: the event is now in the past, participation unverified |
| **Achievements ×3 (BEAR Summit, ARC 2025, ARC 2023)** | **Withheld** — all three attributed to UIU Mars Rover Team in the body text |
| **Media coverage ×3 (Daily Star, Prothom Alo, Business Standard)** | **Withheld** — no source links; subject matter is UMRT's |
| Sponsor CTA | → `/partners`, rewritten without invented metrics |
| Contact block | → `/contact` |
| Placeholder video links (`v=abc123`, `v=123456`) | Dropped — never resolved |
| Hero imagery | Migrated; alt text rewritten |

The homepage is now a ten-section narrative rather than a stack of marketing sections:
problem → mission → platforms → anatomy → method → team → record → research → invitation.

---

## `projects.html` → `/projects/*`

| Old content | Outcome |
|---|---|
| AEGIS description | Migrated; `USAR)environments` typo fixed |
| AEGIS spec table (6 rows) | Migrated verbatim |
| AEGIS subsystems ×3 | Migrated and extended with design trade-offs derived from the stated specs |
| Zugbee X1 description | Migrated |
| **Zugbee X1 spec table ("Wheeled Rover", "4-Wheel Drive")** | **Corrected** — the photographs show a twin-track chassis. The page describes what is visible and notes the discrepancy |
| 7 gallery photographs | Migrated with new captions written from the images |

No payload, endurance, speed, runtime or stair-height figures were added. None exist in any public
source, and inventing them would undermine the rest of the site.

---

## `member.html` + `Advisors.html` → `/team`

- 15 members, names and sub-team assignments transcribed exactly.
- 3 advisors with roles, affiliations, research interests and institutional emails.
- No leadership titles invented. The roster does not name a captain; the page says so explicitly
  rather than promoting someone by guesswork.
- Portraits migrated, converted to WebP, displayed in greyscale with colour on hover.

---

## `Join.html` → `/join`

| Old content | Outcome |
|---|---|
| Recruitment intro and benefits | Rewritten |
| 6 sub-team requirement lists | Migrated verbatim |
| Eligibility, commitment, cycle | Migrated |
| **"Deadline: March 1, 2026"** | **Withheld** — conflicts with the same page's 2025 date |
| **"APPLICATION DEADLINE March 13, 2025"** | **Withheld** — expired |
| "RECRUITING NOW / APPLICATIONS OPEN NOW" | Replaced with a data-driven open/closed state, currently **closed** |
| Application form (no `action`) | Replaced with a working `mailto:` composer |

The page explains in one short panel why it shows "closed", and routes applicants to email.

---

## `contact.html` → `/contact`

| Old content | Outcome |
|---|---|
| Email, address, lab location | Migrated |
| **Phone** | **Corrected** to one canonical number (three variants existed) |
| **Hours** | **Corrected** to Sunday–Thursday 08:00–20:00 |
| Google Maps embed | Migrated, lazy-loaded, titled |
| 6 FAQ answers | Rewritten; the RoboCup answer corrected to past tense and unverified status |
| Contact form (no `action`) | Replaced with a working `mailto:` composer |

---

## `sponsor.html` → `/partners`

- Empty Platinum / Gold / Silver tiers → **dropped**. No sponsor was named in any tier.
- Partner logos → migrated with a *team-stated, not independently verified* chip.
- Partnership form → rewritten as a mailto composer; the budget-range selector was removed because
  it implied a published rate card that does not exist.
- New copy explains what sponsorship actually funds, with no audience or media-value estimates.

---

## `video.html` → `/journey`

- The qualification video (`youtube.com/embed/mp6F0gAOtGY`) is embedded on `/journey` as evidence
  that material was submitted for the 2026 cycle.
- The "28:59" duration badge was dropped — it contradicted the page's own "max 5 min" rule.
- The duplicated AEGIS description was dropped (identical text already existed on the projects page).

---

## `gears.html` → `/gear`

- Both products migrated with their stated specifications.
- Retail framing ("limited edition drop", "join the team & grab yours") dropped: there was no price,
  no stock and no checkout.
- The claim "Bangladesh's first RoboCup Rescue team" was **removed** — unsupported; BRACU ALTER
  appears in RoboCup Rescue records from 2023.

---

## `Assets.html` → `/brand-assets`

- Asset registry migrated. The hard-coded "0 TOTAL FILES" placeholder is replaced by a computed count.
- `umrt_logo.png` was inspected: the artwork is URRT's own badge, so it is **not** a wrong-team asset
  — only the filename is misleading. Recorded as a naming issue, not a content error.
- `urrt_text.png` is a white wordmark on transparency; documented as dark-background-only.
- Usage rules (permitted / not permitted) migrated verbatim.

---

## `webmaster.html` → `/webmasters`

- The single named webmaster is credited with their portrait and GitHub link.
- The technology list is rewritten to describe the actual stack.

---

## Content totals

| | Old site | New site |
|---|---|---|
| Pages | 11 | 14 + 404 |
| Words of body copy | ~4,900 | ~7,800 |
| Verified achievement claims | 0 (3 published, all misattributed) | 0 (none published, reason documented) |
| Functional forms | 0 of 5 | 3 of 3 (mailto handoff) |
| Images | 54, 21 MB, unoptimised | 52, 4.6 MB, WebP |
| Pages with meta description | 2 of 11 | 14 of 14 |
| robots.txt / sitemap.xml | missing | present |
