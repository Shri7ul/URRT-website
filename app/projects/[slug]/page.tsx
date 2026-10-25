import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Gallery } from "@/components/Gallery";
import { SubsystemExplorer } from "@/components/SubsystemExplorer";
import { Chip, Figure, SectionHead, SpecTable } from "@/components/primitives";
import { getProject, projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.version}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.version}`,
      description: project.summary,
      images: [{ url: `/media/${project.hero.src}.webp` }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <div className="page-head">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.name}</span>
          </nav>

          <div className="project-row__meta">
            <span className="mono">{project.designation}</span>
            <Chip tone={project.status === "completed" ? "ok" : "signal"}>
              {project.statusLabel}
            </Chip>
          </div>

          <h1 className="page-head__title" style={{ maxWidth: "14ch" }}>
            {project.name}
          </h1>
          <p className="page-head__lead">{project.summary}</p>
        </div>
      </div>

      <section className="section-tight">
        <div className="container">
          <Figure
            src={project.hero.src}
            alt={project.hero.alt}
            caption={project.hero.caption}
            width={1600}
            height={1204}
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
          />
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="two-col">
            <div className="stack">
              <h2 className="h2">Overview</h2>
              <p className="body-2">{project.intro}</p>
              <p className="mono mt-3">
                Period · {project.period}
              </p>
            </div>

            <div>
              <h2 className="mono mb-3" style={{ color: "var(--ink-3)" }}>
                Technical specifications
              </h2>
              <SpecTable rows={project.specs} caption={project.specNote} />
              <p className="mt-3">
                <Chip tone={project.verification === "verified" ? "ok" : "warn"}>
                  {project.verification === "verified" ? "Cross-checked" : "Team-stated only"}
                </Chip>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="01 — Subsystems"
            title="How the machine is put together."
            note="Documented subsystems only. Select one to read its function and its design trade-off."
          />
          <SubsystemExplorer subsystems={project.subsystems} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02 — Record"
            title="Photographic record."
            note="Every image below is the team's own. Select any frame to enlarge it."
          />
          <Gallery images={project.gallery} label={`${project.name} photographs`} />
        </div>
      </section>

      <section className="section-tight band">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="h2">Limitations &amp; status</h2>
              <p className="mono mt-2">Read this before quoting anything on this page.</p>
            </div>
            <div>
              <ul className="prose">
                {project.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <nav className="container page-nav" aria-label="Project navigation">
        <Link href="/projects" className="page-nav__link">
          <span className="page-nav__dir">← All projects</span>
          <span className="page-nav__title">Projects</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="page-nav__link page-nav__link--next">
          <span className="page-nav__dir">Next platform →</span>
          <span className="page-nav__title">{next.name}</span>
        </Link>
      </nav>

      <div style={{ height: "clamp(3rem, 6vw, 5rem)" }} />
    </>
  );
}
