import type { Metadata } from "next";
import Link from "next/link";

import { Chip, PageHead, SectionHead } from "@/components/primitives";
import { partners, site } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Institutional and technology partners supporting the UIU Rescue Rover Team, and how to sponsor the programme.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  const institutional = partners.filter((p) => p.kind === "institutional");
  const technology = partners.filter((p) => p.kind === "technology");

  return (
    <>
      <PageHead
        eyebrow="Partners"
        title="Who makes the work possible."
        lead="Institutional backing and in-kind technology support. We list only organisations with a stated relationship to the team, and we mark which relationships we could verify independently."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01 — Institutional"
            title="Academic home."
            note="The university and research centre that host the team."
          />

          <div className="partner-grid">
            {institutional.map((p) => (
              <a
                key={p.name}
                className="partner-cell"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="partner-cell__logo"
                  src={media(p.logo ?? "")}
                  alt={p.name}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
                <span className="partner-cell__name">{p.name}</span>
              </a>
            ))}
          </div>

          <div className="two-col mt-5">
            {institutional.map((p) => (
              <div className="stack" key={p.name}>
                <h3 className="h3">{p.name}</h3>
                <p className="body-2">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="02 — Technology"
            title="Tools and hardware."
            note="Listed by the team as research and development partners. These relationships are in-kind software or component support; none is a cash sponsor."
          />

          <div className="partner-grid">
            {technology.map((p) => (
              <a
                key={p.name}
                className="partner-cell"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="partner-cell__logo"
                  src={media(p.logo ?? "")}
                  alt={p.name}
                  height={34}
                  loading="lazy"
                  decoding="async"
                />
                <span className="partner-cell__name">{p.name}</span>
              </a>
            ))}
          </div>

          <div className="mt-4">
            <Chip tone="warn">Provenance: team-stated, not independently verified</Chip>
          </div>

          <p className="small mt-3" style={{ maxWidth: "62ch" }}>
            These four organisations appear in the team&apos;s own partner list. We have not
            confirmed the specific terms of each relationship, so no tier, value or duration is
            stated. The previous site displayed empty Platinum, Gold and Silver sponsorship tiers
            under the sentence &ldquo;these organisations believe in our mission&rdquo; — that
            section has been removed rather than filled with guesses.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03 — Sponsor"
            title="What sponsorship actually buys."
            note="Specific and unglamorous, because that is what a sponsor needs to evaluate."
          />

          <div className="two-col two-col--offset">
            <div>
              <p className="statement">
                A rover is a budget line before it is a machine.
              </p>
            </div>
            <div className="stack">
              <p className="body-2">
                Motors, track assemblies, LiDAR units, depth cameras, carbon fibre, batteries and
                the travel to an international competition are all real costs carried by a
                student team. Support in kind — components, fabrication time, software licences —
                is as useful as funding.
              </p>
              <p className="body-2">
                In return, partners are credited on the rover, on this website, and in
                competition documentation. We do not offer audience figures or media-value
                estimates, because we have no verified numbers to offer.
              </p>
              <div className="btn-row mt-4">
                <Link href="/contact" className="btn btn--solid">
                  Start a conversation <span aria-hidden="true">→</span>
                </Link>
                <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent("URRT sponsorship enquiry")}`}>
                  Email the team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
