import type { Metadata } from "next";
import Link from "next/link";

import { Chip, PageHead } from "@/components/primitives";
import { projects } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Two generations of rescue rover engineering from URRT: the Zugbee X1 first prototype and AEGIS, the current tracked platform.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHead
        eyebrow="Projects"
        title="Two prototypes, in order."
        lead="A first testbed and a competition-oriented platform. Both are documented here with the specifications the team has published — and with what remains unmeasured."
      />

      <section className="section">
        <div className="container">
          <div className="project-row">
            <div className="project-row__media">
              <img
                src={media("prototype-x1")}
                alt="Zugbee X1, a small twin-track rover with red tracks, photographed on grass outside a university building."
                width={1600}
                height={900}
                loading="eager"
                decoding="sync"
              />
            </div>
            <div>
              <div className="project-row__meta">
                <span className="mono">V1 · Completed January 2025</span>
                <Chip tone="ok">Legacy</Chip>
              </div>
              <h2 className="project-row__name">Zugbee X1</h2>
              <p className="project-row__desc">
                The first platform. Twin-track chassis, camera and ultrasonic sensing, basic end
                effector — built to prove the pipeline before investing in the hardware AEGIS
                now carries.
              </p>
              <Link href="/projects/zugbee-x1" className="btn">
                Open the record <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="project-row project-row--flip">
            <div className="project-row__media">
              <img
                src={media("t1")}
                alt="AEGIS, a tracked rover with orange tracks and a six-degree-of-freedom arm raised, in the workshop."
                width={1600}
                height={1204}
                loading="eager"
                decoding="sync"
              />
            </div>
            <div>
              <div className="project-row__meta">
                <span className="mono">V2 · 2025–present</span>
                <Chip tone="signal">In development</Chip>
              </div>
              <h2 className="project-row__name">AEGIS</h2>
              <p className="project-row__desc">
                The current platform. Tracks with articulated flippers, a LiDAR and depth-camera
                perception stack, and a six-degree-of-freedom manipulator for confined spaces.
              </p>
              <Link href="/projects/aegis" className="btn btn--solid">
                Open the record <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="h2">A note on specifications</h2>
            </div>
            <div className="stack">
              <p className="body-2">
                Neither project page lists payload, endurance, top speed, stair height or
                runtime. Those numbers do not appear in any source the team has published, and
                inventing them would make the rest of this site worthless.
              </p>
              <p className="body-2">
                What is published is what the team has stated: platform class, locomotion type,
                manipulator degrees of freedom, and sensor families. Where a published
                specification conflicts with photographic evidence — as it does for Zugbee X1 —
                the record says so rather than picking the flattering version.
              </p>
              <p className="mono">
                {projects.length} platforms · 0 unverified performance figures
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
