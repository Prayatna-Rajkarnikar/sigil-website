"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * KerningTransition — on every route change, re-mounts its child wrapper
 * with a fresh key so the CSS `kerning-enter` animation re-fires. The
 * animation collapses letter-spacing slightly and fades the page up,
 * giving a "type breathing in" feel between screens.
 */
export default function KerningTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [pathname]);

  return (
    <div key={animKey} className="kerning-enter">
      {children}
    </div>
  );
}
