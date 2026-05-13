"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleSigil — a swarm of tiny brand-blue particles that continuously
 * orbit around the section perimeter, periodically converge to spell out
 * the word "SIGIL", hold briefly, then disperse back to lapping.
 *
 * Implementation:
 *   - Canvas + requestAnimationFrame.
 *   - Two target sets per particle: a perimeter slot (rotated each frame
 *     to give the "lapping" effect) and a fixed pixel sampled from the
 *     rendered "SIGIL" glyphs.
 *   - A morph factor t ∈ [0, 1] linearly interpolates each particle
 *     between its perimeter target and its text target. The phase
 *     timeline ping-pongs t over a ~14s cycle.
 *   - Respects prefers-reduced-motion: pauses animation, draws static
 *     perimeter dots.
 */

const N = 600; // particle count

export default function ParticleSigil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = window.devicePixelRatio || 1;

    type Pt = { x: number; y: number };

    let W = 0;
    let H = 0;
    let perimTargets: Pt[] = [];
    let textTargets: Pt[] = [];
    let lastW = 0;
    let lastH = 0;

    const particles = Array.from({ length: N }, () => ({
      x: 0,
      y: 0,
      ti: Math.floor(Math.random() * N),
    }));

    function computePerimeter(): Pt[] {
      const inset = 24;
      const innerW = Math.max(0, W - 2 * inset);
      const innerH = Math.max(0, H - 2 * inset);
      const peri = 2 * (innerW + innerH);
      const out: Pt[] = [];
      for (let i = 0; i < N; i++) {
        const t = (i / N) * peri;
        let x: number, y: number;
        if (t < innerW) {
          x = inset + t;
          y = inset;
        } else if (t < innerW + innerH) {
          x = inset + innerW;
          y = inset + (t - innerW);
        } else if (t < 2 * innerW + innerH) {
          x = inset + innerW - (t - innerW - innerH);
          y = inset + innerH;
        } else {
          x = inset;
          y = inset + innerH - (t - 2 * innerW - innerH);
        }
        out.push({ x, y });
      }
      return out;
    }

    function computeText(): Pt[] {
      const tmp = document.createElement("canvas");
      tmp.width = Math.max(1, Math.floor(W));
      tmp.height = Math.max(1, Math.floor(H));
      const tctx = tmp.getContext("2d");
      if (!tctx) return Array.from({ length: N }, () => ({ x: W / 2, y: H / 2 }));
      tctx.fillStyle = "white";
      const fontSize = Math.min(H * 0.22, W * 0.13);
      // Arial Black has a chunkier, more distinctive G than Impact.
      // Impact's G has a thin internal bar that gets sampled inconsistently
      // and reads as a C/S to the eye.
      tctx.font = `900 ${fontSize}px "Arial Black", Impact, sans-serif`;
      // @ts-expect-error letterSpacing is supported in modern browsers
      tctx.letterSpacing = "1px";
      tctx.textAlign = "center";
      tctx.textBaseline = "middle";
      // Upper region (above the video), shifted right per spec
      tctx.fillText("SIGIL", W * 0.65, H * 0.22);
      const data = tctx.getImageData(0, 0, tmp.width, tmp.height).data;
      const pts: Pt[] = [];
      const step = 2;
      // Lower alpha threshold so thin internal features (like G's bar) get sampled
      for (let y = 0; y < tmp.height; y += step) {
        for (let x = 0; x < tmp.width; x += step) {
          const idx = (y * tmp.width + x) * 4;
          if (data[idx + 3] > 30) pts.push({ x, y });
        }
      }
      const out: Pt[] = [];
      if (pts.length === 0) {
        for (let i = 0; i < N; i++) out.push({ x: W / 2, y: H / 2 });
      } else {
        for (let i = 0; i < N; i++) {
          out.push(pts[Math.floor(((i + 0.5) / N) * pts.length)]);
        }
      }
      return out;
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      if (Math.abs(rect.width - lastW) < 4 && Math.abs(rect.height - lastH) < 4) return;
      W = rect.width;
      H = rect.height;
      lastW = W;
      lastH = H;
      canvas!.width = Math.max(1, Math.floor(W * dpr));
      canvas!.height = Math.max(1, Math.floor(H * dpr));
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      perimTargets = computePerimeter();
      textTargets = computeText();
      // Initialize particle positions to their initial perim target
      for (let i = 0; i < N; i++) {
        const p = particles[i];
        const a = perimTargets[(p.ti) % perimTargets.length];
        p.x = a.x;
        p.y = a.y;
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Re-sample text targets once webfonts have finished loading so the
    // SIGIL letters are sampled in the Exo font, not the fallback.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        textTargets = computeText();
      });
    }

    let raf: number | null = null;
    function tick(now: number) {
      const cycleMs = 16000;
      const ph = (now % cycleMs) / cycleMs;
      // Timeline (tightened so SIGIL resolves in ~1s and reads instantly):
      //   0.00–0.36 perim (5.8s)
      //   0.36–0.42 morph→text (0.96s)
      //   0.42–0.88 text (7.4s)
      //   0.88–0.94 morph→perim (0.96s)
      //   0.94–1.00 perim (0.96s)
      let t: number;
      if (ph < 0.36) t = 0;
      else if (ph < 0.42) t = (ph - 0.36) / 0.06;
      else if (ph < 0.88) t = 1;
      else if (ph < 0.94) t = 1 - (ph - 0.88) / 0.06;
      else t = 0;

      // Smooth lap rotation through perimeter slots
      const lapOffset = ((now * 0.025) % N + N) % N;
      const lo = Math.floor(lapOffset);

      const ease = 0.18;

      // Particles overlap slightly as they form text → letters read as solid
      const radius = 1.6 + t * 0.8;  // 1.6 → 2.4 (slight overlap fills letters)
      const glow = 4 + t * 6;        // 4   → 10
      const alpha = 0.8 + t * 0.2;   // 0.8 → 1.0

      ctx!.clearRect(0, 0, W, H);
      ctx!.shadowBlur = glow;
      ctx!.shadowColor = "rgba(31, 175, 255, 0.95)";
      ctx!.fillStyle = `rgba(31, 175, 255, ${alpha})`;

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        const a = perimTargets[(p.ti + lo) % perimTargets.length];
        const b = textTargets[p.ti % textTargets.length];
        const tx = a.x + (b.x - a.x) * t;
        const ty = a.y + (b.y - a.y) * t;
        p.x += (tx - p.x) * ease;
        p.y += (ty - p.y) * ease;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    if (reduceMotion) {
      // Static perimeter dots only
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(31, 175, 255, 0.7)";
      for (const p of perimTargets) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      ro.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
