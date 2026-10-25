import type { Metadata } from "next";
import Link from "next/link";

import { SubsystemExplorer } from "@/components/SubsystemExplorer";
import { Chip, Figure, SectionHead } from "@/components/primitives";
import { milestones, projects, site, workflow } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const aegis = projects[0];
const x1 = projects[1];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Opening                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="hero__eyebrow">{site.short} · Dhaka, Bangladesh</p>
            <h1 className="hero__title">
              Robots built for the places people <em>cannot go</em>.
            </h1>
            <p className="hero__lead">
              We are a student engineering team at United International University, building
              tracked rovers for urban search and rescue — and documenting the engineering
              honestly, from the first prototype to the current platform.
            </p>
            <div className="btn-row hero__actions">
              <Link href="/projects/aegis" className="btn btn--solid">
                Explore AEGIS <span aria-hidden="true">→</span>
              </Link>
              <Link href="/research" className="btn">
                Our research
              </Link>
            </div>
          </div>

          <div className="hero__media">
            <img
              className="hero__img"
              src={media("t1")}
              alt="AEGIS, a tracked rescue rover with orange rubber tracks and a six-degree-of-freedom arm raised above the chassis, photographed in the robotics workshop."
              width={1600}
              height={1204}
              fetchPriority="high"
              decoding="sync"
            />
            <p className="hero__caption">
              <span>AEGIS · manipulator raised</span>
              <span>CAIR Lab, UIU</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="factstrip">
          <ul className="factstrip__list">
            <li>Established September 2024</li>
            <li>Two prototypes</li>
            <li>CAIR Lab, UIU Dhaka</li>
            <li>RoboCup Rescue 2026 cycle</li>
          </ul>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 01 — The problem                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" id="problem">
        <div className="container">
          <SectionHead
            index="01 — The problem"
            title="A collapsed structure is a hostile place to put a person."
            note="Why rescue robotics exists, stated plainly."
          />

          <div className="two-col two-col--offset">
            <div className="stack">
              <p className="statement">
                Unstable floors. No light. No GPS. Openings too narrow to enter and too
                dangerous to widen.
              </p>
            </div>

            <div className="stack">
              <p className="body-2">
                Urban search and rescue is a race against structural collapse and against time.
                Rescuers work in voids they cannot see, on surfaces that may not hold them, in
                buildings whose layout is no longer known.
              </p>
              <p className="body-2">
                A small tracked robot can go into that void first. It can carry a camera and a
                depth sensor into a space a person cannot fit, map the geometry, and let the
                team outside decide what to do next — without putting anyone inside.
              </p>
              <p className="body-2">
                That is the engineering problem URRT works on: a machine small enough to enter,
                rugged enough to survive the entry, and instrumented well enough to be useful
                once it is there.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="note-block">
              <strong>Scope</strong>
              This site describes design intent and laboratory development. URRT has not
              published field-deployment results in a live disaster response, and none are
              claimed here.
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 02 — Mission                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="section band" id="mission">
        <div className="container">
          <SectionHead
            index="02 — Mission"
            title="Build the whole machine, not a demonstration of one."
            note="Our engineering philosophy, and the constraint that shapes it."
          />

          <div className="split-media">
            <div className="stack">
              <p className="body-2">
                A rescue rover is a systems problem disguised as a robotics project. The
                drivetrain, the power budget, the sensor stack and the software that fuses them
                are not separable: change the arm and you change the centre of gravity, which
                changes how the tracks behave on a stair edge, which changes what the operator
                can attempt.
              </p>
              <p className="body-2">
                So we build in one team, across mechanical, electrical and software, and we
                accept that the first version will be wrong. Zugbee X1 was deliberately modest —
                a twin-track chassis with a camera and ultrasonic rangefinders — because its job
                was to prove the pipeline end to end before anyone invested in LiDAR or a
                six-axis arm.
              </p>
              <p className="body-2">
                AEGIS is what came out of that. It carries the architecture X1 proved, and it
                carries the compromises too.
              </p>
              <div className="btn-row mt-4">
                <Link href="/about" className="btn">
                  About the team
                </Link>
              </div>
            </div>

            <div className="split-media__media">
              <Figure
                src="t2"
                alt="AEGIS climbing a plywood step-and-ramp rig, front flippers angled upward onto the raised platform."
                caption="Flipper articulation on a plywood step rig. The geometry being tested is the stair and rubble case."
                width={1599}
                height={899}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 03 — Evolution                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" id="evolution">
        <div className="container">
          <SectionHead
            index="03 — The platforms"
            title="Two generations, one architecture."
            note="From a first testbed to a competition-oriented platform."
          />

          <div className="project-row">
            <div className="project-row__media">
              <img
                src={media("prototype-x1")}
                alt="The Zugbee X1 prototype, a small twin-track rover with red rubber tracks, on grass outside a university building."
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <div className="project-row__meta">
                <span className="mono">V1 · 2024–2025</span>
                <Chip tone="ok">Completed</Chip>
              </div>
              <h3 className="project-row__name">{x1.name}</h3>
              <p className="project-row__desc">{x1.summary}</p>
              <Link href={`/projects/${x1.slug}`} className="link">
                Read the X1 record →
              </Link>
            </div>
          </div>

          <div className="project-row project-row--flip">
            <div className="project-row__media">
              <img
                src={media("t3")}
                alt="AEGIS on the workshop floor with its arm folded back over the chassis, showing the track layout."
                width={1599}
                height={899}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <div className="project-row__meta">
                <span className="mono">V2 · 2025–present</span>
                <Chip tone="signal">In development</Chip>
              </div>
              <h3 className="project-row__name">{aegis.name}</h3>
              <p className="project-row__desc">{aegis.summary}</p>
              <Link href={`/projects/${aegis.slug}`} className="link">
                Read the AEGIS record →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 04 — Anatomy                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="section band" id="anatomy">
        <div className="container">
          <SectionHead
            index="04 — Anatomy"
            title="Three subsystems, one chassis."
            note="Select a subsystem to read what it does. This schematic is drawn, not photographed — it is a diagram of the design, not a claim about performance."
          />

          <SubsystemExplorer subsystems={aegis.subsystems} />

          <p className="mono mt-4" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
            Side elevation, schematic. Only subsystems documented in the team&apos;s own project
            description are shown.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 05 — How we build                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" id="process">
        <div className="container">
          <SectionHead
            index="05 — Method"
            title="The loop is the method."
            note="Every platform on this site went through the same six stages. Most of the work happens in the last two."
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
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 06 — Team                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="section band" id="team">
        <div className="container">
          <SectionHead
            index="06 — The team"
            title="Fifteen students and three advisors."
            note="Mechanical, electrical, and software & autonomous, working in one lab."
          />

          <div className="split-media split-media--flip">
            <div className="stack">
              <p className="body-2">
                URRT is student-run. Members come from across the university — engineering
                departments mostly, but also media and logistics — and every subsystem is owned
                by the people who build it.
              </p>
              <p className="body-2">
                The team is supported by two faculty advisors and a director, and hosted by the
                Center for Artificial Intelligence Research on the fourth floor of the academic
                building.
              </p>
              <div className="btn-row mt-4">
                <Link href="/team" className="btn">
                  Meet the team
                </Link>
                <Link href="/join" className="btn btn--accent">
                  Join us
                </Link>
              </div>
            </div>

            <div className="split-media__media">
              <Figure
                src="Team"
                alt="Members of the UIU Rescue Rover Team standing in a row on the UIU campus plaza with a rover in front of them."
                caption="The team on campus, with Zugbee X1."
                width={1800}
                height={1426}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 07 — Milestones                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="section" id="milestones">
        <div className="container">
          <SectionHead
            index="07 — Record"
            title="What has actually happened."
            note="Only dated, attributable events. Where a claim cannot be verified, it is marked rather than smoothed over."
          />

          <ol className="timeline">
            {milestones.map((m) => (
              <li className="timeline__item" key={m.sortKey} data-state={m.state}>
                <span className="timeline__date">{m.date}</span>
                <div>
                  <h3 className="timeline__title">{m.title}</h3>
                  <p className="timeline__desc">{m.description}</p>
                  {m.state === "unverified" && (
                    <p className="mt-2">
                      <Chip tone="warn">Not verified</Chip>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4">
            <Link href="/journey" className="link">
              Full journey and competition record →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 08 — Research                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="section band" id="research">
        <div className="container">
          <SectionHead
            index="08 — Research"
            title="Four open questions."
            note="The problems we are actively working on, and the methods we use to approach them."
          />

          <div className="two-col">
            <div>
              <p className="statement statement--wide">
                Most of rescue robotics is not a robot problem. It is a sensing, stability and
                decision problem.
              </p>
            </div>
            <div className="stack">
              <p className="body-2">
                Our research is organised around the four questions that keep coming back in
                design reviews: how to stay mobile on broken ground, how to sense in degraded
                conditions, how much manipulation is worth its mass, and how much autonomy an
                operator actually wants.
              </p>
              <div className="btn-row mt-4">
                <Link href="/research" className="btn">
                  Research & engineering
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 09 — Invitation                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h2 className="cta__title">
              Build the next version <em className="serif-italic">with us</em>.
            </h2>
            <p className="body-2" style={{ maxWidth: "48ch" }}>
              We are looking for students who want to build hardware that has to work, and for
              partners who want their name on a machine that goes where people cannot.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/join" className="btn btn--solid">
              Join the team <span aria-hidden="true">→</span>
            </Link>
            <Link href="/partners" className="btn">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
