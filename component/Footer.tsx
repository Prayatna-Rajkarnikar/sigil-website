import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand & short tagline */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Logo className="h-10 w-auto text-foreground sm:h-12 lg:h-14" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
              Agentic decision modeling for teams that need to think ahead.
            </p>
          </div>

          {/* Site links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <FooterLink href="/#mission">Mission</FooterLink>
              <FooterLink href="/actors">Actor</FooterLink>
              <FooterLink href="/#models">Models</FooterLink>
              <FooterLink href="/use-case">Use Case</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <FooterLink href="/contact">About</FooterLink>
              <FooterLink href="/contact">Careers</FooterLink>
              <FooterLink href="/contact">Press</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Get in touch
            </h4>
            <a
              href="mailto:hello@sigil.ai"
              className="block break-all text-base font-bold text-foreground transition hover:text-primary sm:text-lg"
            >
              hello@sigil.ai
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We usually reply within a day.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">© 2026 Sigil</p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/contact" className="transition hover:text-primary">
              Privacy
            </Link>
            <Link href="/contact" className="transition hover:text-primary">
              Terms
            </Link>
            <Link href="/contact" className="transition hover:text-primary">
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
      <Link
        href={href}
        className="transition hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}
