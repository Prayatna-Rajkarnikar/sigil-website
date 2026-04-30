"use client";

import { useEffect, useRef } from "react";
import { inter } from "@/app/font";

/**
 * HeroOrbitLabels — three labels revolve around the robot head along a
 * faint elliptical ring. Smooth, continuous, slow (45s per revolution).
 * Text stays upright (we only animate position, not rotation).
 *
 * Each label sits on the ring at its current angle; they're spaced 120°
 * apart and orbit in unison.
 */

const LABELS = ["Actors", "Environments", "Decisions"];
const PERIOD_MS = 45_000; // one full revolution
/* radius as percentage of container w/h — defines the elliptical orbit */
const RADIUS_X = 41;
const RADIUS_Y = 40;

export default function HeroOrbitLabels() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      /* offset by -90° so the first label starts at the TOP of the ring */
      const baseDeg = reduce ? -90 : (elapsed / PERIOD_MS) * 360 - 90;

      const container = ringRef.current;
      if (!container) {
        if (!reduce) raf = requestAnimationFrame(tick);
        return;
      }

      const labels = container.querySelectorAll<HTMLElement>(".orbit-label");
      labels.forEach((label, i) => {
        const deg = baseDeg + i * 120;
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * RADIUS_X;
        const y = Math.sin(rad) * RADIUS_Y;
        label.style.left = `calc(50% + ${x}%)`;
        label.style.top = `calc(50% + ${y}%)`;
        /* gentle opacity dip when label crosses behind/below the head's
           midline — preserves a sense of depth without true 3D occlusion */
        const depth = (Math.sin(rad) + 1) / 2; /* 0 (top) → 1 (bottom) */
        label.style.opacity = `${0.55 + (1 - depth) * 0.45}`;
      });

      if (!reduce) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ringRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* Faint orbital ring — full ellipse */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="50"
          rx={RADIUS_X}
          ry={RADIUS_Y}
          stroke="rgba(232,232,228,0.18)"
          strokeWidth="0.12"
          fill="none"
        />
      </svg>

      {/* Labels — center anchored on the orbit point, text upright */}
      {LABELS.map((label) => (
        <div
          key={label}
          className={`orbit-label absolute -translate-x-1/2 -translate-y-1/2 ${inter.className} flex items-center gap-2 whitespace-nowrap text-[14px] font-light tracking-wide text-foreground/90`}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-foreground/60" />
          {label}
        </div>
      ))}
    </div>
  );
}
