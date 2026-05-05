"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * PageTransition — fires a left→right orange wipe on every route change.
 * Uses pathname change as the trigger. The wipe runs in front of the
 * newly-mounted page; total duration ~700ms.
 *
 * Honors prefers-reduced-motion (no animation).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(0);
  const firstRender = useRef(true);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduce.current) return;
    setAnimKey((k) => k + 1);
  }, [pathname]);

  if (animKey === 0) return null;

  return (
    <div
      key={animKey}
      aria-hidden
      className="page-transition pointer-events-none fixed inset-0 z-[9998]"
    >
      {/* Sweep band — thick vertical bar with grid texture inside.
          The CSS animation runs once on mount and the element auto-removes
          itself by being unmounted on the next render. We force re-mount
          by changing the React key. */}
      <div className="page-transition-band" />
      {/* Leading edge — bright thin orange line that arrives first */}
      <div className="page-transition-edge" />
    </div>
  );
}
