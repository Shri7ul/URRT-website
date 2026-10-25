import type { Metadata } from "next";
import Link from "next/link";

import { PageHead, SectionHead } from "@/components/primitives";
import { advisors, members, subteams } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The 2026 URRT roster, sub-teams, and faculty advisors at United International University.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const counts = subteams.map((s) => ({
    ...s,
    count: members.filter((m) => m.subteam === s.name).length,
  }));

  return (
    <>
      <PageHead
        eyebrow="Team · 2026"
        title="Fifteen students, three advisors."
        lead="The roster is listed exactly as the team publishes it. Individual leadership roles beyond sub-team assignment are not stated here because they are not stated in the source."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01 — Advisors"
            title="Faculty and direction."
            note="Advisory board and team director. Research interests are quoted from the team's own advisor page."
          />

          {advisors.map((a) => (
            <article className="advisor" key={a.name}>
              <img
                className="advisor__photo"
                src={media(a.image ?? "")}
                alt={`Portrait of ${a.name}.`}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="advisor__role">{a.role}</p>
                <h3 className="advisor__name">{a.name}</h3>
                <p className="advisor__affil">{a.affiliation}</p>
                <ul className="focus-list">
                  {a.focus?.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {a.email && (
                  <p className="mt-3">
                    <a className="link" href={`mailto:${a.email}`}>
                      {a.email}
                    </a>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="02 — Roster"
            title="Active members."
            note="Sub-team assignment only. No individual titles, seniority or personal details are published."
          />

          <ul className="team-grid">
            {members.map((m) => (
              <li className="member" key={m.name}>
                <img
                  className="member__photo"
                  src={media(m.image ?? "")}
                  alt={`Portrait of ${m.name}.`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
                <span className="member__name">{m.name}</span>
                <span className="member__role">{m.subteam}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03 — Structure"
            title="How the team is organised."
            note="Three engineering sub-teams, plus media and logistics functions."
          />

          <div className="two-col">
            {counts.map((s) => (
              <div className="stack" key={s.name}>
                <p className="mono">{String(s.count).padStart(2, "0")} members</p>
                <h3 className="h3">{s.name}</h3>
                <p className="body-2">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="callout mt-5">
            <h3>Not listed</h3>
            <p>
              The 2026 roster assigns members to sub-teams but does not designate a captain or
              team lead. If a leadership structure exists, it should be published here — this is
              an open item for the team, not an omission we have filled with a guess.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h2 className="cta__title">There is room on the team.</h2>
            <p className="body-2" style={{ maxWidth: "44ch" }}>
              Applications for the current cycle are closed, but we always read a good
              introduction.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/join" className="btn btn--solid">
              Join us <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="btn">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
