import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-paper hairline-t">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand & short tagline */}
          <div className="lg:col-span-5">
            <h3 className="font-display display-loose text-5xl lg:text-6xl font-light leading-none text-ink">
              Sigil
              <span className="text-seal italic font-italic-display">.</span>
            </h3>
            <p className="mt-5 font-italic-display italic text-aged text-base lg:text-lg leading-snug max-w-md">
              Agentic decision modeling for teams that need to think ahead.
            </p>
          </div>

          {/* Site links */}
          <div className="lg:col-span-2">
            <h4 className="kicker mb-5">Explore</h4>
            <ul className="space-y-3 font-display text-base text-ink-soft">
              <FooterLink href="/#mission">Mission</FooterLink>
              <FooterLink href="/actors">Actor</FooterLink>
              <FooterLink href="/#models">Models</FooterLink>
              <FooterLink href="/use-case">Use Case</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="kicker mb-5">Company</h4>
            <ul className="space-y-3 font-display text-base text-ink-soft">
              <FooterLink href="/contact">About</FooterLink>
              <FooterLink href="/contact">Careers</FooterLink>
              <FooterLink href="/contact">Press</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h4 className="kicker mb-5">Get in touch</h4>
            <a
              href="mailto:hello@sigil.ai"
              className="font-display italic text-xl text-ink link-editorial"
            >
              hello@sigil.ai
            </a>
            <p className="mt-3 font-display text-base text-ink-soft leading-snug">
              We usually reply within a day.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 hairline-t pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-sm text-ink-soft">
            © <span data-num>2026</span> Sigil
          </p>
          <div className="flex gap-6 font-display text-sm text-ink-soft">
            <Link href="/contact" className="link-editorial">
              Privacy
            </Link>
            <Link href="/contact" className="link-editorial">
              Terms
            </Link>
            <Link href="/contact" className="link-editorial">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="link-editorial">
        {children}
      </Link>
    </li>
  );
}
