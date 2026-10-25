"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { navigation, site } from "@/data/content";
import { media } from "@/lib/asset";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes and returns focus to the trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/` || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <img className="brand__mark" src={media("aboutuslogo")} alt="" width={36} height={36} />
          <span className="brand__text">
            <span className="brand__name">UIU Rescue Rover</span>
            <span className="brand__sub">Team · Est. 2024</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/join" className="nav-cta">
          Join the team
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" id={panelId}>
          <nav className="container" aria-label="Mobile">
            <ul className="nav-mobile__list">
              {navigation.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-mobile__link"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                    <span className="nav-mobile__num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/join" className="nav-mobile__link">
                  Join the team
                  <span className="nav-mobile__num" aria-hidden="true">
                    {String(navigation.length + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
