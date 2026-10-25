import type { Metadata } from "next";
import Link from "next/link";

import { Chip, Figure, PageHead, SectionHead } from "@/components/primitives";
import { milestones } from "@/data/content";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "URRT's dated record: formation in September 2024, the Zugbee X1 prototype in January 2025, AEGIS development, and the RoboCup Rescue 2026 cycle.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHead
        eyebrow="Journey"
        title="A short record, kept honestly."
        lead="Every entry below is dated and attributable. Where an event cannot be confirmed — including URRT's own competition participation — it is marked rather than omitted or embellished."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01 — Timeline"
            title="From formation to the 2026 cycle."
            note="The team is young. Five entries is the complete public record."
          />

          <ol className="timeline">
            {milestones.map((m) => (
              <li className="timeline__item" key={m.sortKey} data-state={m.state}>
                <span className="timeline__date">{m.date}</span>
                <div>
                  <h3 className="timeline__title">{m.title}</h3>
                  <p className="timeline__desc">{m.description}</p>
                  <div className="mt-2">
                    {m.state === "done" && <Chip tone="ok">Recorded</Chip>}
                    {m.state === "unverified" && <Chip tone="warn">Not verified</Chip>}
                    {m.state === "planned" && <Chip>Planned</Chip>}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="02 — Competition record"
            title="What we can and cannot say about RoboCup."
            note="This section exists because the previous website got it wrong."
          />

          <div className="two-col two-col--offset">
            <div className="stack">
              <p className="statement">
                Submitting qualification material is not the same as competing.
              </p>
            </div>

            <div className="stack">
              <p className="body-2">
                URRT prepared and published qualification video material for the RoboCup Rescue
                League 2026 cycle. That is documented — the video exists and is titled for the
                event.
              </p>
              <p className="body-2">
                What is not documented is whether the team was accepted into the league, whether
                it travelled to Incheon, and what result it achieved. The league&apos;s public 2026
                material does not list team names in a machine-readable form, and no URRT result
                appears in any source we could verify.
              </p>
              <p className="body-2">
                RoboCup 2026 was held at Songdo Convensia, Incheon, South Korea, from 30 June to
                6 July 2026. The previous website described this event as &ldquo;upcoming&rdquo;
                and misspelled the host city as &ldquo;Icheon&rdquo;.
              </p>

              <div className="notice mt-3">
                <h2>Correction: achievements removed</h2>
                <p>
                  The previous homepage displayed three achievement blocks — a BEAR Summit 2025
                  runner-up position, a 3rd place at ARC 2025 with two awards, and a 3rd place at
                  ARC 2023. The body text of those blocks attributed all three to the{" "}
                  <strong>UIU Mars Rover Team</strong>, a different team at the same university,
                  and referred to a rover called AXIOS.
                </p>
                <p>
                  They were not URRT&apos;s results. They have been removed rather than
                  reattributed, and will be republished only if URRT supplies its own verified
                  competition record.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div style={{ border: "1px solid var(--rule)", background: "var(--paper)" }}>
              <div style={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  title="UIU Rescue Rover Team qualification video for RoboCup 2026"
                  src="https://www.youtube-nocookie.com/embed/mp6F0gAOtGY"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="figure__cap mt-2">
              <strong>Qualification video, RoboCup Rescue 2026 cycle.</strong> Published by the
              team. The original page listed a running time of 28:59 against a stated rule of five
              minutes per video; that badge has not been carried over.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03 — Media"
            title="Coverage, pending attribution."
            note="Three Bangladeshi outlets have covered UIU rover teams. Attribution to URRT specifically is under verification."
          />

          <div className="two-col">
            <div className="stack">
              <p className="body-2">
                The previous site displayed logos and headlines from The Daily Star, Prothom Alo
                and The Business Standard, but linked to none of the articles. The headlines
                concern the University Rover Challenge and Mars-settlement research — subjects
                that belong to UIU&apos;s Mars rover programme rather than to rescue robotics.
              </p>
              <p className="body-2">
                We have not republished them. A media credit without a working source link is not
                evidence, and republishing another team&apos;s coverage under this team&apos;s name
                would repeat the error described above.
              </p>
              <p className="mono">0 media items published · 3 pending source verification</p>
            </div>

            <Figure
              src="ho4"
              alt="Members of a UIU rover team standing together indoors during an event."
              caption="An event photograph from the team's archive. Caption and date are unverified and deliberately not asserted."
              width={1800}
              height={1062}
            />
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h2 className="cta__title">The next entry is unwritten.</h2>
            <p className="body-2" style={{ maxWidth: "46ch" }}>
              AEGIS is in development. What happens next depends on who joins and who supports
              the work.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/join" className="btn btn--solid">
              Join the team <span aria-hidden="true">→</span>
            </Link>
            <Link href="/partners" className="btn">
              Support the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
