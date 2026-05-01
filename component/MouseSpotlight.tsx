"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MouseSpotlight — fixed full-viewport overlay that renders a soft orange
 * radial gradient at the cursor position, lerped toward target for
 * silky motion. Sits behind content (z-index < 0 on the gradient layer
 * via pointer-events-none and fixed inset-0).
 *
 * Disabled on touch and reduced-motion users.
 */
export default function MouseSpotlight({
  size = 600,
  intensity = 0.16,
}: {
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduce) return;
    setEnabled(true);

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let targetX = curX;
    let targetY = curY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.background = `radial-gradient(${size}px circle at ${curX}px ${curY}px, rgba(255, 121, 27, ${intensity}), transparent 70%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [size, intensity]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen"
    />
  );
}
