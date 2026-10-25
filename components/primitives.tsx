import type { ReactNode } from "react";

import { media } from "@/lib/asset";
import type { SpecRow } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Section head — chapter marker used across the site                         */
/* -------------------------------------------------------------------------- */

export function SectionHead({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <div className="section-head">
      <span className="section-head__index">{index}</span>
      <div className="section-head__body">
        <h2 id={id}>{title}</h2>
        {note && <p className="section-head__note">{note}</p>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page head                                                                  */
/* -------------------------------------------------------------------------- */

export function PageHead({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div className="container">
        <span className="page-head__eyebrow">{eyebrow}</span>
        <h1 className="page-head__title">{title}</h1>
        {lead && <p className="page-head__lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Figure                                                                     */
/* -------------------------------------------------------------------------- */

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  className,
  sizes = "(max-width: 900px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={`figure ${className ?? ""}`}>
      <div className="figure__media">
        <img
          className="figure__img"
          src={media(src)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          sizes={sizes}
        />
      </div>
      {caption && <figcaption className="figure__cap">{caption}</figcaption>}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Status chip                                                                */
/* -------------------------------------------------------------------------- */

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "signal";
}) {
  const cls = tone === "neutral" ? "chip" : `chip chip--${tone}`;
  return <span className={cls}>{children}</span>;
}

/* -------------------------------------------------------------------------- */
/*  Spec table                                                                 */
/* -------------------------------------------------------------------------- */

export function SpecTable({ rows, caption }: { rows: SpecRow[]; caption?: string }) {
  return (
    <div>
      <dl className="spec">
        {rows.map((row) => (
          <div className="spec__row" key={row.key}>
            <dt className="spec__key">{row.key}</dt>
            <dd className="spec__val">{row.value}</dd>
          </div>
        ))}
      </dl>
      {caption && (
        <p className="mono mt-2" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Arrow link                                                                 */
/* -------------------------------------------------------------------------- */

export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const rel = external ? { rel: "noopener noreferrer", target: "_blank" } : {};
  return (
    <a href={href} className="link" {...rel} style={{ display: "inline-flex", gap: "0.4rem" }}>
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
