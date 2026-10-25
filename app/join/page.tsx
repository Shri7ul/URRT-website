import type { Metadata } from "next";
import Link from "next/link";

import { MailtoForm } from "@/components/MailtoForm";
import { Chip, PageHead, SectionHead } from "@/components/primitives";
import { recruitment, site } from "@/data/content";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "Sub-teams, requirements and how to apply to the UIU Rescue Rover Team.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  const isOpen = recruitment.status === "open";

  return (
    <>
      <PageHead
        eyebrow="Join us"
        title={isOpen ? "Recruitment is open." : "Applications are currently closed."}
        lead={
          isOpen
            ? "We are recruiting across all sub-teams. Read the requirements, then apply."
            : "The current intake has closed. We still read introductions from students who want to build hardware — email us and we will tell you when the next cycle opens."
        }
      >
        <div className="mt-3">
          <Chip tone={isOpen ? "ok" : "warn"}>{isOpen ? "Open" : "Closed"}</Chip>
        </div>
      </PageHead>

      <section className="section-tight">
        <div className="container">
          <div className="notice">
            <h2>Why this page says &ldquo;closed&rdquo;</h2>
            <p>
              The previous site displayed two different deadlines simultaneously — 1 March 2026
              in one panel and 13 March 2025 in another — while still announcing
              &ldquo;recruiting now&rdquo;. Both dates are in the past. Rather than publish either
              one, this page shows a closed state until the team supplies a single authoritative
              deadline.
            </p>
            <p>
              To apply outside a recruitment cycle, email{" "}
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              with your student ID, department and the sub-team you are interested in.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01 — Facts"
            title="What the commitment is."
            note="Requirements quoted from the team's own recruitment page."
          />

          <div className="spec">
            <div className="spec__row">
              <dt className="spec__key">Eligibility</dt>
              <dd className="spec__val">{recruitment.eligibility}</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Commitment</dt>
              <dd className="spec__val">{recruitment.commitment}</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Cycle</dt>
              <dd className="spec__val">{recruitment.cycle}</dd>
            </div>
            <div className="spec__row">
              <dt className="spec__key">Deadline</dt>
              <dd className="spec__val">
                {recruitment.deadline ?? "Not published — contact the team"}
              </dd>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="02 — Sub-teams"
            title="Six ways to contribute."
            note="You do not need prior robotics experience for every role. The requirements below are what the team asks for, not a filter we apply."
          />

          <div className="two-col">
            {recruitment.disciplines.map((d) => (
              <div className="stack" key={d.name}>
                <h3 className="h3">{d.name}</h3>
                <p className="body-2">{d.needs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03 — Apply"
            title="Write to us."
            note="This form composes an email in your own mail client. Nothing is submitted to this website, and nothing is stored."
          />

          <MailtoForm
            subjectPrefix="URRT application"
            submitLabel="Compose application"
            fields={[
              { name: "name", label: "Full name", type: "text", required: true, hint: "As it appears in university records" },
              { name: "studentId", label: "Student ID", type: "text", required: true, hint: "Nine-digit UIU ID" },
              { name: "department", label: "Department", type: "text", required: true },
              { name: "subteam", label: "Sub-team", type: "select", required: true, options: recruitment.disciplines.map((d) => d.name) },
              { name: "message", label: "Why this sub-team", type: "textarea", required: true, rows: 6 },
            ]}
          />

          <p className="small mt-4">
            Prefer email? Write to{" "}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            . See also{" "}
            <Link className="link" href="/contact">
              contact details and lab hours
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
