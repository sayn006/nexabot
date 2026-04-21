"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";

const EMCORP_API =
  process.env.NEXT_PUBLIC_EMCORP_API || "https://app.emcorp.io";

type PlanSummary = {
  nom: string;
  description: string | null;
  prix_mensuel: number;
  prix_annuel: number | null;
  features: string[];
};

type CheckoutResponse = {
  checkout_url: string;
  plan: PlanSummary;
  frequence: "mensuel" | "annuel";
  client_nom: string;
};

export default function CheckoutTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [error, setError] = useState("");

  useEffect(() => {
    // Retour de Stripe : on n'enchaîne pas une nouvelle session
    if (status) return;

    let cancelled = false;

    async function redirectToStripe() {
      try {
        const res = await fetch(
          `${EMCORP_API}/checkout/subscription?token=${encodeURIComponent(token)}`,
          { cache: "no-store" },
        );

        const body = await res.json().catch(() => null);

        if (!res.ok) {
          if (!cancelled) {
            setError(
              (body as { error?: string } | null)?.error ??
                "Lien invalide ou expiré.",
            );
          }
          return;
        }

        const data = body as CheckoutResponse;
        if (!cancelled && data.checkout_url) {
          window.location.href = data.checkout_url;
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError("Impossible de joindre le serveur. Réessayez dans un instant.");
        }
      }
    }

    redirectToStripe();
    return () => {
      cancelled = true;
    };
  }, [token, status]);

  if (status === "success") {
    return (
      <StatusCard
        icon="success"
        title="Paiement confirmé !"
        message="Votre abonnement a été activé avec succès. Vous allez recevoir un email de confirmation."
        cta={{ href: "/", label: "Retour à l'accueil", variant: "btn-primary" }}
      />
    );
  }

  if (status === "cancel") {
    return (
      <StatusCard
        icon="warning"
        title="Paiement annulé"
        message="Le paiement a été annulé. Vous pouvez réessayer en utilisant le lien reçu par email."
        cta={{ href: "/", label: "Retour à l'accueil", variant: "btn-ghost" }}
      />
    );
  }

  if (error) {
    return (
      <StatusCard
        icon="error"
        title="Lien invalide"
        message={error}
        cta={{ href: "/", label: "Retour à l'accueil", variant: "btn-ghost" }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
        <div className="card-body text-center">
          <span
            className="loading loading-spinner loading-lg mx-auto"
            style={{ color: "#0dca7a" }}
          />
          <h1
            className="text-xl font-bold mt-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Redirection vers le paiement…
          </h1>
          <p className="text-base-content/60 text-sm mt-2">
            Vous allez être redirigé vers la page de paiement sécurisée.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  message,
  cta,
}: {
  icon: "success" | "warning" | "error";
  title: string;
  message: string;
  cta: { href: string; label: string; variant: string };
}) {
  const color =
    icon === "success"
      ? "text-success"
      : icon === "warning"
        ? "text-warning"
        : "text-error";
  const path =
    icon === "success"
      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      : icon === "warning"
        ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
        <div className="card-body text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 ${color} mx-auto`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={path}
            />
          </svg>
          <h1
            className="text-2xl font-bold mt-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            {title}
          </h1>
          <p className="text-base-content/60 mt-2">{message}</p>
          <div className="mt-6">
            <a href={cta.href} className={`btn ${cta.variant}`}>
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
