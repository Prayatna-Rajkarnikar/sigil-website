"use client";

import { useEffect, useState } from "react";
import { exo } from "@/app/font";

type Spec = {
  label: string;
  base: number;
  jitter: number;
  decimals: number;
  suffix?: string;
  fmt?: (v: number) => string;
  pulse?: boolean;
};

const SPECS: Spec[] = [
  { label: "Adaptive", base: 98.4, jitter: 0.3, decimals: 1, suffix: "%", pulse: true },
  {
    label: "Throughput",
    base: 1.2,
    jitter: 0.06,
    decimals: 2,
    suffix: " sims/h",
    fmt: (v) => `${v.toFixed(2)}M`,
  },
  { label: "Autonomy", base: 4, jitter: 0, decimals: 0, fmt: () => "L4", suffix: " sovereign" },
  { label: "Latency", base: 12, jitter: 1.4, decimals: 0, suffix: " ms p99" },
];

export default function LiveSpecPanel() {
  const [values, setValues] = useState<number[]>(SPECS.map((s) => s.base));

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setValues(
        SPECS.map((s) => {
          if (s.jitter === 0) return s.base;
          const drift = (Math.random() - 0.5) * 2 * s.jitter;
          return Math.max(0, s.base + drift);
        })
      );
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {SPECS.map((s, i) => {
        const raw = values[i];
        const display = s.fmt ? s.fmt(raw) : raw.toFixed(s.decimals);
        return (
          <div key={s.label} className="group relative">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              {s.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className={`${exo.className} text-3xl font-black text-foreground tabular-nums ${
                  s.pulse ? "animate-pulse" : ""
                }`}
              >
                {display}
              </span>
              {s.suffix && (
                <span className="text-xs uppercase tracking-wider text-primary">
                  {s.suffix}
                </span>
              )}
            </div>
            <div className="mt-2 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent">
              <div
                className="h-full bg-primary transition-[width] duration-700"
                style={{
                  width: `${Math.min(100, (raw / (s.base + s.jitter * 1.2)) * 100)}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
