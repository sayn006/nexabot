"use client";

import { useState } from "react";

export default function PortalButton() {
  const [loading, setLoading] = useState(false);

  async function handlePortal() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur");
      }
    } catch {
      alert("Erreur lors de l'ouverture du portail");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className="btn btn-outline btn-primary"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        "Gerer mon abonnement"
      )}
    </button>
  );
}
