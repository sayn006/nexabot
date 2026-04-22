// Helpers pour le portail Signature — facturation / abonnements.

import { apiFetch, SignatureApiError } from "./api";
import type {
  SignatureBillingApiResponse,
  SignatureBillingData,
  SignaturePlan,
  SignatureSubscriptionInfo,
  SignatureSubscriptionStatus,
} from "./types";

export interface PlanDefinition {
  id: SignaturePlan;
  name: string;
  priceLabel: string;
  billingLabel: string;
  description: string;
  features: string[];
  recurring: boolean;
  highlight?: boolean;
}

export const SIGNATURE_PLANS: PlanDefinition[] = [
  {
    id: "pay_per_use",
    name: "Pay-per-use",
    priceLabel: "3 €",
    billingLabel: "par signature",
    description: "Sans engagement. Payez seulement les signatures realisees.",
    features: [
      "3 € HT par signature completee",
      "Aucun abonnement",
      "Facturation automatique Stripe",
    ],
    recurring: false,
  },
  {
    id: "pack_50",
    name: "Pack 50",
    priceLabel: "99 €",
    billingLabel: "par mois",
    description: "50 signatures incluses chaque mois.",
    features: [
      "50 signatures / mois",
      "Parfait pour petits volumes",
      "Annulation a tout moment",
    ],
    recurring: true,
    highlight: true,
  },
  {
    id: "illimite",
    name: "Illimite",
    priceLabel: "49 €",
    billingLabel: "par mois",
    description: "Signatures illimitees pour les gros volumes.",
    features: [
      "Signatures illimitees",
      "Priorite support",
      "Annulation a tout moment",
    ],
    recurring: true,
  },
];

export function getPlanDefinition(plan: SignaturePlan | null): PlanDefinition | null {
  if (!plan) return null;
  return SIGNATURE_PLANS.find((p) => p.id === plan) || null;
}

function normalizePlan(value: string | null | undefined): SignaturePlan | null {
  if (!value) return null;
  if (value === "pay_per_use" || value === "pack_50" || value === "illimite") {
    return value;
  }
  return null;
}

function normalizeStatus(
  value: string | null | undefined
): SignatureSubscriptionStatus | null {
  if (!value) return null;
  if (value === "active" || value === "past_due" || value === "cancelled") {
    return value;
  }
  return null;
}

/**
 * Recupere les donnees de facturation normalisees pour le client connecte.
 * Retourne null en cas d'erreur API (affiche empty state dans la page).
 */
export async function fetchBillingData(): Promise<{
  data: SignatureBillingData | null;
  error: string | null;
}> {
  try {
    const res = await apiFetch<SignatureBillingApiResponse>(
      "/api/signature/billing"
    );

    const subRaw = res.subscription;
    const subscription: SignatureSubscriptionInfo | null = subRaw
      ? {
          plan: normalizePlan(subRaw.plan),
          status: normalizeStatus(subRaw.statut),
          signaturesUsed: Number(subRaw.used || 0),
          signaturesQuota: Number(subRaw.quota || 0),
          startedAt: subRaw.started_at || null,
          nextRenewalAt: subRaw.next_renewal_at || null,
        }
      : null;

    return {
      data: {
        subscription,
        paymentIntents: Array.isArray(res.payment_intents)
          ? res.payment_intents
          : [],
        invoices: Array.isArray(res.invoices) ? res.invoices : [],
      },
      error: null,
    };
  } catch (err) {
    if (err instanceof SignatureApiError) {
      return { data: null, error: err.message };
    }
    return { data: null, error: "Impossible de recuperer la facturation." };
  }
}

export function formatCents(
  cents: number,
  currency: string = "EUR"
): string {
  const amount = (cents || 0) / 100;
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: (currency || "EUR").toUpperCase(),
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export function formatUnixDate(ts: number | null | undefined): string {
  if (!ts) return "";
  try {
    const d = new Date(ts * 1000);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

export function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

export function planLabel(plan: SignaturePlan | null): string {
  const def = getPlanDefinition(plan);
  return def ? def.name : "Aucun plan";
}

export function statusLabel(status: SignatureSubscriptionStatus | null): {
  label: string;
  color: string;
  bg: string;
} {
  switch (status) {
    case "active":
      return { label: "Actif", color: "#0aad66", bg: "rgba(13,202,122,0.14)" };
    case "past_due":
      return {
        label: "Paiement en retard",
        color: "#b25e00",
        bg: "rgba(245,158,11,0.15)",
      };
    case "cancelled":
      return { label: "Annule", color: "#b91c1c", bg: "rgba(239,68,68,0.12)" };
    default:
      return { label: "Inconnu", color: "#64647a", bg: "rgba(100,100,122,0.12)" };
  }
}
