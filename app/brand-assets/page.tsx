import type { Metadata } from "next";

import { PageHead, SectionHead } from "@/components/primitives";
import { site } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Brand assets",
  description: "Official URRT logos and marks for press, academic and partnership use.",
  alternates: { canonical: "/brand-assets" },
};

/**
 * Asset registry.
 *
 * The count is computed from this array — the previous site hard-coded a
 * "0 TOTAL FILES" label above twelve listed files.
 *
 * Note: the old site used umrt_logo.png (the Mars Rover Team's file) as the
 * primary URRT emblem. It is not presented as such here.
 */
const assets = [
  {
    name: "URRT emblem",
    file: "aboutuslogo",
    format: "WebP",
    use: "Primary mark. Circular badge for official documents, social profiles and merchandise.",
    surface: "light and dark",
  },
  {
    name: "URRT wordmark",
    file: "urrt_text",
    format: "WebP",
    use: "Horizontal wordmark in white. For dark backgrounds only — it is invisible on light surfaces.",
    surface: "dark only",
  },
  {
    name: "Robot icon",
    file: "robot",
    format: "WebP",
    use: "Compact symbol for competition and event graphics.",
    surface: "light and dark",
  },
  {
    name: "UIU institutional logo",
    file: "uiu-logo",
    format: "WebP",
    use: "Co-branded academic material only, alongside the URRT mark.",
    surface: "light",
  },
  {
    name: "CAIR logo",
    file: "cair-logo",
    format: "WebP",
    use: "Material referencing the Center for Artificial Intelligence Research.",
    surface: "light",
  },
];

const permitted = [
  "Press and media coverage of URRT activities",
  "Academic publications and conference papers",
  "Official partner and sponsor material",
  "Team member portfolios and presentations",
];

const notPermitted = [
  "Modifying colours, proportions or typography",
  "Use on competing or unrelated products",
  "Commercial use without written permission",
  "Placement on busy backgrounds without approval",
];

export default function BrandAssetsPage() {
  return (
    <>
      <PageHead
        eyebrow="Brand assets"
        title="Logos and marks."
        lead="Official files for press, academic and partnership use. If you need a format that is not listed here, ask and we will produce it."
      />

      <section className="section-tight">
        <div className="container">
          <div className="factstrip" style={{ borderTop: 0 }}>
            <ul className="factstrip__list">
              <li>{assets.length} assets</li>
              <li>3 categories</li>
              <li>WebP format</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHead
            index="01 — Files"
            title="Team marks."
            note="Right-click and save, or request the original vector file by email."
          />

          <div className="partner-grid">
            {assets.map((a) => (
              <div className="partner-cell" key={a.file}>
                <img
                  className="partner-cell__logo"
                  src={media(a.file)}
                  alt={a.name}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span className="partner-cell__name">{a.name}</span>
                  <p className="small mt-1" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                    {a.use}
                  </p>
                  <p className="mono mt-1" style={{ fontSize: "0.5625rem" }}>
                    {a.format} · {a.surface}
                  </p>
                </div>
                <a
                  className="mono"
                  style={{ color: "var(--signal-ink)" }}
                  href={media(a.file)}
                  download
                >
                  Download ↓
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02 — Usage"
            title="What is permitted."
            note="Short and specific. When in doubt, ask."
          />

          <div className="two-col">
            <div>
              <h3 className="mono mb-3" style={{ color: "var(--ok)" }}>
                Permitted
              </h3>
              <ul className="prose">
                {permitted.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono mb-3" style={{ color: "var(--signal-ink)" }}>
                Not permitted
              </h3>
              <ul className="prose">
                {notPermitted.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="callout mt-5">
            <h3>Asset note</h3>
            <p>
              The wordmark is white on a transparent background, so it only works on dark
              surfaces. Use the circular emblem on light backgrounds. In the source repository the
              emblem is also duplicated under the filename <code>umrt_logo.png</code> — the
              artwork is correct, but the name is misleading and should be renamed.
            </p>
          </div>

          <p className="small mt-4">
            Requests:{" "}
            <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent("URRT brand assets")}`}>
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
