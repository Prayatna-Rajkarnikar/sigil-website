"use client";

/**
 * ConcentricFrames — Zenity-style nested rounded-rectangle frames forming
 * an "energy field" behind the hero headline. Each frame is a stroke-only
 * SVG rect with a gradient that flows around the perimeter (animated via
 * stroke-dashoffset). Frames are slightly offset in rotation + scale so
 * the field feels intentional rather than perfectly concentric.
 */

const FRAME_COUNT = 7;

export default function ConcentricFrames() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Stroke gradient — brand color fading through to foreground */}
          <linearGradient id="zf-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.85" />
            <stop offset="40%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {Array.from({ length: FRAME_COUNT }).map((_, i) => {
          const scale = 1 - i * 0.105;
          const cx = 500;
          const cy = 350;
          const w = 740 * scale;
          const h = 380 * scale;
          const x = cx - w / 2;
          const y = cy - h / 2;
          const r = 62 * scale;
          const rotation = (i % 2 === 0 ? 1 : -1) * (i * 0.7);
          const opacity = 0.9 - i * 0.09;

          return (
            <g
              key={i}
              transform={`rotate(${rotation} ${cx} ${cy})`}
              opacity={opacity}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={r}
                ry={r}
                stroke="url(#zf-stroke)"
                strokeWidth={1.3}
                fill="none"
                className="concentric-frame"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  strokeDasharray: `${180 + i * 40} ${60 + i * 18}`,
                }}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
