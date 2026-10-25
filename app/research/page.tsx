import type { Metadata } from "next";
import Link from "next/link";

import { Figure, PageHead, SectionHead } from "@/components/primitives";
import { researchAreas, workflow } from "@/data/content";

export const metadata: Metadata = {
  title: "Research & Engineering",
  description:
    "URRT's research areas: mobility over rubble, sensing in degraded conditions, manipulation in confined space, and operator workload.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHead
        eyebrow="Research & engineering"
        title="The questions we keep running into."
        lead="Four problems that recur in every design review, the methods we use to approach them, and an honest note on what is implemented versus what is intended."
      />

      <section className="section">
        <div className="container">
          <div className="two-col two-col--offset">
            <div>
              <p className="statement">
                A rescue rover is not a robot with a camera. It is a mobile sensor platform
                operating in a structure nobody has mapped.
              </p>
            </div>
            <div className="stack">
              <p className="body-2">
                That framing changes what counts as progress. A faster drivetrain is not
                progress if the mapping drifts. A better arm is not progress if the operator
                cannot see what it is reaching for. Most of our engineering effort goes into the
                interfaces between subsystems rather than the subsystems themselves.
              </p>
              <p className="body-2">
                The four areas below are not a research portfolio in the academic sense. We have
                not published papers. They are the working agenda that determines what we build
                next, and they are stated here so that anyone evaluating this team can see what
                we think the hard problems are.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="01 — Agenda"
            title="Four open questions."
            note="Each area lists the methods we actually use, not the methods that sound impressive."
          />

          {researchAreas.map((area) => (
            <article className="area-row" key={area.index}>
              <span className="area-row__index">{area.index}</span>
              <div>
                <h3 className="area-row__title">{area.title}</h3>
                <p className="area-row__q">{area.question}</p>
              </div>
              <div>
                <p className="area-row__body">{area.body}</p>
                <ul className="method-list">
                  {area.methods.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02 — Method"
            title="Problem, design, prototype, test, evaluate, iterate."
            note="The engineering cycle as we actually run it. The loop is not a diagram — it is how X1 became AEGIS."
          />

          <div className="workflow">
            {workflow.map((stage) => (
              <div className="workflow__step" key={stage.step}>
                <span className="workflow__num">{stage.step}</span>
                <h3 className="workflow__title">{stage.title}</h3>
                <p className="workflow__body">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="two-col mt-5">
            <Figure
              src="t2"
              alt="AEGIS part-way up a plywood step rig, front flippers raised onto the upper platform."
              caption="Stage 04 in practice: the plywood rig that tests the flipper geometry against the stair case."
              width={1599}
              height={899}
            />
            <div className="stack">
              <h3 className="h3">What &ldquo;test&rdquo; means here</h3>
              <p className="body-2">
                Not a demo. A test has a pass condition written before it is run, and a result
                that can fail. When the flipper geometry was changed, the pass condition was
                whether the front track maintained contact through the transition at the top of
                the step — not whether the rover got up the step at all.
              </p>
              <p className="body-2">
                This is slower than building and filming something that looks impressive. It is
                also the only way to know whether the next version is better than the last.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight band">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="h2">Implemented vs. intended</h2>
              <p className="mono mt-2">Status of the claims made on this site.</p>
            </div>
            <div>
              <ul className="prose">
                <li>
                  <strong>Implemented:</strong> tracked locomotion with articulated flippers;
                  multi-sensor integration (LiDAR, RGB-D, IMU); six-axis manipulator mounted and
                  driven.
                </li>
                <li>
                  <strong>Intended, not verified:</strong> autonomous navigation through unknown
                  interiors; victim detection under poor visibility; shared-control operator
                  assistance.
                </li>
                <li>
                  <strong>Not claimed:</strong> field deployment, measured payload or endurance,
                  competition placement, or any real-world rescue outcome.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h2 className="cta__title">Want the engineering detail?</h2>
            <p className="body-2" style={{ maxWidth: "44ch" }}>
              Each platform page documents its subsystems, specifications and limitations.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/projects/aegis" className="btn btn--solid">
              AEGIS record <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="btn">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
