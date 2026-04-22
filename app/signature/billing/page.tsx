import { requireSignatureUser } from "@/lib/signature/auth";
import {
  fetchBillingData,
  formatCents,
  formatUnixDate,
  formatIsoDate,
  planLabel,
  SIGNATURE_PLANS,
  statusLabel,
} from "@/lib/signature/billing";

import ProtectedShell from "../components/ProtectedShell";

import PlanCheckoutButton from "./PlanCheckoutButton";

export const metadata = {
  title: "Facturation — emcorp Signature",
};

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

export default async function BillingPage() {
  const user = await requireSignatureUser();
  const { data, error } = await fetchBillingData();

  const subscription = data?.subscription ?? null;
  const currentPlan = subscription?.plan ?? null;
  const status = statusLabel(subscription?.status ?? null);

  const unlimited = currentPlan === "illimite";
  const used = subscription?.signaturesUsed ?? 0;
  const quota = subscription?.signaturesQuota ?? 0;
  const progress =
    unlimited || quota <= 0 ? 0 : Math.min(100, Math.round((used / quota) * 100));

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
          Gerez votre abonnement et consultez l&apos;historique des paiements.
        </p>
      </div>

      {error && (
        <div
          className="border rounded-xl px-4 py-3 mb-6 text-sm"
          style={{
            borderColor: "rgba(239,68,68,0.4)",
            background: "rgba(239,68,68,0.08)",
            color: "#b91c1c",
          }}
        >
          {error}
        </div>
      )}

      {/* Section 1 — Abonnement actuel */}
      <section className="mb-10">
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: F }}
        >
          Mon abonnement
        </h2>

        <div
          className="border rounded-2xl p-6"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          {subscription && currentPlan ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: TL }}
                  >
                    Plan actuel
                  </p>
                  <p
                    className="text-2xl font-bold mt-1"
                    style={{ fontFamily: F }}
                  >
                    {planLabel(currentPlan)}
                  </p>
                </div>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                  style={{ color: status.color, background: status.bg }}
                >
                  {status.label}
                </span>
              </div>

              {currentPlan !== "pay_per_use" && (
                <div className="mt-6">
                  <div
                    className="flex items-center justify-between text-xs font-semibold mb-2"
                    style={{ color: T }}
                  >
                    <span>Signatures utilisees</span>
                    <span>
                      {unlimited
                        ? `${used} / illimite`
                        : `${used} / ${quota}`}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <div
                      className="h-full transition-all"
                      style={{
                        width: unlimited ? "100%" : `${progress}%`,
                        background: A,
                        opacity: unlimited ? 0.35 : 1,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {subscription.startedAt && (
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: TL }}
                    >
                      Depuis
                    </p>
                    <p className="mt-1 font-medium">
                      {formatIsoDate(subscription.startedAt)}
                    </p>
                  </div>
                )}
                {subscription.nextRenewalAt && (
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: TL }}
                    >
                      Prochaine facturation
                    </p>
                    <p className="mt-1 font-medium">
                      {formatIsoDate(subscription.nextRenewalAt)}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm mb-2" style={{ color: T }}>
                Vous n&apos;avez pas encore d&apos;abonnement actif.
              </p>
              <p className="text-xs" style={{ color: TL }}>
                Choisissez un plan ci-dessous pour commencer.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2 — Choix de plan */}
      <section className="mb-10">
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: F }}
        >
          {currentPlan ? "Changer de plan" : "Choisir un plan"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIGNATURE_PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan;
            return (
              <div
                key={plan.id}
                className="border rounded-2xl p-6 flex flex-col"
                style={{
                  borderColor: plan.highlight ? A : B,
                  background: "var(--surface)",
                  borderWidth: plan.highlight ? 2 : 1,
                }}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: F }}
                  >
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        color: A,
                        background: "rgba(13,202,122,0.14)",
                      }}
                    >
                      Populaire
                    </span>
                  )}
                </div>

                <p
                  className="text-sm mt-2 min-h-[2.5rem]"
                  style={{ color: T }}
                >
                  {plan.description}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: F }}
                  >
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm" style={{ color: TL }}>
                    {plan.billingLabel}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm flex-1" style={{ color: T }}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: A }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <PlanCheckoutButton plan={plan.id} isCurrent={isCurrent} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-xs" style={{ color: TL }}>
          Le plan Pay-per-use est actif par defaut : aucune souscription, la
          carte est debitee 3 € HT a chaque signature completee. Pour
          l&apos;activer, enregistrez simplement une carte via une premiere
          demande.
        </p>
      </section>

      {/* Section 3 — Historique */}
      <section className="mb-6">
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: F }}
        >
          Factures Stripe
        </h2>

        {data && data.invoices.length > 0 ? (
          <div
            className="border rounded-2xl overflow-hidden"
            style={{ borderColor: B, background: "var(--surface)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-left"
                    style={{ color: TL, background: "rgba(0,0,0,0.02)" }}
                  >
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: B }}>
                  {data.invoices.map((inv) => (
                    <tr key={inv.id}>
                      <td className="px-4 py-3">{formatUnixDate(inv.created)}</td>
                      <td className="px-4 py-3 font-medium">
                        {formatCents(inv.amount_paid, inv.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <InvoiceStatusBadge status={inv.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {inv.invoice_pdf && (
                            <a
                              href={inv.invoice_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition hover:opacity-80"
                              style={{ background: "rgba(0,0,0,0.05)", color: T }}
                            >
                              PDF
                            </a>
                          )}
                          {inv.hosted_invoice_url && (
                            <a
                              href={inv.hosted_invoice_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition hover:opacity-90 text-white"
                              style={{ background: A }}
                            >
                              Voir
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="border rounded-2xl p-8 text-center text-sm"
            style={{ borderColor: B, background: "var(--surface)", color: T }}
          >
            Aucune facture pour le moment.
          </div>
        )}
      </section>

      <section>
        <h2
          className="text-lg font-bold mb-3"
          style={{ fontFamily: F }}
        >
          Paiements a l&apos;acte
        </h2>

        {data && data.paymentIntents.length > 0 ? (
          <div
            className="border rounded-2xl overflow-hidden"
            style={{ borderColor: B, background: "var(--surface)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-left"
                    style={{ color: TL, background: "rgba(0,0,0,0.02)" }}
                  >
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: B }}>
                  {data.paymentIntents.map((pi) => (
                    <tr key={pi.id}>
                      <td className="px-4 py-3">{formatUnixDate(pi.created)}</td>
                      <td className="px-4 py-3 font-medium">
                        {formatCents(pi.amount, pi.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <InvoiceStatusBadge status={pi.status} />
                      </td>
                      <td className="px-4 py-3" style={{ color: T }}>
                        {pi.description || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="border rounded-2xl p-8 text-center text-sm"
            style={{ borderColor: B, background: "var(--surface)", color: T }}
          >
            Aucun paiement a l&apos;acte enregistre.
          </div>
        )}
      </section>
    </ProtectedShell>
  );
}

function InvoiceStatusBadge({ status }: { status: string }) {
  const spec = invoiceStatusSpec(status);
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ color: spec.color, background: spec.bg }}
    >
      {spec.label}
    </span>
  );
}

function invoiceStatusSpec(status: string): {
  label: string;
  color: string;
  bg: string;
} {
  const s = (status || "").toLowerCase();
  if (s === "paid" || s === "succeeded") {
    return { label: "Paye", color: "#0aad66", bg: "rgba(13,202,122,0.14)" };
  }
  if (s === "open" || s === "processing" || s === "requires_action") {
    return { label: "En cours", color: "#1d4ed8", bg: "rgba(59,130,246,0.12)" };
  }
  if (s === "failed" || s === "canceled" || s === "cancelled") {
    return { label: "Echec", color: "#b91c1c", bg: "rgba(239,68,68,0.12)" };
  }
  if (s === "draft") {
    return { label: "Brouillon", color: "#64647a", bg: "rgba(100,100,122,0.12)" };
  }
  if (s === "void" || s === "uncollectible") {
    return { label: "Annule", color: "#b91c1c", bg: "rgba(239,68,68,0.12)" };
  }
  return { label: status || "Inconnu", color: "#64647a", bg: "rgba(100,100,122,0.12)" };
}
