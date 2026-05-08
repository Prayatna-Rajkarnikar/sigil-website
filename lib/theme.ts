/**
 * Brand color tokens — the single source of truth for the Sigil theme.
 *
 * Change PRIMARY here and the whole site updates: `app/layout.tsx`
 * injects --primary and --primary-rgb at the document root, and every
 * component (Three.js scenes, inline JSX styles, email template) imports
 * from this file. globals.css references rgba(var(--primary-rgb), …)
 * instead of hard-coded triplets, so CSS keeps in step automatically.
 */

function hexToRgbTriplet(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/** Brand primary — change this one line to recolor the entire site. */
export const PRIMARY = "#1FAFFF";

/** Primary as an RGB triplet for use in `rgba(${PRIMARY_RGB}, X)`. */
export const PRIMARY_RGB = hexToRgbTriplet(PRIMARY);

/** Cyan accent (secondary) used in 3D scenes and HUD overlays. */
export const CYAN = "#5fe9ee";

/** Dimmer cyan for trim / subordinate accents. */
export const CYAN_DIM = "#3ccfd6";
