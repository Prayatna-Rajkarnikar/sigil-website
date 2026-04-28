import Link from "next/link";
import { exo } from "@/app/font";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 border-2 border-primary rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></div>
            <div className="absolute inset-2 bg-primary rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></div>
          </div>
          <span
            className={`${exo.className} text-2xl font-black tracking-[0.2em] text-foreground`}
          >
            SIGIL
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/#mission">Mission</NavLink>
          <NavLink href="/actors">Actor</NavLink>
          <NavLink href="/#train">Train</NavLink>
          <NavLink href="/#models">Models</NavLink>
          <NavLink href="/use-case">Use Case</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <Link
          href="/contact"
          className="btn-tactical hidden items-center gap-2 border border-primary bg-primary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-background md:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
          Request Demo
        </Link>

        <button
          aria-label="Open menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="h-0.5 w-6 bg-foreground"></span>
          <span className="h-0.5 w-6 bg-foreground"></span>
          <span className="h-0.5 w-4 bg-primary ml-auto"></span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}
