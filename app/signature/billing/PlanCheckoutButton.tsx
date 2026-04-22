"use client";

import { useActionState } from "react";

import type { SignaturePlan } from "@/lib/signature/types";

import { startCheckoutAction, type CheckoutActionState } from "./actions";

interface PlanCheckoutButtonProps {
  plan: SignaturePlan;
  isCurrent: boolean;
}

export default function PlanCheckoutButton({
  plan,
  isCurrent,
}: PlanCheckoutButtonProps) {
  const [state, formAction, pending] = useActionState<
    CheckoutActionState | undefined,
    FormData
  >(startCheckoutAction, undefined);

  const A = "var(--accent)";

  if (isCurrent) {
    return (
      <button
        type="button"
        disabled
        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
        style={{
          background: "rgba(0,0,0,0.05)",
          color: "var(--text-light)",
        }}
      >
        Plan actuel
      </button>
    );
  }

  const isPayPerUse = plan === "pay_per_use";

  return (
    <form action={formAction}>
      <input type="hidden" name="plan" value={plan} />
      <button
        type="submit"
        disabled={pending || isPayPerUse}
        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: A }}
      >
        {pending
          ? "Redirection..."
          : isPayPerUse
          ? "Actif par defaut"
          : "Souscrire"}
      </button>
      {state?.error && (
        <p
          className="mt-2 text-xs"
          style={{ color: "#b91c1c" }}
          role="alert"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}
