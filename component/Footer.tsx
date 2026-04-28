import Link from "next/link";
import { exo } from "@/app/font";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="absolute inset-0 bg-tactical-grid-fine opacity-50 pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 border-2 border-primary rotate-45"></div>
                <div className="absolute inset-2 bg-primary rotate-45"></div>
              </div>
              <span
                className={`${exo.className} text-3xl font-black tracking-[0.2em]`}
              >
                SIGIL
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Agentic decision modeling for organizations that cannot afford to
              be wrong. Sigil deploys autonomous AI actors into high-fidelity
              simulated environments — so strategy, doctrine, and infrastructure
              are battle-tested before contact with reality.
            </p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span>Systems Online</span>
              <span className="text-muted">/</span>
              <span className="text-muted">Sector 04</span>
            </div>
          </div>

          {/* Capability */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Platform
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <FooterLink href="/actors">The Actor</FooterLink>
              <FooterLink href="/#train">Train Army</FooterLink>
              <FooterLink href="/#models">AI Models</FooterLink>
              <FooterLink href="/use-case">Use Cases</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Command
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <FooterLink href="/#mission">Mission</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/contact">Careers</FooterLink>
              <FooterLink href="/contact">Press</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Direct Channel
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Sales
                </div>
                <a
                  href="tel:+15558007445"
                  className="text-foreground hover:text-primary transition"
                >
                  +1 (555) 800-SIGIL
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Briefings
                </div>
                <a
                  href="mailto:command@sigil.ai"
                  className="text-foreground hover:text-primary transition"
                >
                  command@sigil.ai
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted">
            <span>© 2026 Sigil Systems</span>
            <span className="text-primary">/</span>
            <span>Classified Use Only</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em]">
            <Link href="/contact" className="text-muted hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-muted hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="text-muted hover:text-foreground">
              Compliance
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
        className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
      >
        <span className="text-primary">›</span>
        {children}
      </Link>
    </li>
  );
}
