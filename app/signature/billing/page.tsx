import { requireSignatureUser } from "@/lib/signature/auth";

import ProtectedShell from "../components/ProtectedShell";

export const metadata = {
  title: "Facturation — emcorp Signature",
};

export default async function BillingPage() {
  const user = await requireSignatureUser();

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const B = "var(--border)";

  return (
    <ProtectedShell user={user}>
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: F }}
        >
          Facturation
        </h1>
        <p className="mt-2 text-sm" style={{ color: T }}>
          Historique de vos paiements et factures.
        </p>
      </div>

      <div
        className="border rounded-2xl p-10 text-center"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <p className="text-sm" style={{ color: T }}>
          Aucune facture pour le moment.
        </p>
        <p className="mt-2 text-xs" style={{ color: TL }}>
          La facturation sera disponible prochainement. Pour toute question,
          contactez-nous a{" "}
          <a href="mailto:contact@emcorp.io" className="font-semibold underline">
            contact@emcorp.io
          </a>
          .
        </p>
      </div>
    </ProtectedShell>
  );
}
