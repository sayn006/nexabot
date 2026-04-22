import Link from "next/link";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

interface FooterColumn {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}

const columns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Chatbot IA", href: "/#produits" },
      { label: "Signature electronique", href: "/signature" },
      { label: "Facturation electronique", href: "/facturation-electronique" },
      { label: "Automatisation (n8n)", href: "/#stack" },
      { label: "Developpement sur mesure", href: "/#contact" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "A propos", href: "/#produits" },
      { label: "Nos references", href: "/#references" },
      { label: "Fonctionnement", href: "/#process" },
      { label: "Tarifs", href: "/#tarifs" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Mentions legales", href: "/mentions-legales" },
      { label: "CGU", href: "/signature/cgu" },
      { label: "CGV", href: "/signature/cgv" },
      { label: "Confidentialite (RGPD)", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 000 12a11.5 11.5 0 007.86 10.92c.57.1.78-.25.78-.56v-2.18c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.55-.3-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.3-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.17a11 11 0 015.78 0c2.2-1.48 3.16-1.17 3.16-1.17.63 1.59.24 2.76.12 3.06.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.35-5.25 5.64.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.78.56A11.5 11.5 0 0024 12 11.5 11.5 0 0012 .5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: B, background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="text-sm font-bold mb-4 uppercase tracking-wider"
                style={{ fontFamily: F, color: "var(--text)" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition hover:text-[var(--text)]"
                      style={{ color: T }}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ fontFamily: F, color: "var(--text)" }}
            >
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm" style={{ color: T }}>
              <li className="flex items-center gap-2">
                <span style={{ color: A }}><IconMail /></span>
                <a href="mailto:contact@emcorp.io" className="hover:text-[var(--text)] transition">
                  contact@emcorp.io
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: A }}><IconPhone /></span>
                <a href="tel:+33643165273" className="hover:text-[var(--text)] transition">
                  06 43 16 52 73
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: A }}><IconPin /></span>
                <span>Paris, France</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/company/emcorp-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn emcorp.io"
                  className="transition hover:text-[var(--accent)]"
                  style={{ color: T }}
                >
                  <IconLinkedIn />
                </a>
                <a
                  href="https://github.com/emcorp-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub emcorp.io"
                  className="transition hover:text-[var(--accent)]"
                  style={{ color: T }}
                >
                  <IconGitHub />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: B }}
        >
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-6 w-auto" />
            <div>
              <div className="font-bold" style={{ fontFamily: F, color: "var(--text)" }}>
                emcorp
              </div>
              <div className="text-xs" style={{ color: TL }}>
                Developpement Web, Mobile & IA — Solutions sur mesure
              </div>
            </div>
          </div>
          <div className="text-xs text-center md:text-right" style={{ color: TL }}>
            &copy; 2026 emcorp.io — Tous droits reserves.
          </div>
        </div>
      </div>
    </footer>
  );
}
