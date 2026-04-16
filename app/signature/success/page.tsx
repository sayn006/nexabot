"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

interface SignatureInfo {
  documentName: string;
  signers: Array<{ name: string; email: string }>;
  email: string;
  status: string;
}

export default function SignatureSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-sm" style={{ color: "var(--text-light)" }}>Chargement...</span></div>}>
      <SignatureSuccessContent />
    </Suspense>
  );
}

function SignatureSuccessContent() {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<SignatureInfo | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      setInfo(null);
    }
  }, [searchParams]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
            <span className="font-bold tracking-tight" style={{ fontFamily: F }}>
              emcorp
            </span>
          </Link>
        </div>
      </nav>

      <main className="min-h-screen px-6 py-24">
        <div className="max-w-lg mx-auto text-center">
          {/* Success icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: "var(--accent-bg)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: F }}
          >
            Paiement confirme !
          </h1>

          <p className="text-base mb-2" style={{ color: T }}>
            Votre document a ete envoye aux signataires.
          </p>
          <p className="text-sm mb-10" style={{ color: TL }}>
            Chaque signataire recevra un email avec un lien pour signer le document.
            Vous recevrez une copie signee une fois toutes les signatures recueillies.
          </p>

          {info && (
            <div
              className="text-left border rounded-2xl p-6 mb-10"
              style={{ borderColor: B, background: "var(--surface)" }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: TL }}>
                Recapitulatif
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: T }}>Document</span>
                  <span className="font-medium">{info.documentName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: T }}>Statut</span>
                  <span
                    className="font-semibold text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "var(--accent-bg)", color: A }}
                  >
                    {info.status === "SENT" ? "Envoye" : "Paye"}
                  </span>
                </div>
                <div>
                  <span className="text-xs" style={{ color: TL }}>
                    Signataires :
                  </span>
                  {info.signers.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: A }} />
                      <span>{s.name}</span>
                      <span style={{ color: TL }}>({s.email})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signature"
              className="px-7 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: A }}
            >
              Nouvelle signature
            </Link>
            <Link
              href="/"
              className="px-7 py-3 rounded-xl text-sm font-semibold border transition hover:bg-[var(--bg-alt)]"
              style={{ borderColor: B, color: T }}
            >
              Retour a l&apos;accueil
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-6" style={{ borderColor: B }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: TL }}
        >
          <div className="flex items-center gap-2">
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-5 w-auto" />
            <span className="font-semibold" style={{ color: "var(--text)", fontFamily: F }}>
              emcorp
            </span>
          </div>
          <span>&copy; 2026 emcorp.io</span>
        </div>
      </footer>
    </>
  );
}
