/**
 * Content model.
 *
 * Every fact-bearing record carries a `source` so the site stays traceable to
 * the audit in content-audit/. `verification` records whether the claim could
 * be confirmed independently of the old website.
 */

export type Verification =
  | "verified" // confirmed against an external or photographic source
  | "source-only" // present on the old site, not independently confirmed
  | "withheld"; // known to be wrong or unsupported — not published

export interface Sourced {
  source: string;
  verification: Verification;
  note?: string;
}

export interface SpecRow {
  key: string;
  value: string;
}

export interface Subsystem {
  id: string;
  name: string;
  summary: string;
  detail: string;
  /** Position on the schematic, in viewBox units (0–1000 × 0–560). */
  x: number;
  y: number;
  label: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  version: string;
  designation: string;
  status: "in-development" | "completed";
  statusLabel: string;
  period: string;
  summary: string;
  intro: string;
  specs: SpecRow[];
  subsystems: Subsystem[];
  gallery: GalleryImage[];
  hero: GalleryImage;
  limitations: string[];
  specNote?: string;
  source: string;
  verification: Verification;
}

export interface Person {
  name: string;
  role: string;
  subteam?: string;
  image?: string;
  email?: string;
  focus?: string[];
  affiliation?: string;
  source: string;
}

export interface Milestone {
  date: string;
  sortKey: string;
  title: string;
  description: string;
  state: "done" | "planned" | "unverified";
  source: string;
}

export interface Partner {
  name: string;
  kind: "technology" | "institutional" | "media";
  logo?: string;
  href?: string;
  note?: string;
  verification: Verification;
  source: string;
}

export interface ResearchArea {
  index: string;
  title: string;
  question: string;
  body: string;
  methods: string[];
}

export interface WorkflowStage {
  step: string;
  title: string;
  body: string;
}
