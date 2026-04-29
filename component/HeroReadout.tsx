"use client";

import { useEffect, useState } from "react";

function fmt(n: number) {
  return n.toString().padStart(2, "0");
}

export default function HeroReadout() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const utc = now
    ? `${fmt(now.getUTCHours())}:${fmt(now.getUTCMinutes())}:${fmt(now.getUTCSeconds())}`
    : "--:--:--";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping-slow"></span>
        <span className="text-primary">// SIGIL.OPS — LIVE</span>
        <span className="hidden sm:inline">/ NODE 04</span>
      </div>
      <div className="hidden gap-6 md:flex">
        <span>LAT 38.8951</span>
        <span>LON -77.0364</span>
        <span>
          UTC <span className="text-primary tabular-nums">{utc}</span>
        </span>
      </div>
    </div>
  );
}
