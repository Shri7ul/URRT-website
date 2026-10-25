import type { Metadata } from "next";
import Link from "next/link";

import { PageHead, SectionHead } from "@/components/primitives";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Site credits",
  description: "The people and tools behind the URRT website.",
  alternates: { canonical: "/webmasters" },
};

export default function WebmastersPage() {
  return (
    <>
      <PageHead
        eyebrow="Site credits"
        title="Who built this site."
        lead="The website is maintained by team members, not an agency."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01 — Build"
            title="Development."
            note="Credited as published by the team. Additional contributors are not listed here because the source page names only one."
          />

          <div className="advisor">
            <img
              className="advisor__photo"
              src={media("yeahyea")}
              alt="Portrait of Md. Yeahyea Hassan Siddique."
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="advisor__role">Webmaster</p>
              <h3 className="advisor__name">Md. Yeahyea Hassan Siddique</h3>
              <p className="advisor__affil">Electrical sub-team · United International University</p>
              <p className="body-2">
                Responsible for the design and build of this website, working alongside the team
                on the rover&apos;s electrical systems.
              </p>
              <p className="mt-3">
                <a
                  className="link"
                  href="https://github.com/yeahyeahassan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub profile →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="02 — Stack"
            title="How it is built."
            note="A small, boring stack, chosen so that the site can be handed over to next year's team."
          />

          <div className="spec">
            <div className="spec__row">
              <dt className="spec__key">Framework</dt>
              <dd className="spec__val">Next.js 15 (App Router), statically exported</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Language</dt>
              <dd className="spec__val">TypeScript, strict mode</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Styling</dt>
              <dd className="spec__val">Hand-authored CSS with custom-property design tokens</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Typefaces</dt>
              <dd className="spec__val">Instrument Serif, Archivo, IBM Plex Mono (self-hosted)</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Images</dt>
              <dd className="spec__val">WebP derivatives generated at build time from the team archive</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Hosting</dt>
              <dd className="spec__val">Static output — deployable to any web host or GitHub Pages</dd>
            </div>
          </div>

          <p className="small mt-4">
            Build and deployment instructions live in{" "}
            <code>README.md</code>. The design rationale is documented in{" "}
            <code>docs/design-system.md</code>.
          </p>

          <div className="btn-row mt-4">
            <Link href="/brand-assets" className="btn">
              Brand assets
            </Link>
            <Link href="/contact" className="btn">
              Report an issue
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
