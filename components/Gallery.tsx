"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { media } from "@/lib/asset";
import type { GalleryImage } from "@/lib/types";

/**
 * Project gallery with a keyboard-operable lightbox.
 * Esc closes and restores focus; ← → move between images; focus is trapped
 * inside the dialog while it is open.
 */
export function Gallery({ images, label }: { images: GalleryImage[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    const last = open;
    setOpen(null);
    if (last !== null) triggerRefs.current[last]?.focus();
  }, [open]);

  const step = useCallback(
    (dir: number) => {
      setOpen((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        // trap focus within the dialog
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const active = open === null ? null : images[open];

  return (
    <>
      <ul className="gallery" aria-label={label}>
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className="gallery__item">
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              className="gallery__btn"
              onClick={() => setOpen(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.caption}`}
            >
              <img
                src={media(img.src)}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="gallery__img"
              />
              <span className="gallery__cap">{img.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — image ${(open ?? 0) + 1} of ${images.length}`}
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="lightbox__inner">
            <div className="lightbox__bar">
              <span className="lightbox__count">
                {String((open ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                ref={closeRef}
                type="button"
                className="lightbox__close"
                onClick={close}
                aria-label="Close image viewer"
              >
                Close ✕
              </button>
            </div>
            <img src={media(active.src)} alt={active.alt} className="lightbox__img" />
            <p className="lightbox__cap">{active.caption}</p>
            <div className="lightbox__nav">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image">
                ← Prev
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next image">
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
