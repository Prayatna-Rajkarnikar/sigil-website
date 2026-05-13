/**
 * SectionBackdrops — animated background components, one per section.
 *
 *   CircuitFlow         → Mission       (glowing pulses on circuit traces)
 *   AuroraPortal        → Actor         (handled by component/AuroraPortal.tsx)
 *   DataDashes          → AI Models     (signal blips / data ticks)
 *   HexLatticePulse     → Sales-CTA     (tactical grid coming online)
 *
 * All are pointer-events:none, deeply backgrounded, and respect
 * prefers-reduced-motion via their CSS keyframes.
 */

/* ─── 1. FORECAST FAN — Mission section ──────────────────────────
   Many thin curved lines drawing inward from above, fading, redrawing
   with staggered delays — reads as "thousands of possible futures
   being simulated in parallel." Reuses the existing .forecast-line
   keyframes already in globals.css.
   ───────────────────────────────────────────────────────────── */
export function ForecastFan() {
  const N = 26;
  const lines = Array.from({ length: N }, (_, i) => ({
    angle: -65 + (130 * i) / (N - 1),
    delay: (i * 0.6) % 11,
    dur: 9 + (i % 5) * 1.4,
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ ["--forecast-max" as string]: "0.35" }}
      >
        <g transform="translate(500, 620)">
          {lines.map((l, i) => (
            <g key={i} transform={`rotate(${l.angle})`}>
              <path
                d="M 0 0 L 0 -780"
                pathLength={1}
                className="forecast-line"
                stroke="rgb(var(--primary-rgb))"
                strokeWidth={0.8}
                fill="none"
                strokeLinecap="round"
                style={{
                  animationDelay: `${l.delay}s`,
                  animationDuration: `${l.dur}s`,
                }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ─── 3. HEX LATTICE PULSE — Sales-CTA section ───────────────────
   Honeycomb grid where individual cells light up in slow waves.
   Defense-tactical feel — "systems coming online."
   ───────────────────────────────────────────────────────────── */
export function HexLatticePulse() {
  const cols = 14;
  const rows = 7;
  const r = 26; // hex circumradius
  const dx = r * Math.sqrt(3);
  const dy = r * 1.5;

  const hexPath = (cx: number, cy: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(" ");
  };

  const cells: { cx: number; cy: number; delay: number; key: string }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * dx + (row % 2 ? dx / 2 : 0);
      const cy = row * dy;
      const delay = ((row * 1.3 + col * 0.7) % 9) - 1;
      cells.push({ cx, cy, delay, key: `${row}-${col}` });
    }
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        viewBox={`-20 -20 ${cols * dx + 40} ${rows * dy + 60}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {cells.map((c) => (
          <polygon
            key={c.key}
            points={hexPath(c.cx, c.cy)}
            className="hex-cell"
            stroke="rgb(var(--primary-rgb))"
            strokeWidth={0.6}
            fill="rgb(var(--primary-rgb))"
            fillOpacity={0}
            style={{ animationDelay: `${c.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── 4. DATA DASHES — AI Models section ─────────────────────────
   Short horizontal bars of random length that fly left-to-right
   across the section at random vertical positions and speeds. Reads
   as a continuous stream of "signal traffic" — fits the "models
   running, data flowing" beat of the AI Models section.
   ───────────────────────────────────────────────────────────── */
export function DataDashes() {
  const N = 30;
  // Each dash starts at a different X position scattered across the
  // section, then drifts slightly right while fading in/out. This
  // gives the rig.dev "scattered ticks" look at any moment instead
  // of all-flying-from-the-left.
  const dashes = Array.from({ length: N }, (_, i) => ({
    top: ((i * 17 + 3) % 96) + 2,           // 2–98 %
    left: ((i * 31 + 11) % 92) + 1,         // 1–93 % (scattered X)
    width: 30 + ((i * 13) % 220),           // 30–250 px
    delay: -((i * 0.4) % 11),               // -11–0 s
    duration: 7 + ((i * 0.7) % 7),          // 7–14 s
  }));
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {dashes.map((d, i) => (
        <span
          key={i}
          className="data-dash absolute block"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: `${d.width}px`,
            height: "3px",
            background: "rgb(var(--primary-rgb))",
            boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.55)",
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── 5. CIRCUIT FLOW — Mission section ──────────────────────────
   Faint circuit-board traces with subtle glowing pulses traveling
   along each path. Light, modern, doesn't compete with foreground
   text — matches the senior's "really light in the background, fills
   the gap, doesn't clutter" spec.
   ───────────────────────────────────────────────────────────── */
export function CircuitFlow() {
  // Circuit traces RADIATE OUT FROM the video's position in the section's
  // center column. The Mission section has text content in the left and
  // right columns (headline+paragraph on left, stats on right), so paths
  // are routed through the TOP and BOTTOM padding strips of the section
  // (y < 130 or y > 770 in the viewBox) — never through the middle band
  // where the text lives.
  const paths = [
    // ─── TOP zone (above all text) — paths going up from video ───
    { d: "M 660 290 L 660 80 L 380 80",          dur: 9,    delay: 0   },
    { d: "M 720 290 L 720 40",                    dur: 7.5,  delay: 1.4 },
    { d: "M 780 290 L 780 80 L 1060 80",         dur: 10,   delay: 2.8 },
    // ─── TOP corner routes ───
    { d: "M 580 290 L 580 110 L 180 110",        dur: 9.5,  delay: 0.6 },
    { d: "M 860 290 L 860 110 L 1260 110",       dur: 8.5,  delay: 3.2 },
    // ─── BOTTOM zone (below all text) — paths going down from video ───
    { d: "M 660 610 L 660 820 L 380 820",        dur: 9,    delay: 1.8 },
    { d: "M 720 610 L 720 860",                   dur: 7.5,  delay: 4.2 },
    { d: "M 780 610 L 780 820 L 1060 820",       dur: 10,   delay: 2.4 },
    // ─── BOTTOM corner routes ───
    { d: "M 580 610 L 580 790 L 180 790",        dur: 9.5,  delay: 5.5 },
    { d: "M 860 610 L 860 790 L 1260 790",       dur: 8.5,  delay: 6.8 },
    // ─── SIDEWAYS — paths emerge HORIZONTALLY from the video's side
    //     edges first (so the pulse visibly exits the side, not the top
    //     or bottom). Then they route through the column gutters and
    //     padding strips to reach the section corners — never crossing
    //     the text band. ───
    { d: "M 900 420 L 945 420 L 945 100 L 1380 100",   dur: 11,   delay: 2.0 },  // right → up
    { d: "M 900 480 L 945 480 L 945 820 L 1380 820",   dur: 11,   delay: 4.6 },  // right → down
    { d: "M 540 420 L 495 420 L 495 100 L 60 100",     dur: 11,   delay: 3.8 },  // left → up
    { d: "M 540 480 L 495 480 L 495 820 L 60 820",     dur: 11,   delay: 7.0 },  // left → down
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Tiny solder dots at each path endpoint — sells the "circuit" feel */}
        {paths.flatMap((p, i) => {
          const matches = Array.from(p.d.matchAll(/([ML])\s+([\d.]+)\s+([\d.]+)/g));
          return matches.map((m, j) => (
            <circle
              key={`dot-${i}-${j}`}
              cx={m[2]}
              cy={m[3]}
              r={1.8}
              fill="rgb(var(--primary-rgb))"
              fillOpacity={0.25}
            />
          ));
        })}
        {/* Base traces — very faint so they read as the wire layout */}
        {paths.map((p, i) => (
          <path
            key={`base-${i}`}
            d={p.d}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={0.14}
            strokeWidth={0.8}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {/* Bright pulses traveling along each path. Dash is 80px long
            in absolute pixel units (more reliable than pathLength
            normalization across browsers); the keyframe animates
            stroke-dashoffset from +80 → −1000 so the pulse enters at
            the start of the trace, travels its full length, exits the
            end. The 2000px gap ensures only one dash is visible. */}
        {paths.map((p, i) => (
          <path
            key={`pulse-${i}`}
            d={p.d}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={1}
            strokeWidth={2.4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100 2000"
            className="circuit-flow"
            style={{
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              // Single drop-shadow (was 3 stacked) — three layered blur
              // filters per path × 14 paths choked video playback
              filter: "drop-shadow(0 0 6px rgba(var(--primary-rgb), 0.85))",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
