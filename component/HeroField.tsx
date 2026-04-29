"use client";

import { useEffect, useRef } from "react";

/**
 * HeroField — a small, considered flock of "actors" drifting beneath the
 * masthead. Editorial-quiet, not a video-game backdrop. ~80 dots, mostly
 * ink-cream. A handful tinted "live" chartreuse. The cursor is a gentle
 * repulsor; agents return to their wandering once you leave.
 */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const COUNT = window.innerWidth < 640 ? 40 : 80;
    const LIVE_COUNT = 4;

    type P = { x: number; y: number; vx: number; vy: number; r: number; live: boolean };
    const particles: P[] = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1.2 + Math.random() * 1.6,
      live: i < LIVE_COUNT,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => setSize();

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      /* Hairlines connecting nearest neighbours — only short ones. */
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 7000) {
            const alpha = (1 - d2 / 7000) * 0.12;
            ctx.strokeStyle = `rgba(232, 224, 206, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* Update + draw particles */
      for (const p of particles) {
        /* Cursor repulsion */
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 18000 && d2 > 0) {
          const f = (1 - d2 / 18000) * 0.6;
          const d = Math.sqrt(d2);
          p.vx += (dx / d) * f * 0.05;
          p.vy += (dy / d) * f * 0.05;
        }

        /* Gentle drift toward center mass */
        const cx = w / 2;
        const cy = h / 2;
        p.vx += (cx - p.x) * 0.000004;
        p.vy += (cy - p.y) * 0.000004;

        /* Damping */
        p.vx *= 0.985;
        p.vy *= 0.985;

        /* Cap velocity */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const max = p.live ? 0.9 : 0.6;
        if (speed > max) {
          p.vx = (p.vx / speed) * max;
          p.vy = (p.vy / speed) * max;
        }

        p.x += p.vx;
        p.y += p.vy;

        /* Wrap */
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        /* Draw */
        ctx.beginPath();
        if (p.live) {
          ctx.fillStyle = "#D4FF3A";
          ctx.shadowColor = "rgba(212, 255, 58, 0.5)";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(232, 224, 206, 0.55)";
          ctx.shadowBlur = 0;
        }
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!reduce) raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);
    else tick(); /* one static frame for reduced-motion */

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
