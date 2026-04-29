import Link from "next/link";

/**
 * Footer — a colophon. The back matter of an issue.
 * Set in the editorial voice; minimal furniture.
 */
export default function Footer() {
  return (
    <footer className="relative bg-paper hairline-t">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        {/* Masthead row */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand & tagline */}
          <div className="lg:col-span-5">
            <h3 className="font-display display-loose text-5xl lg:text-6xl font-light leading-none text-ink">
              Sigil
              <span className="text-seal italic font-italic-display">.</span>
            </h3>
            <p className="mt-5 font-italic-display italic text-aged text-base lg:text-lg leading-snug max-w-md">
              A field manual for things that haven&apos;t happened yet —
              published quarterly, by the people who refuse to be surprised.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <span className="dot-live" aria-hidden />
              <span className="label-meta">
                Field online · Sector <span data-num>04</span>
              </span>
            </div>
          </div>

          {/* Three columns of contents */}
          <div className="lg:col-span-2">
            <h4 className="kicker mb-5">In this issue</h4>
            <ul className="space-y-3 font-display text-base text-ink-soft">
              <FooterLink href="/#mission" n="01">Thesis</FooterLink>
              <FooterLink href="/actors"   n="03">Actor</FooterLink>
              <FooterLink href="/#models"  n="04">Roster</FooterLink>
              <FooterLink href="/use-case" n="06">Field</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="kicker mb-5">Editorial</h4>
            <ul className="space-y-3 font-display text-base text-ink-soft">
              <FooterLink href="/contact">About</FooterLink>
              <FooterLink href="/contact">Masthead</FooterLink>
              <FooterLink href="/contact">Submit</FooterLink>
              <FooterLink href="/contact">Press</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="kicker mb-5">Direct channel</h4>
            <div className="space-y-5">
              <div>
                <div className="label-meta mb-1">Briefings</div>
                <a
                  href="mailto:command@sigil.ai"
                  className="font-display italic text-xl text-ink link-editorial"
                >
                  command@sigil.ai
                </a>
              </div>
              <div>
                <div className="label-meta mb-1">By post</div>
                <p className="font-display italic text-base text-ink-soft leading-snug">
                  Sigil Quarterly,
                  <br />
                  <span data-num>1300</span> Crystal Drive,
                  <br />
                  Arlington, VA <span data-num>22202</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Colophon line — set like the printer's mark */}
        <div className="mt-20 hairline-t pt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline">
          <p className="md:col-span-7 font-italic-display italic text-aged text-base leading-snug">
            Set in <span className="not-italic font-display text-ink">Fraunces</span> &amp;{" "}
            <span className="not-italic font-display text-ink">Inter</span>.
            Compiled in Arlington, Virginia. Printed digitally. © <span data-num>2026</span> Sigil
            Systems — for organizations that cannot afford to be wrong.
          </p>
          <div className="md:col-span-5 md:text-right space-y-1">
            <div className="label-meta">
              SOC 2 · ITAR-aware · FedRAMP track · Air-gap deploy
            </div>
            <div className="flex md:justify-end gap-5 mt-2 font-display text-sm text-ink-soft">
              <Link href="/contact" className="link-editorial">Privacy</Link>
              <Link href="/contact" className="link-editorial">Terms</Link>
              <Link href="/contact" className="link-editorial">Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  n,
}: {
  href: string;
  children: React.ReactNode;
  n?: string;
}) {
  return (
    <li>
      <Link href={href} className="inline-flex items-baseline gap-3 link-editorial">
        {n && (
          <span className="font-italic-display italic text-seal text-sm">
            {n}
          </span>
        )}
        <span>{children}</span>
      </Link>
    </li>
  );
}
