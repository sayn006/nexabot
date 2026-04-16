"use client";

import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";

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
    // If returning from Stripe with a status, don't redirect again
    if (status) return;

    // Redirect to the API route which validates and redirects to Stripe
    window.location.href = `/api/checkout/${token}`;
  }, [token, status]);

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
          <div className="card-body text-center">
            <div className="text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-success mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Paiement confirme !
            </h1>
            <p className="text-base-content/60 mt-2">
              Votre abonnement a ete active avec succes. Vous allez recevoir un email de confirmation.
            </p>
            <div className="mt-6">
              <a href="/" className="btn btn-primary">
                Retour a l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "cancel") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
          <div className="card-body text-center">
            <div className="text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-warning mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Paiement annule
            </h1>
            <p className="text-base-content/60 mt-2">
              Le paiement a ete annule. Vous pouvez reessayer en utilisant le lien recu par email.
            </p>
            <div className="mt-6">
              <a href="/" className="btn btn-ghost">
                Retour a l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
          <div className="card-body text-center">
            <div className="text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Lien invalide
            </h1>
            <p className="text-base-content/60 mt-2">{error}</p>
            <div className="mt-6">
              <a href="/" className="btn btn-ghost">
                Retour a l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state while redirecting to Stripe
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
        <div className="card-body text-center">
          <span className="loading loading-spinner loading-lg mx-auto" style={{ color: "#0dca7a" }} />
          <h1
            className="text-xl font-bold mt-4"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Redirection vers le paiement...
          </h1>
          <p className="text-base-content/60 text-sm mt-2">
            Vous allez etre redirige vers la page de paiement securisee.
          </p>
        </div>
      </div>
    </div>
  );
}
