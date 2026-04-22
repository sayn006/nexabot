import Link from "next/link";

import { requireSignatureUser } from "@/lib/signature/auth";

import ProtectedShell from "../../components/ProtectedShell";

import SuccessAutoRefresh from "./SuccessAutoRefresh";

export const metadata = {
  title: "Paiement confirme — emcorp Signature",
};

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function BillingSuccessPage({ searchParams }: PageProps) {
  const user = await requireSignatureUser();
  const params = await searchParams;
  const sessionId = params?.session_id || null;

  return (
    <ProtectedShell user={user}>
      <SuccessAutoRefresh />

      <div
        className="border rounded-2xl p-10 text-center max-w-xl mx-auto"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <div
          className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-5"
          style={{ background: "rgba(13,202,122,0.14)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={A}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: F }}
        >
          Abonnement active
        </h1>
        <p className="mt-3 text-sm" style={{ color: T }}>
          Merci, votre paiement a bien ete enregistre. Votre abonnement sera
          actif dans quelques secondes, le temps que Stripe confirme la
          transaction.
        </p>

        {sessionId && (
          <p className="mt-4 text-xs font-mono" style={{ color: TL }}>
            Session : {sessionId}
          </p>
        )}

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

        <p className="mt-6 text-xs" style={{ color: TL }}>
          Cette page se rafraichit automatiquement.
        </p>
      </div>
    </ProtectedShell>
  );
}
