import type { Metadata } from "next";
import Link from "next/link";

import { Figure, PageHead, SectionHead } from "@/components/primitives";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "URRT is a student engineering team at United International University in Dhaka, building tracked rovers for urban search and rescue research.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="A student team with a hardware problem."
        lead="URRT was formed in September 2024 to build rescue robotics capability at United International University — not to demonstrate a concept, but to put a working machine in front of competition judges."
      />

      <section className="section">
        <div className="container">
          <div className="two-col two-col--offset">
            <div>
              <p className="statement">
                We are not trying to build a product. We are trying to build the competence to
                build one.
              </p>
            </div>
            <div className="stack">
              <p className="body-2">
                There is a difference between a robotics club and a robotics team. A club meets.
                A team has a specification, a deadline, a mass budget, and someone whose job is
                to notice when the arm you designed makes the chassis tip on a stair edge.
              </p>
              <p className="body-2">
                URRT is organised as the second thing. Work is divided into mechanical,
                electrical, and software &amp; autonomous sub-teams, with media, logistics and
                sponsorship functions alongside them. Everyone builds.
              </p>
              <p className="body-2">
                The team is hosted by the Center for Artificial Intelligence Research at UIU,
                which provides the lab, the fabrication access and the faculty supervision that
                make a project like this possible at undergraduate level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="01 — History"
            title="Eighteen months, two machines."
            note="A short record, because the team is young. We would rather state it precisely than inflate it."
          />

          <div className="two-col">
            <div className="stack">
              <h3 className="h3">September 2024 — formation</h3>
              <p className="body-2">
                The team was established with a single objective: develop autonomous robotic
                systems capable of operating in disaster zones, and represent Bangladesh at
                RoboCup Rescue. The first year was spent on fundamentals — CAD practice,
                drivetrain experiments, and a sensor pipeline that could actually be debugged.
              </p>

              <h3 className="h3 mt-4">January 2025 — Zugbee X1</h3>
              <p className="body-2">
                The first prototype was completed. It was small, twin-tracked, and deliberately
                under-specified: a camera, ultrasonic rangefinders, a basic end effector. Its
                purpose was to establish the architecture — power, control, telemetry, logging —
                that a more ambitious platform could inherit.
              </p>

              <h3 className="h3 mt-4">2025 onward — AEGIS</h3>
              <p className="body-2">
                Design moved to a tracked platform with articulated flippers, a LiDAR and
                depth-camera perception stack, and a six-degree-of-freedom manipulator. AEGIS is
                in development and is the platform the team is building toward competition.
              </p>
            </div>

            <div className="stack">
              <div className="notice">
                <h2>What this page does not claim</h2>
                <p>
                  URRT has not published a verified competition record. The team prepared and
                  submitted qualification material for the RoboCup Rescue 2026 cycle; whether it
                  competed, and with what result, is not established in any public source and is
                  therefore not stated.
                </p>
                <p>
                  Earlier versions of this website presented awards belonging to a different UIU
                  team as URRT&apos;s own. Those claims have been removed. See the audit note at{" "}
                  <Link className="link" href="/journey">
                    Journey
                  </Link>
                  .
                </p>
              </div>

              <Figure
                src="ho1"
                alt="Faculty members and students gathered around a laptop beside a rover during a demonstration in the workshop."
                caption="A design review with faculty in the CAIR workshop."
                width={940}
                height={642}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02 — Philosophy"
            title="Three commitments."
            note="The rules we hold ourselves to when a design decision is contested."
          />

          <div className="two-col">
            <div className="stack">
              <h3 className="h3">Measure, then claim</h3>
              <p className="body-2">
                A number without a method behind it is a marketing artefact. If we publish a
                payload figure it will come with the test that produced it. Until then the spec
                table says &ldquo;in development&rdquo;, which is the honest answer.
              </p>
            </div>
            <div className="stack">
              <h3 className="h3">Build the test before the feature</h3>
              <p className="body-2">
                The plywood step rig came before the flippers were finalised, not after. If we
                cannot construct the obstacle that proves a mechanism works, we do not yet
                understand the requirement.
              </p>
            </div>
          </div>

          <div className="two-col mt-4">
            <div className="stack">
              <h3 className="h3">Design for the operator</h3>
              <p className="body-2">
                The person driving the rover is inside a tent, under time pressure, looking at a
                screen. Every decision about autonomy is really a decision about how much of
                their attention we are willing to consume.
              </p>
            </div>
            <div className="stack">
              <h3 className="h3">Institutional context</h3>
              <p className="body-2">
                The team operates under {site.legal}, with faculty advisors from the Department
                of Computer Science and Engineering, and lab space provided by{" "}
                <a className="link" href="https://www.uiu.ac.bd/cair/" target="_blank" rel="noopener noreferrer">
                  CAIR
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__grid">
          <div>
            <h2 className="cta__title">See what we have built.</h2>
            <p className="body-2" style={{ maxWidth: "44ch" }}>
              Two platforms, documented with their specifications, subsystems and limitations.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/projects" className="btn btn--solid">
              Projects <span aria-hidden="true">→</span>
            </Link>
            <Link href="/team" className="btn">
              The team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
