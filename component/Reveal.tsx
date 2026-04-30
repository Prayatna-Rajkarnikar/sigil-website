"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal — wraps content with an IntersectionObserver-driven entrance.
 * Supports directional slide-ins: up (default), left, right, scale.
 *
 * Pair siblings with `delay` (ms) for a stagger effect.
 * Honors prefers-reduced-motion (no animation, no transition).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
  dir = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  dir?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-reveal
      data-dir={dir}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
