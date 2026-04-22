"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const A = "var(--accent)";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "/signature/dashboard", label: "Tableau de bord" },
  { href: "/signature/submissions", label: "Mes demandes" },
  { href: "/signature/submissions/new", label: "Nouvelle demande" },
  { href: "/signature/billing", label: "Facturation" },
];

export default function SignatureSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside
      className="lg:w-60 lg:shrink-0 lg:border-r lg:pr-6 lg:py-8"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--text-light)", fontFamily: F }}
      >
        Portail client
      </p>
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        {LINKS.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/signature/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
              style={{
                background: active ? "var(--accent-bg)" : "transparent",
                color: active ? A : T,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
