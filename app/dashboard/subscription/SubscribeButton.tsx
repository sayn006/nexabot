"use client";
import { useState } from "react";

export default function SubscribeButton({ plan }: { plan: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur");
      }
    } catch {
      alert("Erreur lors de la création du paiement");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="btn btn-primary w-full"
    >
      {loading ? <span className="loading loading-spinner loading-sm" /> : "Choisir ce plan"}
    </button>
  );
}
