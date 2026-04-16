"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    priceMensuel: "",
    priceAnnuel: "",
    featuresText: "",
    active: true,
    surDemande: false,
    badgeText: "",
    ordre: "0",
  });

  useEffect(() => {
    fetch(`/api/admin/plans/${id}`)
      .then((res) => res.json())
      .then((plan) => {
        const features = Array.isArray(plan.features) ? plan.features : [];
        setForm({
          name: plan.name || "",
          slug: plan.slug || "",
          description: plan.description || "",
          priceMensuel: String(plan.priceMensuel ?? ""),
          priceAnnuel: plan.priceAnnuel ? String(plan.priceAnnuel) : "",
          featuresText: features.join("\n"),
          active: plan.active ?? true,
          surDemande: plan.surDemande ?? false,
          badgeText: plan.badgeText || "",
          ordre: String(plan.ordre ?? 0),
        });
        setFetching(false);
      })
      .catch(() => {
        setError("Plan introuvable");
        setFetching(false);
      });
  }, [id]);

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const features = form.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/plans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        priceMensuel: parseFloat(form.priceMensuel),
        priceAnnuel: form.priceAnnuel ? parseFloat(form.priceAnnuel) : null,
        features,
        active: form.active,
        surDemande: form.surDemande,
        badgeText: form.badgeText || null,
        ordre: parseInt(form.ordre) || 0,
      }),
    });

    if (res.ok) {
      router.push("/admin/plans");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Modifier le plan
      </h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Nom</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Slug</span></label>
              <input
                type="text"
                className="input input-bordered"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                required
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea
                className="textarea textarea-bordered"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Prix mensuel (EUR)</span></label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered"
                  value={form.priceMensuel}
                  onChange={(e) => setForm((f) => ({ ...f, priceMensuel: e.target.value }))}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Prix annuel (EUR, optionnel)</span></label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered"
                  value={form.priceAnnuel}
                  onChange={(e) => setForm((f) => ({ ...f, priceAnnuel: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Features (une par ligne)</span></label>
              <textarea
                className="textarea textarea-bordered"
                value={form.featuresText}
                onChange={(e) => setForm((f) => ({ ...f, featuresText: e.target.value }))}
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Badge text (optionnel)</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={form.badgeText}
                  onChange={(e) => setForm((f) => ({ ...f, badgeText: e.target.value }))}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Ordre</span></label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={form.ordre}
                  onChange={(e) => setForm((f) => ({ ...f, ordre: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                />
                <span className="label-text">Actif</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={form.surDemande}
                  onChange={(e) => setForm((f) => ({ ...f, surDemande: e.target.checked }))}
                />
                <span className="label-text">Sur demande</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Enregistrer"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push("/admin/plans")}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
