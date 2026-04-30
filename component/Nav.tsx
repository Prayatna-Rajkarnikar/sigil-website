import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 hairline-b bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-baseline justify-between gap-6 px-6 py-5 lg:px-12">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="font-display display-loose text-2xl font-light tracking-tight text-ink leading-none">
            Sigil
            <span className="text-seal italic font-italic-display">.</span>
          </span>
        </Link>

        <div className="hidden items-baseline gap-7 md:flex">
          <NavLink href="/#mission">Mission</NavLink>
          <NavLink href="/actors">Actor</NavLink>
          <NavLink href="/#models">Models</NavLink>
          <NavLink href="/use-case">Use Case</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-baseline gap-2 font-display italic text-base text-ink link-editorial"
        >
          <span className="dot-live mr-1 self-center" aria-hidden />
          Request Briefing
          <span className="text-seal">→</span>
        </Link>

        <button
          aria-label="Open menu"
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className="h-px w-6 bg-ink"></span>
          <span className="h-px w-6 bg-ink"></span>
          <span className="h-px w-4 bg-seal ml-auto"></span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-display text-base text-ink-soft hover:text-ink link-editorial"
    >
      {children}
    </Link>
  );
}
