/**
 * OrbsVariant — 3 soft, blurred gradient blobs that slowly drift and
 * scale across the section. Pairs well with AmbientBackground as one
 * of the cycle variants. CSS-only; see globals.css for the orbs-*
 * classes and keyframes.
 */
export default function OrbsVariant() {
  return (
    <div className="orbs-variant" aria-hidden>
      <div className="orbs-orb orbs-orb-a" />
      <div className="orbs-orb orbs-orb-b" />
      <div className="orbs-orb orbs-orb-c" />
    </div>
  );
}
