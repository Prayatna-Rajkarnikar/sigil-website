"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * MagneticButton — wraps a child element and pulls it gently toward the cursor
 * when the cursor enters a proximity radius. Pure transform, no layout shift.
 * Disabled on touch and reduced-motion users.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  radius = 140,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduce) return;

    let raf = 0;
    let curX = 0;
    let curY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const falloff = 1 - dist / radius;
        targetX = dx * strength * falloff;
        targetY = dy * strength * falloff;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const tick = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
