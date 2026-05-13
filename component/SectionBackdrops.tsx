/**
 * SectionBackdrops — animated background components, one per section.
 *
 *   ForecastFan         → Mission       (parallel scenario rollouts)
 *   WireframePolyhedron → Actor         (single agent / "mind")
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

/* ─── 2. WIREFRAME POLYHEDRON — Actor section ────────────────────
   Three nested polygons rotating at different speeds. Reads as an
   abstract "agent mind" — crystalline, deliberate.
   ───────────────────────────────────────────────────────────── */
export function WireframePolyhedron() {
  // Hexagon vertex helper
  const hexPoints = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");

  // Triangle vertex helper (3-pointed)
  const triPoints = (r: number) =>
    Array.from({ length: 3 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
      return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
    }).join(" ");

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <svg
        viewBox="-150 -150 300 300"
        className="h-[60vh] w-auto opacity-50"
      >
        {/* Outer hex — slow clockwise */}
        <g className="wireframe-spin-cw-slow">
          <polygon
            points={hexPoints(130)}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={0.45}
            strokeWidth={0.6}
            fill="none"
          />
          <polygon
            points={hexPoints(120)}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={0.2}
            strokeWidth={0.4}
            fill="none"
          />
        </g>

        {/* Middle hex — medium counter-clockwise */}
        <g className="wireframe-spin-ccw-med">
          <polygon
            points={hexPoints(90)}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={0.55}
            strokeWidth={0.7}
            fill="none"
          />
          {/* connecting diagonals inside the middle hex */}
          {Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={(90 * Math.cos(a)).toFixed(2)}
                y2={(90 * Math.sin(a)).toFixed(2)}
                stroke="rgb(var(--primary-rgb))"
                strokeOpacity={0.18}
                strokeWidth={0.4}
              />
            );
          })}
        </g>

        {/* Inner triangle — fast clockwise */}
        <g className="wireframe-spin-cw-fast">
          <polygon
            points={triPoints(50)}
            stroke="rgb(var(--primary-rgb))"
            strokeOpacity={0.7}
            strokeWidth={0.8}
            fill="none"
          />
        </g>

        {/* Center pulse dot */}
        <circle
          cx={0}
          cy={0}
          r={2}
          fill="rgb(var(--primary-rgb))"
          className="wireframe-pulse"
        />
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
