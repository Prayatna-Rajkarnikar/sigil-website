"use client";

/**
 * ActorSigil — animated tactical-occult sigil glyph.
 * Concentric rings with rune ticks, an inscribed hexagram (counter-rotating),
 * 4 trait runes at cardinal positions, and a glowing crystal core.
 * Brand-aligned (the company is "Sigil"); designed to scale to other
 * sections with different cardinal motifs.
 */

const TICKS = Array.from({ length: 24 }).map((_, i) => (i * 360) / 24);
const RUNES = [
  // angle, length scale 0..1 to vary the tick marks for a runic feel
  ...Array.from({ length: 12 }).map((_, i) => ({
    deg: i * 30 + 15,
    len: i % 3 === 0 ? 1 : 0.55,
  })),
];

// 4 cardinal trait positions
const RING_R = 56;
const CARDINALS = [
  { deg: -90, label: "PERCEIVE" }, // top
  { deg: 0, label: "REASON" }, //   right
  { deg: 90, label: "ACT" }, //     bottom
  { deg: 180, label: "REMEMBER" }, // left
];

export default function ActorSigil() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <svg
        viewBox="-110 -110 220 220"
        className="absolute inset-0 w-full h-full overflow-visible"
        style={{
          filter:
            "drop-shadow(0 0 18px rgba(255,121,27,0.18)) drop-shadow(0 0 32px rgba(95,233,238,0.06))",
        }}
      >
        <defs>
          <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#5fe9ee" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#5fe9ee" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#5fe9ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aura" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ff791b" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#ff791b" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ff791b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* OUTER AURA */}
        <circle cx="0" cy="0" r="100" fill="url(#aura)" />

        {/* OUTER RING + tick marks — slow rotation */}
        <g
          style={{
            transformOrigin: "center",
            animation: "sigil-spin 60s linear infinite",
          }}
        >
          <circle
            cx="0"
            cy="0"
            r="100"
            fill="none"
            stroke="#ff791b"
            strokeOpacity="0.32"
            strokeWidth="0.6"
            strokeDasharray="4 6"
          />
          {TICKS.map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const inner = i % 3 === 0 ? 91 : 95;
            return (
              <line
                key={i}
                x1={Math.cos(a) * inner}
                y1={Math.sin(a) * inner}
                x2={Math.cos(a) * 100}
                y2={Math.sin(a) * 100}
                stroke="#ff791b"
                strokeOpacity={i % 3 === 0 ? 0.85 : 0.55}
                strokeWidth={i % 3 === 0 ? 1.2 : 0.8}
              />
            );
          })}
          {/* runic inscriptions between ticks */}
          {RUNES.map((r, i) => {
            const a = (r.deg * Math.PI) / 180;
            const ox = Math.cos(a) * 86;
            const oy = Math.sin(a) * 86;
            return (
              <g key={i} transform={`translate(${ox} ${oy}) rotate(${r.deg + 90})`}>
                <line
                  x1="0"
                  y1={-r.len * 3}
                  x2="0"
                  y2={r.len * 3}
                  stroke="#ff791b"
                  strokeOpacity="0.55"
                  strokeWidth="0.6"
                />
                {r.len > 0.7 && (
                  <circle cx="0" cy="0" r="0.8" fill="#ff791b" fillOpacity="0.85" />
                )}
              </g>
            );
          })}
        </g>

        {/* MID RING */}
        <circle
          cx="0"
          cy="0"
          r="80"
          fill="none"
          stroke="#ff791b"
          strokeOpacity="0.42"
          strokeWidth="0.6"
        />

        {/* HEXAGRAM — counter-rotates, the structural seal */}
        <g
          style={{
            transformOrigin: "center",
            animation: "sigil-spin-rev 90s linear infinite",
          }}
        >
          <polygon
            points="0,-72 62.4,36 -62.4,36"
            fill="none"
            stroke="#ff791b"
            strokeOpacity="0.55"
            strokeWidth="1.1"
          />
          <polygon
            points="0,72 62.4,-36 -62.4,-36"
            fill="none"
            stroke="#ff791b"
            strokeOpacity="0.55"
            strokeWidth="1.1"
          />
          {/* small dots at hexagram intersections */}
          {[
            [0, -72],
            [62.4, 36],
            [-62.4, 36],
            [0, 72],
            [62.4, -36],
            [-62.4, -36],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2.2"
              fill="#ff791b"
              opacity="0.85"
            >
              <animate
                attributeName="r"
                values="1.8;3;1.8"
                dur="3s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* INNER RING (cyan — the cognition boundary) */}
        <circle
          cx="0"
          cy="0"
          r="42"
          fill="none"
          stroke="#5fe9ee"
          strokeOpacity="0.5"
          strokeWidth="0.6"
        />

        {/* CARDINAL TRAIT RUNES */}
        {/* Top — PERCEIVE: layered radar arcs */}
        <g transform={`translate(0, -${RING_R})`}>
          <path
            d="M -10,5 A 10 10 0 0 1 10 5"
            fill="none"
            stroke="#5fe9ee"
            strokeWidth="1.4"
          />
          <path
            d="M -6,8 A 6 6 0 0 1 6 8"
            fill="none"
            stroke="#5fe9ee"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <line x1="0" y1="0" x2="0" y2="-7" stroke="#5fe9ee" strokeWidth="1.2" />
          <circle cx="0" cy="5" r="1.6" fill="#5fe9ee" />
        </g>

        {/* Right — REASON: branching tree */}
        <g transform={`translate(${RING_R}, 0)`}>
          <line x1="-6" y1="0" x2="0" y2="0" stroke="#5fe9ee" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="6" y2="-6" stroke="#5fe9ee" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="6" y2="6" stroke="#5fe9ee" strokeWidth="1.4" />
          <line x1="0" y1="0" x2="8" y2="0" stroke="#5fe9ee" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="0" cy="0" r="1.5" fill="#5fe9ee" />
          <circle cx="6" cy="-6" r="1.2" fill="#5fe9ee" opacity="0.85">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="6" cy="6" r="1.2" fill="#5fe9ee" opacity="0.85">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="8" cy="0" r="1" fill="#5fe9ee" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Bottom — ACT: burst rays */}
        <g transform={`translate(0, ${RING_R})`}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const a = (deg * Math.PI) / 180;
            const r1 = 3;
            const r2 = deg % 90 === 0 ? 9 : 7;
            return (
              <line
                key={deg}
                x1={Math.cos(a) * r1}
                y1={Math.sin(a) * r1}
                x2={Math.cos(a) * r2}
                y2={Math.sin(a) * r2}
                stroke="#5fe9ee"
                strokeWidth={deg % 90 === 0 ? 1.4 : 1}
              />
            );
          })}
          <circle cx="0" cy="0" r="2" fill="#5fe9ee">
            <animate attributeName="r" values="1.5;2.6;1.5" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Left — REMEMBER: inward spiral */}
        <g transform={`translate(-${RING_R}, 0)`}>
          <path
            d="M 8 0 a 8 8 0 1 1 -16 0 a 6 6 0 1 1 12 0 a 4 4 0 1 1 -8 0"
            fill="none"
            stroke="#5fe9ee"
            strokeWidth="1.2"
          />
          <circle cx="0" cy="0" r="1.4" fill="#5fe9ee" />
        </g>

        {/* CONNECTOR SPOKES from inner ring (r=42) to cardinals (r=50) */}
        {CARDINALS.map((c, i) => {
          const a = (c.deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 42}
              y1={Math.sin(a) * 42}
              x2={Math.cos(a) * 50}
              y2={Math.sin(a) * 50}
              stroke="#ff791b"
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
          );
        })}

        {/* PARTICLES travelling along each spoke (staggered) */}
        {CARDINALS.map((c, i) => {
          const a = (c.deg * Math.PI) / 180;
          const x1 = Math.cos(a) * 42;
          const y1 = Math.sin(a) * 42;
          const x2 = Math.cos(a) * 50;
          const y2 = Math.sin(a) * 50;
          return (
            <circle key={i} r="1.8" fill="#5fe9ee">
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M ${x1} ${y1} L ${x2} ${y2} L ${x1} ${y1}`}
              />
            </circle>
          );
        })}

        {/* CENTER CRYSTAL CORE */}
        <circle cx="0" cy="0" r="34" fill="url(#core-glow)" />
        <g
          style={{
            transformOrigin: "center",
            animation: "sigil-spin 22s linear infinite",
          }}
        >
          {/* outer hex (icosahedron silhouette) */}
          <polygon
            points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
            fill="none"
            stroke="#5fe9ee"
            strokeWidth="1.5"
            strokeOpacity="0.95"
          />
          {/* inner hex */}
          <polygon
            points="0,-13 11.3,-6.5 11.3,6.5 0,13 -11.3,6.5 -11.3,-6.5"
            fill="#5fe9ee"
            fillOpacity="0.18"
            stroke="#5fe9ee"
            strokeWidth="1"
            strokeOpacity="0.85"
          />
          {/* internal crossing lines (icosahedron edges) */}
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#5fe9ee" strokeOpacity="0.5" strokeWidth="0.7" />
          <line x1="-19" y1="-11" x2="19" y2="11" stroke="#5fe9ee" strokeOpacity="0.5" strokeWidth="0.7" />
          <line x1="19" y1="-11" x2="-19" y2="11" stroke="#5fe9ee" strokeOpacity="0.5" strokeWidth="0.7" />
        </g>

        {/* breathing center pulse */}
        <circle cx="0" cy="0" r="3.5" fill="#5fe9ee">
          <animate attributeName="r" values="2.5;4.5;2.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
