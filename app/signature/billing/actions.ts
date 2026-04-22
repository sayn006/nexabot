"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { apiFetch, SignatureApiError } from "@/lib/signature/api";
import type { SignaturePlan } from "@/lib/signature/types";

interface CheckoutResponse {
  success: boolean;
  checkout_url?: string;
  session_id?: string;
  message?: string;
}

function getOriginFromHeaders(h: Headers): string {
  const origin = h.get("origin");
  if (origin) return origin.replace(/\/+$/, "");
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;
  return "";
}

export interface CheckoutActionState {
  error?: string;
}

/**
 * Lance une Checkout Session Stripe pour le plan demande.
 * Seuls les plans pack_50 et illimite passent par Checkout (pay_per_use
 * n'exige pas de souscription).
 */
export async function startCheckoutAction(
  _prev: CheckoutActionState | undefined,
  formData: FormData
): Promise<CheckoutActionState> {
  const plan = String(formData.get("plan") || "") as SignaturePlan;

  if (plan !== "pack_50" && plan !== "illimite") {
    return {
      error:
        plan === "pay_per_use"
          ? "Le plan Pay-per-use ne necessite pas d'abonnement : creez une demande, la carte sera debitee a la signature."
          : "Plan inconnu.",
    };
  }

  const h = await headers();
  const origin = getOriginFromHeaders(h);

  let checkoutUrl: string | null = null;
  try {
    const res = await apiFetch<CheckoutResponse>(
      "/api/signature/checkout",
      {
        method: "POST",
        body: {
          plan,
          success_url: origin
            ? `${origin}/signature/billing/success?session_id={CHECKOUT_SESSION_ID}`
            : undefined,
          cancel_url: origin
            ? `${origin}/signature/billing/cancel`
            : undefined,
        },
      }
    );

    if (!res.success || !res.checkout_url) {
      return { error: res.message || "Impossible d'initier le paiement." };
    }
    checkoutUrl = res.checkout_url;
  } catch (err) {
    if (err instanceof SignatureApiError) {
      return { error: err.message };
    }
    return { error: "Erreur reseau lors de l'initialisation du paiement." };
  }

  if (!checkoutUrl) {
    return { error: "URL Stripe manquante." };
  }

  // redirect() lance une exception; pas de code apres.
  redirect(checkoutUrl);
}
