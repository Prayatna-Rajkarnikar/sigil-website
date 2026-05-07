"use client";

import { useEffect, useState } from "react";
import { PRIMARY_RGB } from "@/lib/theme";

/**
 * ScrollProgress — thin primary-color bar pinned to the top of the page
 * that fills as the user scrolls. Subtle premium touch.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition: "width 80ms linear",
          boxShadow:
            progress > 0.5 ? `0 0 8px rgba(${PRIMARY_RGB}, 0.55)` : "none",
        }}
      />
    </div>
  );
}
