"use client";

import { useEffect, useRef, useState } from "react";

export default function TacticalCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduceMotion ? 1 : 0.35;

    setEnabled(true);

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * ease;
      curY += (targetY - curY) * ease;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => ref.current?.classList.add("cursor-active");
    const onUp = () => ref.current?.classList.remove("cursor-active");
    const onOverInteractive = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, input, textarea, [role=button]")) {
        ref.current?.classList.add("cursor-hover");
      } else {
        ref.current?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOverInteractive);
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("tactical-cursor-on");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOverInteractive);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("tactical-cursor-on");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="tactical-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="3" fill="var(--primary)" />
        <circle cx="20" cy="20" r="14" stroke="var(--primary)" strokeWidth="1" opacity="0.6" />
        <line x1="20" y1="2" x2="20" y2="9" stroke="var(--primary)" strokeWidth="1" />
        <line x1="20" y1="31" x2="20" y2="38" stroke="var(--primary)" strokeWidth="1" />
        <line x1="2" y1="20" x2="9" y2="20" stroke="var(--primary)" strokeWidth="1" />
        <line x1="31" y1="20" x2="38" y2="20" stroke="var(--primary)" strokeWidth="1" />
      </svg>
    </div>
  );
}
