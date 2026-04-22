import Link from "next/link";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const B = "var(--border)";

interface SignatureNavProps {
  authenticated?: boolean;
  userName?: string | null;
}

export default function SignatureNav({ authenticated, userName }: SignatureNavProps) {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/signature" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
          <span className="font-bold tracking-tight" style={{ fontFamily: F }}>
            emcorp <span style={{ color: T, fontWeight: 500 }}>Signature</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium" style={{ color: T }}>
          {authenticated ? (
            <>
              <Link href="/signature/dashboard" className="hidden sm:inline hover:opacity-80 transition">
                Tableau de bord
              </Link>
              <Link href="/signature/submissions" className="hidden sm:inline hover:opacity-80 transition">
                Demandes
              </Link>
              {userName && (
                <span className="hidden md:inline text-xs" style={{ color: "var(--text-light)" }}>
                  {userName}
                </span>
              )}
              <Link
                href="/signature/logout"
                className="hover:opacity-80 transition"
                aria-label="Se deconnecter"
              >
                Deconnexion
              </Link>
            </>
          ) : (
            <>
              <Link href="/signature/login" className="hover:opacity-80 transition">
                Connexion
              </Link>
              <Link
                href="/signature/register"
                className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Creer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
