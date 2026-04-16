"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PlanItem {
  id: string;
  name: string;
  slug: string;
  priceMensuel: number;
  priceAnnuel: number | null;
  active: boolean;
  surDemande: boolean;
  badgeText: string | null;
  ordre: number;
  stripeProductId: string | null;
  stripePriceIdMensuel: string | null;
  stripePriceIdAnnuel: string | null;
  _count: { subscriptions: number };
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  const fetchPlans = async () => {
    const res = await fetch("/api/admin/plans");
    if (res.ok) setPlans(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce plan ?")) return;
    const res = await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });
    if (res.ok) fetchPlans();
    else {
      const data = await res.json();
      alert(data.error || "Erreur");
    }
  };

  const handleSync = async (id: string) => {
    setSyncing(id);
    const res = await fetch(`/api/admin/plans/${id}/sync-stripe`, { method: "POST" });
    if (res.ok) {
      await fetchPlans();
    } else {
      const data = await res.json();
      alert(data.error || "Erreur Stripe");
    }
    setSyncing(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Plans
        </h1>
        <Link href="/admin/plans/new" className="btn btn-primary btn-sm">
          + Nouveau plan
        </Link>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          {plans.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p>Aucun plan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ordre</th>
                    <th>Nom</th>
                    <th>Slug</th>
                    <th>Prix mensuel</th>
                    <th>Prix annuel</th>
                    <th>Statut</th>
                    <th>Stripe</th>
                    <th>Abonnements</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover">
                      <td className="text-sm">{plan.ordre}</td>
                      <td className="font-medium">
                        {plan.name}
                        {plan.badgeText && (
                          <span className="badge badge-primary badge-xs ml-2">
                            {plan.badgeText}
                          </span>
                        )}
                      </td>
                      <td className="text-sm text-base-content/60">{plan.slug}</td>
                      <td className="text-sm">{plan.priceMensuel}€/mois</td>
                      <td className="text-sm">
                        {plan.priceAnnuel ? `${plan.priceAnnuel}€/an` : "-"}
                      </td>
                      <td>
                        {plan.active ? (
                          <span className="badge badge-success badge-sm">Actif</span>
                        ) : (
                          <span className="badge badge-ghost badge-sm">Inactif</span>
                        )}
                        {plan.surDemande && (
                          <span className="badge badge-warning badge-sm ml-1">Sur demande</span>
                        )}
                      </td>
                      <td>
                        {plan.stripePriceIdMensuel ? (
                          <span className="badge badge-success badge-sm">Synced</span>
                        ) : (
                          <span className="badge badge-ghost badge-sm">Non synced</span>
                        )}
                      </td>
                      <td className="text-sm">{plan._count.subscriptions}</td>
                      <td>
                        <div className="flex gap-1">
                          <Link
                            href={`/admin/plans/${plan.id}`}
                            className="btn btn-ghost btn-xs"
                          >
                            Editer
                          </Link>
                          <button
                            onClick={() => handleSync(plan.id)}
                            className="btn btn-outline btn-xs"
                            disabled={syncing === plan.id}
                          >
                            {syncing === plan.id ? (
                              <span className="loading loading-spinner loading-xs" />
                            ) : (
                              "Sync Stripe"
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(plan.id)}
                            className="btn btn-ghost btn-xs text-error"
                          >
                            Suppr.
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
