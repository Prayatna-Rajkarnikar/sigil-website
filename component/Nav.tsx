"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} active={isActive(link)}>
              {link.label}
            </NavLink>
          ))}
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
      className={`relative font-display text-base transition-colors duration-300 ${
        active ? "text-seal" : "text-ink-soft hover:text-ink link-editorial"
      }`}
    >
      <span className="relative">
        {children}
        {active && (
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-0 right-0 h-px bg-seal"
            style={{ boxShadow: "0 0 6px rgba(255, 121, 27, 0.5)" }}
          />
        )}
      </span>
    </Link>
  );
}
