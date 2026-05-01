"use client";

import { type ReactNode } from "react";

/**
 * TraitCard — replaces the static trait boxes with animated cards.
 * Each kind has its own inline SVG icon with a CSS-driven animation:
 *   perceive  : scanning radar sweep
 *   remember  : dot orbiting on a path
 *   reason    : branching tree pulse
 *   act       : burst rays expanding outward
 */

export type TraitKind = "perceive" | "remember" | "reason" | "act";

export default function TraitCard({
  kind,
  name,
  desc,
}: {
  kind: TraitKind;
  name: string;
  desc: string;
}) {
  return (
    <div className="trait-card group relative border border-white/10 bg-white/[0.02] p-4 transition hover:border-primary/50 hover:bg-primary/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <span className="h-1 w-1 bg-primary"></span>
            {name}
          </div>
          <div className="text-xs leading-relaxed text-muted">{desc}</div>
        </div>
        <div className="trait-icon shrink-0 w-10 h-10 text-primary">
          <Icon kind={kind} />
        </div>
      </div>
    </div>
  );
}

function Icon({ kind }: { kind: TraitKind }) {
  if (kind === "perceive") return <PerceiveIcon />;
  if (kind === "remember") return <RememberIcon />;
  if (kind === "reason") return <ReasonIcon />;
  return <ActIcon />;
}

function SvgWrap({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full overflow-visible"
      stroke="currentColor"
      fill="none"
    >
      {children}
    </svg>
  );
}

/* PERCEIVE — concentric rings + a sweeping radar line */
function PerceiveIcon() {
  return (
    <SvgWrap>
      <circle cx="16" cy="16" r="14" strokeWidth="0.5" strokeOpacity="0.25" />
      <circle cx="16" cy="16" r="9" strokeWidth="0.5" strokeOpacity="0.45" />
      <circle cx="16" cy="16" r="4" strokeWidth="0.5" strokeOpacity="0.7" />
      {/* sweep line — rotates around center */}
      <g style={{ transformOrigin: "16px 16px", animation: "trait-spin 3.2s linear infinite" }}>
        <line x1="16" y1="16" x2="30" y2="16" strokeWidth="1.2" />
        {/* fading wedge */}
        <path d="M 16 16 L 30 16 A 14 14 0 0 0 25.9 6 Z" fill="currentColor" fillOpacity="0.18" />
      </g>
      {/* center dot */}
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    </SvgWrap>
  );
}

/* REMEMBER — orbital path + a small dot moving along it */
function RememberIcon() {
  return (
    <SvgWrap>
      <ellipse cx="16" cy="16" rx="11" ry="11" strokeWidth="0.6" strokeOpacity="0.35" />
      <ellipse cx="16" cy="16" rx="6" ry="6" strokeWidth="0.5" strokeOpacity="0.25" />
      {/* moving dot along the outer orbit */}
      <circle r="1.5" fill="currentColor">
        <animateMotion
          dur="2.6s"
          repeatCount="indefinite"
          path="M 27 16 a 11 11 0 1 1 -22 0 a 11 11 0 1 1 22 0"
        />
      </circle>
      {/* second dot, opposite side */}
      <circle r="1" fill="currentColor" fillOpacity="0.55">
        <animateMotion
          dur="2.6s"
          repeatCount="indefinite"
          begin="-1.3s"
          path="M 27 16 a 11 11 0 1 1 -22 0 a 11 11 0 1 1 22 0"
        />
      </circle>
      <circle cx="16" cy="16" r="1" fill="currentColor" />
    </SvgWrap>
  );
}

/* REASON — branching tree with pulsing nodes */
function ReasonIcon() {
  return (
    <SvgWrap>
      {/* trunk + branches */}
      <line x1="16" y1="28" x2="16" y2="20" strokeWidth="0.7" />
      <line x1="16" y1="20" x2="9" y2="14" strokeWidth="0.7" />
      <line x1="16" y1="20" x2="23" y2="14" strokeWidth="0.7" />
      <line x1="9" y1="14" x2="5" y2="8" strokeWidth="0.6" strokeOpacity="0.7" />
      <line x1="9" y1="14" x2="13" y2="8" strokeWidth="0.6" strokeOpacity="0.7" />
      <line x1="23" y1="14" x2="19" y2="8" strokeWidth="0.6" strokeOpacity="0.7" />
      <line x1="23" y1="14" x2="27" y2="8" strokeWidth="0.6" strokeOpacity="0.7" />
      {/* nodes — root pulses */}
      <circle cx="16" cy="28" r="1.5" fill="currentColor">
        <animate attributeName="r" values="1.5;2.2;1.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="20" r="1" fill="currentColor" fillOpacity="0.7" />
      <circle cx="9" cy="14" r="1" fill="currentColor" fillOpacity="0.7" />
      <circle cx="23" cy="14" r="1" fill="currentColor" fillOpacity="0.7" />
      {/* leaf nodes — staggered pulse */}
      {[
        { cx: 5, cy: 8, begin: "0s" },
        { cx: 13, cy: 8, begin: "0.5s" },
        { cx: 19, cy: 8, begin: "1s" },
        { cx: 27, cy: 8, begin: "1.5s" },
      ].map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="0.9" fill="currentColor" fillOpacity="0.5">
          <animate
            attributeName="fill-opacity"
            values="0.4;1;0.4"
            dur="2s"
            begin={n.begin}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </SvgWrap>
  );
}

/* ACT — central node with rays bursting outward */
function ActIcon() {
  /* 8 rays, alternating axes + diagonals */
  const rays = [
    { x1: 16, y1: 14, x2: 16, y2: 6 },
    { x1: 16, y1: 18, x2: 16, y2: 26 },
    { x1: 14, y1: 16, x2: 6, y2: 16 },
    { x1: 18, y1: 16, x2: 26, y2: 16 },
    { x1: 14.5, y1: 14.5, x2: 9, y2: 9 },
    { x1: 17.5, y1: 14.5, x2: 23, y2: 9 },
    { x1: 14.5, y1: 17.5, x2: 9, y2: 23 },
    { x1: 17.5, y1: 17.5, x2: 23, y2: 23 },
  ];
  return (
    <SvgWrap>
      {/* center burst */}
      <circle cx="16" cy="16" r="1.8" fill="currentColor">
        <animate attributeName="r" values="1.5;2.5;1.5" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* outer fade ring */}
      <circle cx="16" cy="16" r="3" fill="none" strokeWidth="0.5" strokeOpacity="0.4">
        <animate attributeName="r" values="3;7;3" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* rays */}
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          strokeWidth="0.7"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.2;1;0.2"
            dur="1.6s"
            begin={`${i * 0.05}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </SvgWrap>
  );
}
