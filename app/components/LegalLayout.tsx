import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  version?: string;
  effectiveDate?: string;
  children: ReactNode;
  showSignatureNav?: boolean;
}

export default function LegalLayout({
  title,
  subtitle,
  version,
  effectiveDate,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ borderColor: B, background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
            <span className="font-bold tracking-tight" style={{ fontFamily: F }}>
              emcorp
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium" style={{ color: T }}>
            <Link href="/" className="hover:text-[var(--text)] transition">Accueil</Link>
            <Link href="/signature" className="hover:text-[var(--text)] transition">Signature</Link>
            <Link href="/facturation-electronique" className="hover:text-[var(--text)] transition">
              Facturation elec.
            </Link>
            <Link href="/#contact" className="hover:text-[var(--text)] transition">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="px-6 py-12 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 pb-8 border-b" style={{ borderColor: B }}>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold mb-4 hover:gap-2 transition-all"
              style={{ color: A }}
            >
              <span aria-hidden="true">&larr;</span> Retour a l&apos;accueil
            </Link>
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: F }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-base leading-relaxed" style={{ color: T }}>
                {subtitle}
              </p>
            )}
            {(version || effectiveDate) && (
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: TL }}>
                {version && (
                  <span>
                    Version <strong style={{ color: T }}>{version}</strong>
                  </span>
                )}
                {effectiveDate && (
                  <span>
                    Entree en vigueur : <strong style={{ color: T }}>{effectiveDate}</strong>
                  </span>
                )}
              </div>
            )}
          </div>

          <article className="legal-prose">{children}</article>
        </div>
      </main>

      <Footer />

      <style>{`
        .legal-prose { color: var(--text); font-size: 0.95rem; line-height: 1.7; }
        .legal-prose h2 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          margin-top: 2.25rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .legal-prose h3 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .legal-prose p { margin-bottom: 0.9rem; color: var(--text-sub); }
        .legal-prose strong { color: var(--text); font-weight: 600; }
        .legal-prose ul, .legal-prose ol {
          margin-bottom: 1rem;
          padding-left: 1.25rem;
          color: var(--text-sub);
        }
        .legal-prose ul { list-style: none; padding-left: 0; }
        .legal-prose ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.4rem;
        }
        .legal-prose ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
        .legal-prose ol li { margin-bottom: 0.4rem; }
        .legal-prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
        .legal-prose a:hover { color: var(--accent-dark); }
        .legal-prose .callout {
          background: var(--accent-bg);
          border-left: 3px solid var(--accent);
          padding: 1rem 1.25rem;
          border-radius: 8px;
          margin: 1.25rem 0;
          font-size: 0.9rem;
        }
        .legal-prose .callout strong { color: var(--text); }
        .legal-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.88rem;
        }
        .legal-prose th, .legal-prose td {
          text-align: left;
          padding: 0.6rem 0.75rem;
          border-bottom: 1px solid var(--border);
        }
        .legal-prose th {
          background: var(--bg-alt);
          font-weight: 600;
          color: var(--text);
        }
        .legal-prose td { color: var(--text-sub); }
      `}</style>
    </>
  );
}
