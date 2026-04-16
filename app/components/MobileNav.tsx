"use client";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const A = "var(--accent)";
  const T = "var(--text-sub)";

  const links = [
    { href: "#services", label: "Services" },
    { href: "#expertises", label: "Expertises" },
    { href: "#process", label: "Fonctionnement" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-lg border transition hover:bg-[var(--bg-alt)]"
        style={{ borderColor: "var(--border)" }}
        aria-label="Menu"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="absolute top-14 left-0 right-0 border-b px-6 py-4 z-50"
          style={{
            background: "rgba(250,250,248,0.98)",
            backdropFilter: "blur(12px)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2 transition hover:text-[var(--text)]"
                style={{ color: T }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center transition hover:opacity-90 mt-1"
              style={{ background: A }}
            >
              Démo gratuite
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
