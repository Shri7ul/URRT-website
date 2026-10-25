"use client";

import { useId, useRef, useState } from "react";

import type { Subsystem } from "@/lib/types";

/**
 * Subsystem explorer.
 *
 * The schematic is a drawn side elevation, not a photograph — it can be labelled
 * honestly, it scales, and it costs almost nothing to load. The three hotspots
 * are a tablist: arrow keys move between them, Home/End jump to the ends, and the
 * panel below is a labelled tabpanel.
 */
export function SubsystemExplorer({ subsystems }: { subsystems: Subsystem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;

  const focusTab = (i: number) => {
    const next = (i + subsystems.length) % subsystems.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(subsystems.length - 1);
        break;
    }
  };

  const current = subsystems[active];

  return (
    <div className="explorer">
      <div className="explorer__diagram">
        <svg
          viewBox="0 0 1000 560"
          role="img"
          aria-label="Side elevation of the rover showing tracks, flippers, sensor mast and manipulator arm."
          className="explorer__svg"
        >
          <g className="explorer__base">
            {/* ground */}
            <line x1="40" y1="470" x2="960" y2="470" strokeDasharray="4 8" />
            {/* chassis */}
            <rect x="250" y="248" width="330" height="56" rx="4" />
            <rect x="286" y="222" width="120" height="28" rx="3" />
          </g>

          {/* Locomotion */}
          <g className="explorer__part" data-active={current.id === "locomotion"}>
            <rect x="196" y="300" width="418" height="168" rx="62" />
            <rect x="214" y="318" width="382" height="132" rx="50" />
            <circle cx="258" cy="384" r="34" />
            <circle cx="354" cy="384" r="26" />
            <circle cx="450" cy="384" r="26" />
            <circle cx="548" cy="384" r="34" />
            {/* front flipper */}
            <path d="M608 302 L700 236 L726 264 L634 330 Z" />
            {/* rear flipper */}
            <path d="M198 302 L110 240 L136 212 L224 274 Z" />
            {/* flipper pivots */}
            <circle cx="608" cy="306" r="7" />
            <circle cx="198" cy="306" r="7" />
          </g>

          {/* Perception */}
          <g className="explorer__part" data-active={current.id === "perception"}>
            <line x1="470" y1="248" x2="470" y2="150" />
            <ellipse cx="470" cy="140" rx="42" ry="14" />
            <rect x="392" y="196" width="34" height="24" rx="3" />
            <path d="M356 208 L392 208" strokeDasharray="6 6" />
            <path d="M470 168 L520 196" strokeDasharray="6 6" />
          </g>

          {/* Manipulation */}
          <g className="explorer__part" data-active={current.id === "manipulation"}>
            <line x1="566" y1="248" x2="678" y2="150" />
            <line x1="678" y1="150" x2="790" y2="112" />
            <line x1="790" y1="112" x2="866" y2="150" />
            <circle cx="566" cy="248" r="17" />
            <circle cx="678" cy="150" r="14" />
            <circle cx="790" cy="112" r="12" />
            <path d="M866 150 L896 138 M866 150 L896 164" />
          </g>

          {/* Hotspot markers (decorative — the tablist is the real control) */}
          {subsystems.map((s, i) => (
            <g
              key={s.id}
              className="explorer__marker"
              data-active={i === active}
              aria-hidden="true"
            >
              <circle cx={s.x} cy={s.y} r="9" />
              <circle cx={s.x} cy={s.y} r="20" className="explorer__marker-ring" />
            </g>
          ))}
        </svg>
      </div>

      <div
        className="explorer__tabs"
        role="tablist"
        aria-label="Rover subsystems"
      >
        {subsystems.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={tabId(i)}
            aria-selected={i === active}
            aria-controls={panelId}
            tabIndex={i === active ? 0 : -1}
            className="explorer__tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className="explorer__tab-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="explorer__tab-name">{s.name}</span>
            <span className="explorer__tab-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div
        className="explorer__panel"
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
      >
        <h3>{current.name}</h3>
        <p className="explorer__summary">{current.summary}</p>
        <p className="body-2">{current.detail}</p>
      </div>
    </div>
  );
}
