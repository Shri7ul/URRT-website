import type { Metadata } from "next";

import { Chip, PageHead } from "@/components/primitives";
import { site } from "@/data/content";
import { media } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Team gear",
  description: "Official URRT team merchandise — cap and jersey from the 2026 drop.",
  alternates: { canonical: "/gear" },
};

const items = [
  {
    ref: "01",
    kind: "Cap",
    name: "URRT Rescue Cap",
    image: "cap",
    alt: "An embroidered baseball cap in the team's charcoal and red colourway.",
    specs: [
      "Embroidered URRT logo, front and back",
      "Adjustable strap — one size fits most",
      "Structured crown",
      "Charcoal and red colourway",
    ],
  },
  {
    ref: "02",
    kind: "Jersey",
    name: "URRT Rescue Tee",
    image: "tshirt",
    alt: "The team jersey, printed with the URRT insignia and wordmark.",
    specs: [
      "Moisture-wicking fabric",
      "Screen-printed insignia and wordmark",
      "Sizes S, M, L, XL",
    ],
  },
];

export default function GearPage() {
  return (
    <>
      <PageHead
        eyebrow="Team gear"
        title="Two pieces, members only."
        lead="Team merchandise produced for the 2026 cycle. This is not a shop — there is no checkout, no stock system and no published price."
      >
        <div className="mt-3">
          <Chip>Enquiry only</Chip>
        </div>
      </PageHead>

      <section className="section">
        <div className="container">
          <div className="two-col">
            {items.map((item) => (
              <article key={item.ref}>
                <img
                  src={media(item.image)}
                  alt={item.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", background: "var(--paper-3)" }}
                />
                <div className="project-row__meta mt-3">
                  <span className="mono">
                    {item.ref} / {item.kind}
                  </span>
                </div>
                <h2 className="h3">{item.name}</h2>
                <ul className="method-list mt-3">
                  {item.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="mt-3">
                  <a
                    className="link"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`Gear enquiry — ${item.name}`)}`}
                  >
                    Enquire about this item →
                  </a>
                </p>
              </article>
            ))}
          </div>

          <div className="notice mt-5">
            <h2>Why there is no shop here</h2>
            <p>
              The previous site described a &ldquo;limited edition drop&rdquo; with no price, no
              size availability and no ordering mechanism — the only action was an enquiry. We
              have kept the catalogue and dropped the retail framing, because a page that looks
              like a store but cannot take an order wastes everyone&apos;s time.
            </p>
            <p>
              If the team sets up real ordering, this page can become a shop. Until then, email
              us.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
