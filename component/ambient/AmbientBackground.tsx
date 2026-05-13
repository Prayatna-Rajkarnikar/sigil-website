"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * AmbientBackground — wraps a list of background "variants" (e.g.,
 * AuroraPortal, OrbsVariant, MeshVariant) and crossfades between them
 * on a fixed interval. If only one variant is passed, it just renders
 * that variant statically.
 *
 * Use inside a section with `position: relative; overflow: hidden`.
 * The wrapper sits absolute and behind content (z-index: 0); the page
 * content should be `position: relative` so it stacks on top.
 *
 * Honors prefers-reduced-motion: if set, the cycler holds on the first
 * variant and never advances (individual variants drop their own
 * animations via media query).
 */
export default function AmbientBackground({
  variants,
  intervalMs = 60_000,
  fadeMs = 3_000,
}: {
  variants: ReactNode[];
  intervalMs?: number;
  fadeMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (variants.length < 2) return;
    /* prefers-reduced-motion → hold on the first variant. */
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % variants.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [variants.length, intervalMs]);

  return (
    <div
      className="ambient-bg"
      style={{ "--ambient-fade-ms": `${fadeMs}ms` } as React.CSSProperties}
      aria-hidden
    >
      {variants.map((v, i) => (
        <div
          key={i}
          className={`ambient-bg-layer${i === index ? " is-current" : ""}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
}
