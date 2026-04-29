"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * Reveal — wraps content with an intersection-observed rise-in animation.
 * The styling lives on [data-rise] in globals.css; this just toggles the
 * `is-visible` class once the element enters the viewport.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Element = Tag as ElementType;
  return (
    <Element
      ref={ref}
      data-rise
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
}
