import type { Metadata } from "next";

import { MailtoForm } from "@/components/MailtoForm";
import { PageHead, SectionHead } from "@/components/primitives";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the UIU Rescue Rover Team at CAIR Lab, United International University, Dhaka.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    q: "How can I join the team?",
    a: "Recruitment runs in cycles. When a cycle is open the Join page lists the deadline and requirements. Outside a cycle, email us with your student ID, department and the sub-team you are interested in.",
  },
  {
    q: "How can my organisation sponsor URRT?",
    a: "Email us with the subject line Sponsorship. We will send a short document describing what the team is building, what the current costs are, and what recognition we can offer. We do not have a pre-packaged tier structure.",
  },
  {
    q: "What competitions is the team working toward?",
    a: "The team prepared qualification material for the RoboCup Rescue League 2026 cycle. RoboCup 2026 was held in Incheon, South Korea, from 30 June to 6 July 2026. URRT's participation and results are not published and are not claimed on this site.",
  },
  {
    q: "Can external researchers collaborate?",
    a: "Yes. We are interested in collaboration on perception, localisation and shared control. Email us with a short description of the work and what you would need from the team.",
  },
  {
    q: "Can I visit the lab?",
    a: "The lab is on the fourth floor of the academic building and is accessible during campus hours. Please email ahead so someone is available to show you around.",
  },
  {
    q: "Is the rover available for demonstrations?",
    a: "Sometimes, depending on the academic calendar and whether the platform is in a testable state. Write to us with dates and the audience.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Talk to the team."
        lead="For collaboration, sponsorship, recruitment or press. Email reaches the team directly; the form below composes a message in your own mail client."
      />

      <section className="section-tight">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 className="mono mb-3" style={{ color: "var(--ink-3)" }}>
                Direct
              </h2>
              <dl className="spec">
                <div className="spec__row">
                  <dt className="spec__key">Email</dt>
                  <dd className="spec__val">
                    <a className="link" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="spec__row">
                  <dt className="spec__key">Phone</dt>
                  <dd className="spec__val">
                    <a className="link" href={`tel:${site.phoneHref}`}>
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="spec__row">
                  <dt className="spec__key">Lab</dt>
                  <dd className="spec__val">{site.lab}</dd>
                </div>
                <div className="spec__row">
                  <dt className="spec__key">Address</dt>
                  <dd className="spec__val">
                    {site.address.street}, {site.address.locality}, {site.address.country}
                  </dd>
                </div>
                <div className="spec__row">
                  <dt className="spec__key">Hours</dt>
                  <dd className="spec__val">
                    {site.hours}
                    <br />
                    <span style={{ color: "var(--ink-3)" }}>{site.hoursClosed}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="mono mb-3" style={{ color: "var(--ink-3)" }}>
                Find the campus
              </h2>
              <div style={{ border: "1px solid var(--rule)" }}>
                <iframe
                  title="Map showing United International University, Dhaka"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.598346556767!2d90.42461497504862!3d23.79810607863617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b33c7b87cd%3A0x8c3881b66eeb7e0c!2sUnited%20International%20University!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="small mt-2">
                <a
                  className="link"
                  href="https://maps.app.goo.gl/CwgAxRgJQgHv7Vjq8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead
            index="01 — Message"
            title="Send a message."
            note="This form opens your email app with everything pre-filled. No data is sent to or stored on this website."
          />

          <MailtoForm
            subjectPrefix="URRT enquiry"
            submitLabel="Compose message"
            fields={[
              { name: "name", label: "Full name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "organisation", label: "Organisation", type: "text" },
              {
                name: "subject",
                label: "Subject",
                type: "select",
                required: true,
                options: ["Team enquiry", "Collaboration", "Sponsorship", "Recruitment", "Media / press", "Other"],
              },
              { name: "message", label: "Message", type: "textarea", required: true, rows: 7 },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02 — FAQ"
            title="Common questions."
            note="Answered plainly, including the ones where the honest answer is that we do not have a verified figure."
          />

          <div className="faq">
            {faqs.map((f) => (
              <details className="faq__item" key={f.q}>
                <summary>
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p className="faq__answer">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
