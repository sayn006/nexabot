"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [docusealKey, setDocusealKey] = useState("");
  const [docusealUrl, setDocusealUrl] = useState("https://sign.cashloose.com");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.DOCUSEAL_API_KEY) setDocusealKey(data.DOCUSEAL_API_KEY);
        if (data.DOCUSEAL_URL) setDocusealUrl(data.DOCUSEAL_URL);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const saveSetting = async (key: string, value: string) => {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return res.ok;
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const results = await Promise.all([
        saveSetting("DOCUSEAL_API_KEY", docusealKey),
        saveSetting("DOCUSEAL_URL", docusealUrl),
      ]);
      if (results.every(Boolean)) setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Parametres</h1>

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-lg">Signature electronique</h2>
          <p className="text-sm text-base-content/60 mb-4">
            Configurez votre cle API DocuSeal pour activer l&apos;envoi automatique
            des documents a signer. Sans cle, les paiements sont enregistres mais
            l&apos;envoi DocuSeal est desactive.
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Cle API DocuSeal</span>
            </label>
            <input
              type="text"
              placeholder="Entrez votre cle API DocuSeal"
              value={docusealKey}
              onChange={(e) => setDocusealKey(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt text-base-content/50">
                Disponible sur docuseal.com ou votre instance auto-hebergee.
              </span>
            </label>
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-semibold">URL DocuSeal</span>
            </label>
            <input
              type="url"
              placeholder="https://sign.cashloose.com"
              value={docusealUrl}
              onChange={(e) => setDocusealUrl(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt text-base-content/50">
                URL de votre instance DocuSeal auto-hebergee. Par defaut : https://sign.cashloose.com
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={save}
              disabled={saving}
              className="btn btn-primary btn-sm"
            >
              {saving ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Enregistrer"
              )}
            </button>
            {saved && (
              <span className="text-sm text-success font-medium">
                Enregistre !
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
