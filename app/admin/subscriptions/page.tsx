"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubscriptionItem {
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
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  user: { id: string; email: string; name: string | null };
  customPlan: { id: string; name: string; slug: string } | null;
}

interface PlanOption {
  id: string;
  name: string;
  priceMensuel: number;
  priceAnnuel: number | null;
  stripePriceIdMensuel: string | null;
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [linkForm, setLinkForm] = useState({
    planId: "",
    email: "",
    nomComplet: "",
    frequence: "mensuel",
  });
  const [linkResult, setLinkResult] = useState<{ paymentLink?: string; error?: string } | null>(null);

  const fetchData = async () => {
    const [subsRes, plansRes] = await Promise.all([
      fetch("/api/admin/subscriptions"),
      fetch("/api/admin/plans"),
    ]);
    if (subsRes.ok) setSubscriptions(await subsRes.json());
    if (plansRes.ok) setPlans(await plansRes.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setLinkResult(null);

    const res = await fetch("/api/admin/subscriptions/send-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(linkForm),
    });

    const data = await res.json();
    if (res.ok || data.paymentLink) {
      setLinkResult({ paymentLink: data.paymentLink });
      if (res.ok) {
        setLinkForm({ planId: "", email: "", nomComplet: "", frequence: "mensuel" });
      }
    } else {
      setLinkResult({ error: data.error || "Erreur" });
    }
    setSending(false);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return <span className="badge badge-success badge-sm">Actif</span>;
      case "CANCELED": return <span className="badge badge-error badge-sm">Annule</span>;
      case "PAST_DUE": return <span className="badge badge-warning badge-sm">Impaye</span>;
      default: return <span className="badge badge-ghost badge-sm">{status}</span>;
    }
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
          Abonnements
        </h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => { setShowModal(true); setLinkResult(null); }}
        >
          Envoyer un lien de paiement
        </button>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          {subscriptions.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p>Aucun abonnement</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Plan</th>
                    <th>Statut</th>
                    <th>Frequence</th>
                    <th>Debut</th>
                    <th>Fin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="hover">
                      <td>
                        <div>
                          <span className="font-medium">
                            {sub.nomComplet || sub.user.name || "-"}
                          </span>
                          <br />
                          <span className="text-sm text-base-content/60">
                            {sub.email || sub.user.email}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm">
                        {sub.customPlan ? sub.customPlan.name : sub.planType}
                      </td>
                      <td>{statusBadge(sub.status)}</td>
                      <td className="text-sm">{sub.frequence}</td>
                      <td className="text-sm text-base-content/60">
                        {new Date(sub.currentPeriodStart).toLocaleDateString("fr-FR", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>
                      <td className="text-sm text-base-content/60">
                        {new Date(sub.currentPeriodEnd).toLocaleDateString("fr-FR", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>
                      <td>
                        <Link
                          href={`/admin/subscriptions/${sub.id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Send payment link modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Envoyer un lien de paiement</h3>

            {linkResult?.paymentLink && (
              <div className="alert alert-success mb-4">
                <div>
                  <p className="font-bold">Lien envoye !</p>
                  <p className="text-xs break-all mt-1">{linkResult.paymentLink}</p>
                </div>
              </div>
            )}
            {linkResult?.error && (
              <div className="alert alert-error mb-4">
                <span>{linkResult.error}</span>
              </div>
            )}

            <form onSubmit={handleSendLink} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Plan</span></label>
                <select
                  className="select select-bordered"
                  value={linkForm.planId}
                  onChange={(e) => setLinkForm((f) => ({ ...f, planId: e.target.value }))}
                  required
                >
                  <option value="">Choisir un plan...</option>
                  {plans.filter((p) => p.stripePriceIdMensuel).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.priceMensuel}€/mois
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Email client</span></label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={linkForm.email}
                  onChange={(e) => setLinkForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Nom complet (optionnel)</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={linkForm.nomComplet}
                  onChange={(e) => setLinkForm((f) => ({ ...f, nomComplet: e.target.value }))}
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Frequence</span></label>
                <select
                  className="select select-bordered"
                  value={linkForm.frequence}
                  onChange={(e) => setLinkForm((f) => ({ ...f, frequence: e.target.value }))}
                >
                  <option value="mensuel">Mensuel</option>
                  <option value="annuel">Annuel</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? <span className="loading loading-spinner loading-sm" /> : "Envoyer"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>
                  Fermer
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
}
