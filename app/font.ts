import { Caveat, DM_Serif_Display, Fraunces, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

/* Handwriting script — used for the monogram logo */
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "500", "600"],
});

/* Sharp display serif — high-contrast Didone, used for the wordmark */
export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif-sharp",
  weight: "400",
  style: ["normal", "italic"],
});

/* Display & body serif — variable font with optical sizes + SOFT/WONK axes.
   When `axes` is set, omit `weight` (or use "variable") so all weights resolve. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

/* Italic display for pull-quotes — Instrument Serif is large-only italic */
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-italic",
  weight: "400",
  style: ["italic", "normal"],
});

/* Body sans — clean, readable */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

/* Mono — tiny labels only */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

/* Backwards-compat aliases so any stragglers don't break */
export const exo = fraunces;
export const roboto = mono;
