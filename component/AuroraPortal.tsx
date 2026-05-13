/**
 * AuroraPortal — Lakera-style "stargate": vertical light beams rising
 * from a glowing horizontal stage at the bottom of a section, with
 * concentric elliptical floor rings.
 *
 * Continuous loop — beams flow upward forever, stage pulses, rings
 * breathe. CSS handles all motion (see globals.css). Each beam carries
 * its own width / color / duration / peak opacity so the field never
 * animates in lockstep. Honors `prefers-reduced-motion`.
 */
export default function AuroraPortal() {
  const beams: Array<{
    left: string;
    width: number;
    color: string;
    duration: string;
    delay: string;
    opacity: number;
  }> = [
    { left: "8%",  width: 60,  color: "rgba(31, 175, 255, 0.6)",  duration: "13s", delay: "0s",   opacity: 0.42 },
    { left: "14%", width: 90,  color: "rgba(140, 220, 255, 0.7)",  duration: "16s", delay: "0.6s", opacity: 0.5  },
    { left: "22%", width: 50,  color: "rgba(210, 125, 255, 0.55)", duration: "11s", delay: "1.2s", opacity: 0.45 },
    { left: "30%", width: 110, color: "rgba(180, 230, 255, 0.5)",  duration: "15s", delay: "0.3s", opacity: 0.38 },
    { left: "38%", width: 70,  color: "rgba(31, 175, 255, 0.5)",   duration: "10s", delay: "1.8s", opacity: 0.4  },
    { left: "46%", width: 130, color: "rgba(235, 245, 255, 0.55)", duration: "13s", delay: "0s",   opacity: 0.45 },
    { left: "54%", width: 100, color: "rgba(160, 200, 255, 0.5)",  duration: "15s", delay: "1.4s", opacity: 0.42 },
    { left: "62%", width: 80,  color: "rgba(255, 140, 220, 0.4)",  duration: "11s", delay: "0.9s", opacity: 0.35 },
    { left: "70%", width: 60,  color: "rgba(190, 150, 255, 0.55)", duration: "17s", delay: "0.2s", opacity: 0.42 },
    { left: "78%", width: 90,  color: "rgba(140, 220, 255, 0.7)",  duration: "13s", delay: "1.6s", opacity: 0.52 },
    { left: "86%", width: 50,  color: "rgba(31, 175, 255, 0.6)",   duration: "15s", delay: "0.7s", opacity: 0.4  },
    { left: "92%", width: 70,  color: "rgba(255, 170, 200, 0.45)", duration: "19s", delay: "0.4s", opacity: 0.35 },
  ];

  return (
    <div className="aurora-portal" aria-hidden>
      <div className="aurora-stage" />
      {beams.map((b, i) => (
        <div
          key={i}
          className="aurora-beam"
          style={
            {
              left: b.left,
              "--beam-w": `${b.width}px`,
              "--beam-color": b.color,
              "--beam-dur": b.duration,
              "--beam-op": b.opacity,
              animationDelay: b.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <div
        className="aurora-ring"
        style={{ width: "70%", bottom: "6%", animationDelay: "0s" }}
      />
      <div
        className="aurora-ring"
        style={{ width: "90%", bottom: "2%", animationDelay: "1.5s" }}
      />
      <div
        className="aurora-ring"
        style={{ width: "55%", bottom: "10%", animationDelay: "0.7s" }}
      />
    </div>
  );
}
