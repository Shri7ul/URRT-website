"use client";

import { useState } from "react";

import { site } from "@/data/content";

type Field =
  | { name: string; label: string; type: "text" | "email" | "tel"; required?: boolean; hint?: string }
  | { name: string; label: string; type: "select"; required?: boolean; options: string[] }
  | { name: string; label: string; type: "textarea"; required?: boolean; rows?: number };

/**
 * Honest contact form.
 *
 * There is no backend on this site, so the form does not pretend to have one.
 * It composes a mailto: URI and hands the message to the user's mail client.
 * The original site's forms had no action attribute at all and still displayed
 * "MESSAGE TRANSMITTED" — see content-audit/factual-issues.md S1-03.
 */
export function MailtoForm({
  fields,
  subjectPrefix,
  submitLabel = "Compose message",
  note,
}: {
  fields: Field[];
  subjectPrefix: string;
  submitLabel?: string;
  note?: string;
}) {
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines: string[] = [];

    for (const f of fields) {
      const v = String(data.get(f.name) ?? "").trim();
      if (v) lines.push(`${f.label}: ${v}`);
    }

    const subject = `${subjectPrefix} — ${String(data.get("name") ?? "").trim() || "Website enquiry"}`;
    const body = `${lines.join("\n")}\n\n—\nSent from ${site.url}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(href);
    window.location.href = href;
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__grid">
        {fields.map((f) => {
          const id = `f-${f.name}`;
          const req = "required" in f && f.required;
          return (
            <div className={`form__field ${f.type === "textarea" ? "form__field--full" : ""}`} key={f.name}>
              <label htmlFor={id}>
                {f.label}
                {req && <span aria-hidden="true"> *</span>}
              </label>

              {f.type === "textarea" ? (
                <textarea id={id} name={f.name} rows={f.rows ?? 5} required={req} />
              ) : f.type === "select" ? (
                <select id={id} name={f.name} required={req} defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input id={id} name={f.name} type={f.type} required={req} autoComplete="off" />
              )}

              {"hint" in f && f.hint && <p className="form__hint">{f.hint}</p>}
            </div>
          );
        })}
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--solid">
          {submitLabel} <span aria-hidden="true">→</span>
        </button>
        <p className="form__note">
          {note ??
            "This opens your email app with the message pre-filled. Nothing is stored on this site."}
        </p>
      </div>

      {sent && (
        <div className="form__status" role="status">
          <strong>Your email app should have opened.</strong> If nothing happened,{" "}
          <a className="link" href={sent}>
            open the message directly
          </a>{" "}
          or email <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}
    </form>
  );
}
