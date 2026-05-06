"use client";

import { useEffect, useRef, useState } from "react";

type Target = {
  /** Position as % of frame (0-100). */
  x: number;
  y: number;
  label: string;
  /** Size in % of frame. Defaults to 14. */
  size?: number;
};

type Props = {
  /** Path under /public. Falls back to /video.mp4. */
  src?: string;
  /** Top-left ID badge. */
  eyebrow?: string;
  /** Top-right status text. */
  status?: string;
  /** Bottom-left frame label. */
  frameLabel?: string;
  /** Bottom-right coordinate / link text. */
  coords?: string;
  /** Tracked agents/objects rendered as cyan reticles. */
  targets?: Target[];
  /** Aspect class — default square. */
  aspectClassName?: string;
  className?: string;
  /** CSS `filter` value applied to the video layer. Lets each instance
   *  look different even when sharing the same source clip. */
  videoFilter?: string;
  /** Color overlay laid on top of the video to bias its mood. */
  tint?: string;
  /** Playback rate (default 1). 0.6 reads as analytical / slow-mo. */
  playbackRate?: number;
};

const CYAN = "#5fe9ee";
const ORANGE = "#ff791b";

export default function TacticalVideo({
  src = "/video.mp4",
  eyebrow = "FEED-01",
  status = "LIVE",
  frameLabel = "TACTICAL OVERLAY",
  coords = "34.05° N · 118.24° W",
  targets = [{ x: 50, y: 52, label: "AGENT-A", size: 18 }],
  aspectClassName = "aspect-square",
  className = "",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Some browsers block autoplay when source loads after mount; nudge it.
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const tStr = `T+${String(tick).padStart(4, "0")}`;

  return (
    <div
      className={`relative ${aspectClassName} w-full overflow-hidden border bg-black ${className}`}
      style={{ borderColor: "rgba(255, 121, 27, 0.45)" }}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: 0.55,
          filter: "saturate(0.85) contrast(1.05) brightness(0.85)",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Tactical grid */}
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-25 pointer-events-none" />

      {/* Vignette + tint */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Scan sweep line — moves top → bottom on a loop */}
      <div
        className="absolute left-0 right-0 h-px animate-scan-sweep pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${CYAN} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${CYAN}, 0 0 24px rgba(95,233,238,0.5)`,
        }}
      />

      {/* Outer corner brackets */}
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      {/* Tracked targets */}
      {targets.map((t, i) => (
        <TargetReticle key={i} {...t} />
      ))}

      {/* Top bar — eyebrow + status */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2" style={{ color: CYAN }}>
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }}
          />
          {eyebrow}
        </div>
        <div className="flex items-center gap-3" style={{ color: ORANGE }}>
          <span className="hidden sm:inline opacity-70">{tStr}</span>
          <span
            className="h-1 w-1 animate-pulse"
            style={{ background: ORANGE }}
          />
          {status}
        </div>
      </div>

      {/* Bottom bar — frame label + coords */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.3em]">
        <div className="flex items-center gap-2" style={{ color: ORANGE }}>
          <span
            className="inline-block h-2 w-2"
            style={{
              background: ORANGE,
              clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
            }}
          />
          {frameLabel}
        </div>
        <div style={{ color: CYAN }}>{coords}</div>
      </div>

      {/* Side ticks — center crosshair on the right edge */}
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1"
        style={{ color: CYAN }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="block"
            style={{
              width: i === 2 ? 12 : 6,
              height: 1,
              background: i === 2 ? CYAN : "rgba(95,233,238,0.45)",
            }}
          />
        ))}
      </div>

      {/* Bottom-center mini-readout */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em]"
        style={{
          color: CYAN,
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(95,233,238,0.25)",
        }}
      >
        <span>SIG</span>
        <span style={{ color: ORANGE }}>OK</span>
        <span className="opacity-60">·</span>
        <span>LAT 12ms</span>
        <span className="opacity-60">·</span>
        <span>{tStr}</span>
      </div>
    </div>
  );
}

/* ---------------- subcomponents ---------------- */

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute h-3 w-3 pointer-events-none";
  const map = {
    tl: "top-1.5 left-1.5 border-t-2 border-l-2",
    tr: "top-1.5 right-1.5 border-t-2 border-r-2",
    bl: "bottom-1.5 left-1.5 border-b-2 border-l-2",
    br: "bottom-1.5 right-1.5 border-b-2 border-r-2",
  } as const;
  return (
    <span
      className={`${base} ${map[pos]}`}
      style={{ borderColor: ORANGE }}
    />
  );
}

function TargetReticle({ x, y, label, size = 14 }: Target) {
  return (
    <div
      className="absolute animate-target-jitter pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: `${size}%`, aspectRatio: "1 / 1" }}
    >
      {/* corner ticks */}
      <span
        className="absolute top-0 left-0 h-2 w-2 border-t border-l"
        style={{ borderColor: CYAN }}
      />
      <span
        className="absolute top-0 right-0 h-2 w-2 border-t border-r"
        style={{ borderColor: CYAN }}
      />
      <span
        className="absolute bottom-0 left-0 h-2 w-2 border-b border-l"
        style={{ borderColor: CYAN }}
      />
      <span
        className="absolute bottom-0 right-0 h-2 w-2 border-b border-r"
        style={{ borderColor: CYAN }}
      />
      {/* center dot */}
      <span
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: CYAN, boxShadow: `0 0 6px ${CYAN}` }}
      />
      {/* label */}
      <span
        className="absolute left-full top-0 ml-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.25em]"
        style={{ color: CYAN, textShadow: "0 0 6px rgba(0,0,0,0.9)" }}
      >
        {label}
      </span>
    </div>
  );
}
