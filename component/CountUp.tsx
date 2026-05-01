"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CountUp — when scrolled into view, scrambles random characters in place
 * before resolving to the target value. Works for any string (numbers,
 * symbols, words like "Zero").
 *
 * Pass `target` as the final string. The component reveals each character
 * left-to-right with a brief scramble window per char.
 */
const SCRAMBLE_CHARS = "0123456789!*<>+-/\\#$%@&=?█▓▒░";

export default function CountUp({
  target,
  duration = 1100,
  className = "",
}: {
  target: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(target.replace(/./g, " "));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOut(target);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        obs.disconnect();

        const start = performance.now();
        const len = target.length;
        let raf = 0;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Each char locks in at progress = (i + 1) / len
          const chars = target.split("").map((ch, i) => {
            const lockAt = (i + 1) / len;
            if (t >= lockAt || ch === " ") return ch;
            // Preserve non-alphanumeric structure (× ⁶ etc.) randomly too
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          });
          setOut(chars.join(""));
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setOut(target);
          }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {out}
    </span>
  );
}
