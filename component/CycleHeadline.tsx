"use client";

import { useEffect, useState } from "react";

/**
 * CycleHeadline — rotates through a list of phrases on an interval.
 * The phrase fades + slides up smoothly. Honors prefers-reduced-motion
 * (renders the first word without cycling).
 */
export default function CycleHeadline({
  words = [
    "the future",
    "the launch",
    "the rollout",
    "the next move",
    "tomorrow",
  ],
  intervalMs = 2600,
  className = "",
}: {
  words?: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setEnabled(true);
    const id = setInterval(() => {
      setI((v) => (v + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, words.length]);

  // Static fallback for reduced motion
  if (!enabled) return <span className={className}>{words[0]}</span>;

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      aria-live="polite"
    >
      {/* Invisible widest word reserves the layout space so the headline
          doesn't reflow on every cycle */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {words.reduce((a, b) => (b.length > a.length ? b : a), words[0])}
      </span>

      {words.map((w, idx) => (
        <span
          key={w}
          className="absolute left-0 top-0 whitespace-nowrap transition-all duration-700 ease-out"
          style={{
            opacity: idx === i ? 1 : 0,
            transform:
              idx === i
                ? "translateY(0) skewY(0deg)"
                : "translateY(-16px) skewY(-2deg)",
            filter: idx === i ? "blur(0)" : "blur(4px)",
          }}
          aria-hidden={idx !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
