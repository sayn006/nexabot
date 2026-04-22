import Link from "next/link";

import { requireSignatureUser } from "@/lib/signature/auth";

import ProtectedShell from "../../components/ProtectedShell";

export const metadata = {
  title: "Paiement annule — emcorp Signature",
};

const F = "var(--font-display)";
const T = "var(--text-sub)";
const A = "var(--accent)";
const B = "var(--border)";

export default async function BillingCancelPage() {
  const user = await requireSignatureUser();

  return (
    <ProtectedShell user={user}>
      <div
        className="border rounded-2xl p-10 text-center max-w-xl mx-auto"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <div
          className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(100,100,122,0.12)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64647a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: F }}
        >
          Paiement annule
        </h1>
        <p className="mt-3 text-sm" style={{ color: T }}>
          Aucun prelevement n&apos;a ete effectue. Vous pouvez reessayer quand
          vous le souhaitez.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/signature/billing"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            Retour au billing
          </Link>
          <Link
            href="/signature/dashboard"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
            style={{ background: "rgba(0,0,0,0.05)", color: T }}
          >
            Tableau de bord
          </Link>
        </div>
      </div>
    </ProtectedShell>
  );
}
