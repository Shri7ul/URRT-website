# Factual Issues & Content Discrepancies — URRT Website Audit

**Audit date:** 2026-10-25
**Source site:** https://rescuerover.uiu.ac.bd/
**Pages audited:** 11 (all pages reachable from the site's own navigation)
**Method:** static fetch of every page, structured extraction, HTTP verification of all 54 media assets, cross-check against external authoritative sources.

Severity scale: **S1** = misleading/credibility-damaging, must fix before publication.
**S2** = contradictory or stale, should fix. **S3** = polish/correctness.

---

## S1-01 — Competition achievements are attributed to the wrong team

**This is the most serious issue on the site.**

The homepage `#achievements` section presents three achievement blocks:

| Presented claim | What the body text actually says |
|---|---|
| "2ND RUNNER-UP POSITION" | "the **UIU Mars Rover Team (UMRT)** achieved remarkable success, securing the 2nd Runner-Up position" (BEAR Summit 2025) |
| "3RD PLACE AT ARC 2025" + Best Science + Best Autonomous Driving | "the **UIU Mars Rover Team (UMRT)** proudly secured 3rd place overall… The team's latest rover, **AXIOS**" |
| "3RD PLACE GLOBALLY AT ARC 2023" | "the **UIU Mars Rover Team (UMRT)** … securing 3rd place overall out of 38 teams from 15 countries" |

URRT is the **Rescue** Rover Team. Its rovers are **Zugbee X1** and **AEGIS**. AXIOS is a Mars rover. Every one of these three achievements belongs to a **different team** at the same university.

The same confusion appears in the site's own furniture:

- The logo file loaded as the site's primary emblem is named `images/umrt_logo.png`. **Correction to an earlier draft of this audit:** that file was inspected directly and it contains the *URRT* emblem (a circular badge reading "UIU RESCUE ROVER TEAM / #URRT"), not a Mars Rover Team mark. It is a **naming inconsistency**, not wrong-team artwork. The same emblem is duplicated as `aboutuslogo.png`. This is logged as S3-06 below rather than as an S1 issue.
- Footer social links point to UMRT properties: `linkedin.com/company/uiu-mars-rover-team-umrt/` and `youtube.com/@uiumarsrover`.
- The "MEDIA COVERAGE" section quotes URC 2025 results and Mars-settlement research — again UMRT material.

**Impact:** publishing UMRT results as URRT results is a credibility and integrity problem with sponsors, RoboCup organisers, and the university. It also contradicts the site's own Projects page, which correctly describes a two-generation rescue programme (X1 → AEGIS).

**Resolution applied in rebuild:** no UMRT achievement is published as a URRT achievement. All three blocks are withheld from the new site pending the team supplying its own verified results. The migration map records each item as `WITHHELD_WRONG_ENTITY`. See `content-audit/migration-map.csv`.

**Action required from team:** supply URRT's own competition record (or confirm that URRT has not yet competed) before any achievements section is published.

---

## S1-02 — RoboCup Rescue 2026 is described as upcoming; the event has already happened

The Contact page FAQ states:

> "Our primary target is RoboCup Rescue 2026, to be held in **Icheon, South Korea in July 2026**."

Two defects:

1. **Stale tense.** RoboCup 2026 ran **30 June – 6 July 2026** at Songdo Convensia, **Incheon**, South Korea (source: robocup.org/events/80; 2026.robocup.org). As of this audit (25 Oct 2026) the event is four months past. "To be held" is now false.
2. **Misspelling.** The city is **Incheon**, not "Icheon". The same misspelling appears on the Gear page ("ICHEON, SOUTH KOREA").

The homepage timeline likewise still labels RoboCup Rescue 2026 as "Upcoming".

**Unresolved:** whether URRT qualified for or competed at RoboCup 2026. The Rescue Robot League's public 2026 material addresses "23 teams" and lists no team names in machine-readable form; URRT does not appear in any text on `rrl.robocup.org`. The team did publish a qualification video titled "UIU Rescue Rover Team Qualification Video | Robocup 2026", which evidences a **submission**, not acceptance or participation.

**Resolution applied in rebuild:** all RoboCup 2026 references are written in the past tense and limited to what is evidenced — that the team prepared and submitted qualification material for the 2026 cycle. No result, placement, or participation claim is published. `participationStatus: "unverified"` in the data model.

---

## S1-03 — Every form on the site is non-functional

All five forms (`Join.html` ×2, `contact.html`, `sponsor.html`, `index.html`) have **no `action` and no `method` attribute**. They are client-side simulations: on submit they swap in a "MESSAGE TRANSMITTED" / "APPLICATION SUBMITTED!" panel, but no request is ever made.

- Recruitment applications submitted through this form **reach nobody**.
- Sponsorship enquiries likewise.
- The UI actively tells the user the message was transmitted. This is worse than a broken form, because it reports success.

**Resolution applied in rebuild:** forms are replaced with honest, working `mailto:` composition — the user's own mail client opens with recipient, subject, and body pre-filled, and the UI states plainly that it will open their email app. No fake success state. A real endpoint is documented as the recommended next step.

---

## S2-01 — Recruitment deadline contradicts itself, and both are expired

| Location | Stated deadline |
|---|---|
| `Join.html` "QUICK FACTS" | **March 1, 2026** |
| `Join.html` footer banner | **March 13, 2025 • 11:59 PM** |

The two values disagree by a full year. Both are in the past as of October 2026, yet the page still shows "RECRUITING NOW" and "APPLICATIONS OPEN NOW".

**Resolution applied in rebuild:** the recruitment page is rendered in an explicit **closed** state with the conflicting dates suppressed. A single `recruitment.status` field drives the UI; the team flips it to `open` and supplies one authoritative deadline. Until then the page directs applicants to email the team.

---

## S2-02 — Three different phone numbers / formats

| Page | Number |
|---|---|
| index, Advisors, member, video | `+880 1909356346` |
| contact, sponsor | `+880 1909 356 346` |
| Join (footer) | `+880 1796-992356` |

The first two are the same number formatted differently. The third is a **different number entirely**.

**Resolution applied in rebuild:** one canonical number, `+880 1909 356 346` (E.164: `+8801909356346`), stored once in `data/site.ts` and rendered everywhere. The `1796-992356` variant is recorded here and withheld.

---

## S2-03 — Office hours contradict the university's actual working week

- Footer on most pages: "**Mon–Fri, 9AM–5PM**"
- Contact page: "Sunday – Thursday 08:00 – 20:00 · Friday CLOSED · Saturday CLOSED"
- Campus hours: "Sun–Thu, 8:00 AM – 8:00 PM"

UIU operates a Sunday–Thursday week, as the contact page itself states. "Mon–Fri" is inconsistent with the institution and with the same site's own detail page.

**Resolution applied in rebuild:** hours rendered as **Sunday–Thursday, 08:00–20:00**; Friday and Saturday closed. Lab access and general enquiry hours are distinguished.

---

## S2-04 — Qualification video duration violates the site's own stated criteria

`video.html` lists the submission video at **28:59** while the requirements panel directly beneath it states "**Max 5 min per video**, 1080p resolution".

Either the duration badge or the criteria is wrong.

**Resolution applied in rebuild:** the video is embedded with no duration badge; the stated requirement is presented as the competition's rule, not as a claim about the video.

---

## S2-05 — Sponsor tiers are empty

`sponsor.html` renders PLATINUM / GOLD / SILVER tiers with no sponsor entries, under the sentence "These organisations believe in our mission and make our work possible." No sponsor is named anywhere on the page.

**Resolution applied in rebuild:** the Partners page publishes only partners that are evidenced as such, and states clearly that the sponsorship programme is open rather than implying existing sponsors at unlisted tiers.

---

## S2-06 — Placeholder URLs left in production

| Location | Value |
|---|---|
| index "watch" link | `https://youtube.com/watch?v=abc123` |
| index media card | `https://facebook.com/watch/?v=123456` |

Neither resolves to a real video. They are literal placeholders.

**Resolution applied in rebuild:** removed. Only the verified embed (`youtube.com/embed/mp6F0gAOtGY`) is used.

---

## S2-07 — Brand-asset counter is broken

`Assets.html` displays "**0 TOTAL FILES**" while listing 3 categories and 12 downloadable items. The counter is a hard-coded placeholder.

**Resolution applied in rebuild:** asset counts are computed from the asset array, not hard-coded.

See also **S3-06** for the logo filename issue.

---

## S2-08 — Unverifiable superlative

Gear page: "Official merchandise of **Bangladesh's first RoboCup Rescue team**." Also "the team heading to RoboCup Rescue" (present/future tense, event now past).

No source supports "first". BRAC University's BRACU ALTER appears in RoboCup Rescue league records from 2023, predating URRT's September 2024 formation.

**Resolution applied in rebuild:** claim removed. The Gear page is retained as a minimal page without the superlative.

---

## S3-01 — Missing technical SEO fundamentals

| Check | Result across 11 pages |
|---|---|
| `robots.txt` | **404 — does not exist** |
| `sitemap.xml` | **404 — does not exist** |
| `<meta name="description">` | present on **2 of 11** pages |
| Canonical link | **0 of 11** |
| Open Graph tags | **0 of 11** |
| JSON-LD structured data | **0 of 11** |

The rebuild adds all of these.

---

## S3-02 — Typography defect in the flagship product description

The AEGIS description — the single most important paragraph on the site — reads:

> "designed for USAR (Urban Search and Rescue)**environments**"

Missing space. The same string is duplicated on `video.html`.

**Resolution applied in rebuild:** corrected to "Urban Search and Rescue (USAR) environments".

---

## S3-03 — Non-descriptive alt text on evidence images

All images have `alt` attributes (good), but several are not meaningful: `alt="Achievement"`, `alt="1st Place"`, `alt="Best Design"`, `alt="Media Recognition"`, `alt="Team"`, `alt="AEGIS"` repeated across gallery shots.

**Resolution applied in rebuild:** alt text rewritten to describe what is visible in each photograph.

---

## S3-04 — Media coverage cards have no outbound links

Three newspaper logos (The Daily Star, Prothom Alo, The Business Standard) and three headline cards are shown, but none links to the underlying article. The headlines cannot be verified from the site.

**Resolution applied in rebuild:** coverage items are not republished without a source URL. The section is held pending URLs from the team.

---

## S3-05 — Heavy unoptimized media

`tshirt.png` 4.0 MB, `a2.png` 2.6 MB, `a3.png` 2.4 MB, `ho5.jpg` 1.2 MB, `abid.jpg` 986 KB, `Team.jpg` 980 KB. 21 MB total for 52 images, served with no responsive variants.

**Resolution applied in rebuild:** all display images re-encoded to WebP at capped widths; originals retained in `content-audit/raw/images/` for traceability.

---

## S3-06 — Brand asset filenames are misleading

Two files contain the same artwork under different names:

| File | Content |
|---|---|
| `umrt_logo.png` | Circular badge reading "UIU RESCUE ROVER TEAM / #URRT" |
| `aboutuslogo.png` | The same badge, slightly different crop and shadow |

The prefix `umrt` suggests the UIU Mars Rover Team. Pixel comparison of the two files (64×64 greyscale, mean absolute difference 36/255) confirms they are the same emblem with different compression and shadow treatment, not two different teams' marks.

Separately, `urrt_text.png` is a **white** wordmark on a transparent background. It is invisible on the site's light page background — which is why the header logo renders as a faint smudge on the old site's lighter sections.

**Resolution applied in rebuild:** the circular badge (`aboutuslogo`) is used as the primary mark everywhere. `urrt_text` is documented as a dark-background asset and is not used on light surfaces. The naming should still be corrected in the repository.

---

## Unresolved — requires team input

These could not be resolved from public sources and are **not** published on the new site:

1. **URRT's own competition record.** None verified. What has URRT actually competed in?
2. **RoboCup Rescue 2026 outcome.** Qualified? Attended? Any placement? No public record found.
3. **Whether URRT has ever field-tested outside a lab.** The site implies real-world operation ("disaster zones", "saving lives") but no deployment, trial, or partner evidence exists. The rebuild describes capability as design intent and lab development, not demonstrated field performance.
4. **Which sponsor tiers are real.** SOLIDWORKS / Protospace / Dassault Systèmes / DFRobot appear as "Research & Development Partners" — provenance unverified (possibly UMRT's arrangements).
5. **Team leadership.** 15 members are listed by sub-team only. No captain, no team lead. Advisors page lists a Director (Md. Abid Hossain).
6. **AEGIS development status.** Projects page says "In Development"; homepage timeline says "January 2026 — Fully Workable". Not reconciled.
7. **Publication / TDP documents.** Referenced ("Ready paper for Team Description") but no document is downloadable anywhere on the site.
8. **Media article URLs** for the three newspaper features.
