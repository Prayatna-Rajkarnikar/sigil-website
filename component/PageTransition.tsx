"use client";

import { usePathname } from "next/navigation";

/**
 * Tracer-bullet page transition. On every route change the wrapper is
 * remounted (keyed by pathname), so the CSS animations on both layers
 * fire fresh:
 *
 *   1. .bullet-streak  — a glowing horizontal tracer streaks across the
 *                        viewport left → right (~350ms, linear). White-hot
 *                        head with an orange tail.
 *   2. .bullet-content — the new page fades in with a small upward drift
 *                        (~500ms, ease-out, slight delay so the bullet
 *                        leads the reveal).
 *
 * No state, no effects — the keyed remount is the trigger. Honors
 * prefers-reduced-motion via the CSS rules in globals.css.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="bullet-wrap">
      <span className="bullet-streak" aria-hidden="true" />
      <div className="bullet-content">{children}</div>
    </div>
  );
}
