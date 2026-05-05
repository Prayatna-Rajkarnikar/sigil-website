"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=?";
const DURATION = 700;

/**
 * ScrambleTransition — on every route change, walks all text nodes inside
 * the wrapper, replaces them with random characters, then resolves each
 * string left→right over DURATION ms. Inputs / textareas / code blocks are
 * skipped. Elements marked [data-noscramble] are skipped (use this on
 * components that have their own animation, e.g. CountUp).
 */
export default function ScrambleTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const text = node.textContent ?? "";
        if (!text.trim()) return NodeFilter.FILTER_REJECT;
        let parent = (node as Text).parentElement;
        while (parent) {
          const tag = parent.tagName;
          if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SCRIPT" ||
            tag === "STYLE" ||
            tag === "CODE" ||
            tag === "PRE"
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.dataset?.noscramble !== undefined) {
            return NodeFilter.FILTER_REJECT;
          }
          parent = parent.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes: { node: Text; original: string }[] = [];
    let cur = walker.nextNode() as Text | null;
    while (cur) {
      nodes.push({ node: cur, original: cur.textContent ?? "" });
      cur = walker.nextNode() as Text | null;
    }

    if (nodes.length === 0) return;

    const start = performance.now();
    let raf = 0;
    let cancelled = false;

    const tick = (t: number) => {
      if (cancelled) return;
      const elapsed = t - start;
      const progress = Math.min(elapsed / DURATION, 1);

      for (const { node, original } of nodes) {
        const len = original.length;
        const resolvedCount = Math.floor(progress * len);
        let out = original.slice(0, resolvedCount);
        for (let i = resolvedCount; i < len; i++) {
          const ch = original[i];
          if (ch === " " || ch === "\n" || ch === "\t" || ch === " ") {
            out += ch;
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        node.textContent = out;
      }

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        for (const { node, original } of nodes) {
          node.textContent = original;
        }
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      for (const { node, original } of nodes) {
        node.textContent = original;
      }
    };
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
