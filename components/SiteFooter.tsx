import Link from "next/link";

import { site } from "@/data/content";
import { media } from "@/lib/asset";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/research", label: "Research & engineering" },
      { href: "/journey", label: "Journey" },
      { href: "/team", label: "Team" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/partners", label: "Partners" },
      { href: "/join", label: "Join the team" },
      { href: "/contact", label: "Contact" },
      { href: "/webmasters", label: "Site credits" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img
              className="footer-brand__logo"
              src={media("aboutuslogo")}
              alt="UIU Rescue Rover Team emblem"
              width={34}
              height={34}
            />
            <p className="small" style={{ maxWidth: "34ch" }}>
              A student engineering team at United International University, Dhaka, building
              tracked rovers for urban search and rescue research.
            </p>
            <p className="mono mt-3" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
              {site.lab}
              <br />
              {site.address.street}, {site.address.locality}
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="footer-col__title">{col.title}</h2>
              <ul className="footer-list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} UIU Rescue Rover Team</span>
          <span>
            <a className="link" href={`mailto:${site.email}`} style={{ color: "inherit" }}>
              {site.email}
            </a>
          </span>
          <span>
            {site.socials.map((s, i) => (
              <span key={s.href}>
                {i > 0 && " · "}
                <a
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ borderBottom: "1px solid var(--rule-strong)" }}
                >
                  {s.label}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
