"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { PRIMARY_RGB } from "@/lib/theme";

/**
 * Nav — sticky top bar with desktop horizontal links and a mobile drawer.
 *
 * Two non-obvious decisions:
 *
 *   1. The mobile drawer is rendered as a SIBLING of <nav>, not a child.
 *      The <nav> uses backdrop-blur for its frosted look, and per CSS spec
 *      `backdrop-filter` creates a containing block for fixed descendants.
 *      A drawer inside the nav would be clipped to the nav bar's tiny
 *      height (~57px). Returning <>nav, drawer</> escapes that.
 *
 *   2. Active section detection uses IntersectionObserver on the homepage
 *      so the underlined link tracks the section currently in view. On
 *      other pages it falls back to URL matching.
 */

/**
 * useActiveSection — observes a list of section IDs in the DOM and returns
 * the one whose intersection ratio is highest. Re-runs when the route
 * changes so it picks up sections on the freshly-mounted page.
 */
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);
    const ratios = new Map<string, number>();

    const update = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      ratios.forEach((r, id) => {
        if (r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      });
      setActive(bestRatio > 0.12 ? bestId : null);
    };

    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios.set(id, entry.intersectionRatio);
          update();
        },
        { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [idsKey, pathname]);

  return active;
}

export default function Nav() {
  const pathname = usePathname();
  const activeSection = useActiveSection(["mission", "actor", "models"]);
  const onHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  type NavItem = { href: string; label: string; section?: string };
  const links: NavItem[] = [
    { href: "/#mission", label: "Mission", section: "mission" },
    { href: "/actors", label: "Actor", section: "actor" },
    { href: "/#models", label: "Models", section: "models" },
    { href: "/use-case", label: "Use Case" },
    { href: "/contact", label: "Contact" },
  ];

  function isActive(link: NavItem): boolean {
    /* On the homepage, prefer the section currently in view. */
    if (onHome && link.section && activeSection === link.section) return true;
    /* For non-anchor links, fall back to URL match. */
    if (!link.section && pathname === link.href) return true;
    /* Special-case: on /actors page, the "Actor" link is active by URL. */
    if (link.href === "/actors" && pathname === "/actors") return true;
    return false;
  }

  // Close drawer when route changes and lock body scroll while open
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:py-5 lg:px-12">
        <Link href="/" className="group inline-flex items-center" aria-label="Sigil">
          <Logo className="h-7 w-auto text-foreground transition-colors group-hover:text-primary sm:h-9" />
        </Link>

        <div className="hidden items-baseline gap-7 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} active={isActive(link)}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary transition hover:text-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
          Request Briefing
          <span aria-hidden>→</span>
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative z-60 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-white/15 bg-white/5 p-1 text-foreground transition hover:border-primary/60 hover:bg-primary/10"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-foreground transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-foreground transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45 bg-foreground" : ""
            }`}
          />
        </button>
      </div>
    </nav>

      {/* Mobile drawer — rendered outside <nav> so backdrop-blur on the nav
          doesn't trap the fixed-position drawer in the nav's containing block. */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          style={{ background: "#050505" }}
          className="md:hidden fixed inset-x-0 bottom-0 top-[57px] z-50 overflow-y-auto px-6 pt-6 pb-12"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group flex items-center justify-between border-b border-white/10 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition ${
                      active
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                    style={
                      active
                        ? { textShadow: `0 0 12px rgba(${PRIMARY_RGB}, 0.35)` }
                        : undefined
                    }
                  >
                    <span className="flex items-center gap-3">
                      {active && (
                        <span
                          aria-hidden
                          className="h-1 w-1 rounded-full bg-primary"
                        />
                      )}
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-6">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/70 bg-primary/8 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary transition hover:border-primary hover:bg-primary/18"
            >
              <span className="h-1 w-1 rounded-full bg-primary animate-pulse" aria-hidden />
              Request Briefing
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
        active ? "text-primary" : "text-muted hover:text-foreground"
      }`}
    >
      <span className="relative">
        {children}
        {active && (
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary"
            style={{ boxShadow: `0 0 6px rgba(${PRIMARY_RGB}, 0.5)` }}
          />
        )}
      </span>
    </Link>
  );
}
