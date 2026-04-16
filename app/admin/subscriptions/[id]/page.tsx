"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SubscriptionDetail {
  id: string;
  userId: string;
  planType: string;
  planId: string | null;
  status: string;
  frequence: string;
  email: string | null;
  nomComplet: string | null;
  societe: string | null;
  stripeSubscriptionId: string;
  stripePriceId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  user: { id: string; email: string; name: string | null };
  customPlan: {
    id: string;
    name: string;
    slug: string;
    priceMensuel: number;
    priceAnnuel: number | null;
  } | null;
}

export default function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [sub, setSub] = useState<SubscriptionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSub(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (!confirm("Annuler cet abonnement ? L'abonnement sera annule sur Stripe.")) return;
    setCanceling(true);
    const res = await fetch(`/api/admin/subscriptions/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/subscriptions");
    } else {
      const data = await res.json();
      alert(data.error || "Erreur");
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="text-center py-12 text-base-content/50">
        <p>Abonnement introuvable</p>
        <Link href="/admin/subscriptions" className="btn btn-ghost btn-sm mt-4">
          Retour
        </Link>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return <span className="badge badge-success">Actif</span>;
      case "CANCELED": return <span className="badge badge-error">Annule</span>;
      case "PAST_DUE": return <span className="badge badge-warning">Impaye</span>;
      default: return <span className="badge badge-ghost">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Detail abonnement
        </h1>
        <Link href="/admin/subscriptions" className="btn btn-ghost btn-sm">
          Retour
        </Link>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-base-content/60">Client</p>
              <p className="font-medium">{sub.nomComplet || sub.user.name || "-"}</p>
              <p className="text-sm">{sub.email || sub.user.email}</p>
              {sub.societe && <p className="text-sm text-base-content/60">{sub.societe}</p>}
            </div>
            <div>
              <p className="text-sm text-base-content/60">Plan</p>
              <p className="font-medium">
                {sub.customPlan ? sub.customPlan.name : sub.planType}
              </p>
              <p className="text-sm">Frequence: {sub.frequence}</p>
            </div>
          </div>

          <div className="divider" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-base-content/60">Statut</p>
              <div className="mt-1">{statusBadge(sub.status)}</div>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Stripe ID</p>
              <p className="text-sm font-mono">{sub.stripeSubscriptionId}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-base-content/60">Debut de periode</p>
              <p className="text-sm">
                {new Date(sub.currentPeriodStart).toLocaleDateString("fr-FR", {
                  day: "2-digit", month: "long", year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-base-content/60">Fin de periode</p>
              <p className="text-sm">
                {new Date(sub.currentPeriodEnd).toLocaleDateString("fr-FR", {
                  day: "2-digit", month: "long", year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-base-content/60">Cree le</p>
            <p className="text-sm">
              {new Date(sub.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>

          {sub.status === "ACTIVE" && (
            <div className="pt-4">
              <button
                onClick={handleCancel}
                className="btn btn-error btn-sm"
                disabled={canceling}
              >
                {canceling ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Annuler l'abonnement"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
