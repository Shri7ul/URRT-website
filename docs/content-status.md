# Content Status — missing and unverified information

Everything below was either absent from the old website, contradictory, or impossible to confirm
from public sources. **None of it is published on the new site.** This file is the list of what the
team needs to supply.

Each item names the exact file and field to edit once the fact is confirmed.

---

## 1. URRT's own competition record — **highest priority**

**Status:** unknown. No verified result exists for URRT in any public source.

The old homepage displayed three achievement blocks. All three attributed themselves, in their own
body text, to the **UIU Mars Rover Team (UMRT)** — a different team at the same university — and one
referred to a rover called AXIOS:

- BEAR Summit / National Semiconductor Symposium 2025 — 2nd Runner-Up
- Anatolian Rover Challenge 2025 — 3rd place overall, Best Science Award, Best Autonomous Driving
  and Control System Award
- Anatolian Rover Challenge 2023 — 3rd place of 38 teams from 15 countries

These are not URRT's results. They are withheld rather than reattributed.

**Needed:** URRT's own competition history — event, year, category, result, and a link or document
that supports it.

**Where it goes:** `data/content.ts` → `milestones`; a new `achievements` array; `/journey`.

---

## 2. RoboCup Rescue 2026 outcome

**Status:** unverified.

What is established: the team published a qualification video titled for RoboCup 2026, which
evidences a **submission**. The event itself ran 30 June – 6 July 2026 at Songdo Convensia, Incheon,
South Korea.

What is not established: whether URRT was accepted into the Rescue Robot League, whether the team
travelled, and what result it achieved. The league's public 2026 material addresses "23 teams" but
lists no names in readable form, and URRT does not appear in any text on `rrl.robocup.org`.

The site currently says the submission happened and that participation is not claimed.

**Needed:** acceptance letter, league team list, or result sheet.

**Where it goes:** `data/content.ts` → `milestones` entry for 2026-07 (currently `state: "unverified"`).

---

## 3. Recruitment deadline

**Status:** contradictory and expired.

The old page stated two deadlines at once:

- "Deadline: March 1, 2026" (Quick Facts panel)
- "APPLICATION DEADLINE — March 13, 2025 • 11:59 PM" (footer banner)

Both are in the past. The page nonetheless displayed "RECRUITING NOW".

The new site renders a **closed** state and directs applicants to email.

**Needed:** one authoritative deadline for the next cycle, or confirmation that recruitment is
rolling.

**Where it goes:** `data/content.ts` → `recruitment.status` (`"open"`) and `recruitment.deadline`.

---

## 4. Whether AEGIS has been field-tested

**Status:** unverified, and the old site implied otherwise.

The old copy referred to rovers operating "in disaster zones" and "saving lives". No deployment,
trial, partner exercise or field report exists in any public source.

The new site describes AEGIS as a design and laboratory platform. Its Limitations section states
explicitly that no field-deployment results are published and none are claimed.

**Needed:** any documented field trial — date, location, conditions, what was tested, what failed.

**Where it goes:** `data/content.ts` → `projects[0].limitations`, and a new research note.

---

## 5. AEGIS development status

**Status:** contradictory within the old site.

- `projects.html`: "In Development"
- Homepage timeline: "January 2026 — Fully Workable"

Not reconciled. The new site uses "In development".

**Needed:** current state — bench prototype, integrated platform, competition-ready, or something in
between.

**Where it goes:** `data/content.ts` → `projects[0].statusLabel`.

---

## 6. Sponsor relationships

**Status:** team-stated only.

SOLIDWORKS, Dassault Systèmes, Protospace and DFRobot appear in the team's partner list. The specific
terms — software licence, components, fabrication time, cash — are not stated anywhere.

There is also a possibility these arrangements were inherited from or shared with UMRT, given how
much other UMRT material appeared on the old site. That has not been resolved.

**Needed:** for each partner — what they provide, since when, and whether the relationship is URRT's
own.

**Where it goes:** `data/content.ts` → `partners[].verification` (`"verified"` once confirmed).

---

## 7. Media coverage

**Status:** withheld.

Three outlets were represented by logos and headline cards: The Daily Star, Prothom Alo, The
Business Standard. None linked to an article. The headlines concern the University Rover Challenge
and Mars-settlement research — UMRT subject matter.

**Needed:** article URLs, publication dates, and confirmation of which team each article is about.

**Where it goes:** a new `coverage` array; `/journey` §03 currently states 0 items published.

---

## 8. Technical publications

**Status:** referenced but not published.

The old timeline mentioned "Ready paper for Team Description" (TDP). No document is downloadable
anywhere on the old site.

**Needed:** the TDP PDF, plus any papers, posters or technical reports.

**Where it goes:** a new `publications` array; `/research`.

---

## 9. Team leadership

**Status:** not stated.

The 2026 roster assigns 15 members to sub-teams but names no captain, team lead or subsystem lead.
The advisors page names a Director (Md. Abid Hossain).

The new site publishes the roster as given and states that no leadership structure is designated,
rather than promoting someone by inference.

**Needed:** captain and sub-team leads, if those roles exist.

**Where it goes:** `data/content.ts` → `members[].role`.

---

## 10. AEGIS measured performance

**Status:** does not exist publicly.

No payload, endurance, top speed, runtime, stair-climb height, tether length or manipulator reach
figure appears anywhere in the old site.

The new site lists only qualitative specifications and says plainly that measured figures will be
published when the team measures them.

**Needed:** bench measurements with the test conditions.

**Where it goes:** `data/content.ts` → `projects[0].specs`.

---

## 11. Brand assets

**Status:** incomplete.

- No vector (SVG/AI/EPS) logo exists in the repository — only raster PNG.
- The primary emblem is duplicated as both `aboutuslogo.png` and `umrt_logo.png`; the latter name is
  misleading and should be renamed.
- `urrt_text.png` is white-on-transparent and unusable on light backgrounds.

**Needed:** a vector master of the emblem, and a dark wordmark for light surfaces.

**Where it goes:** `public/media/`, `scripts/optimize-images.mjs`, `/brand-assets`.

---

## 12. Photographic coverage

**Status:** thin.

52 images exist, of which roughly 10 are actual rover photographs. There is:

- no photograph of AEGIS from the rear
- no close-up of the sensor payload (LiDAR / depth camera)
- no photograph of the manipulator end effector
- no image of the electronics bay or wiring
- no image of the team mid-build

The AEGIS page gallery therefore runs to three frames. New photographs would materially improve the
project pages and the homepage.

**Where it goes:** `content-audit/raw/images/` → `npm run optimize-images` → `data/content.ts`
gallery arrays.

---

## Summary

| # | Item | Blocks |
|---|---|---|
| 1 | URRT competition record | An achievements section on `/journey` and `/` |
| 2 | RoboCup 2026 outcome | The 2026 milestone entry |
| 3 | Recruitment deadline | `/join` returning to an open state |
| 4 | Field testing | Any claim of real-world capability |
| 5 | AEGIS status | Accurate project status label |
| 6 | Sponsor terms | Removing the "team-stated" caveat |
| 7 | Media URLs | A coverage section |
| 8 | Publications | A publications section |
| 9 | Leadership | Complete roster |
| 10 | Measured specs | A quantitative spec table |
| 11 | Vector logo | Print and merchandise use |
| 12 | Photographs | Richer project galleries |

Items 1–3 are the ones that affect what a sponsor or competition organiser sees first.
