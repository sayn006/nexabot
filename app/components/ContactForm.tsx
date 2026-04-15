"use client";
import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const A = "var(--accent)";
  const B = "var(--border)";
  const T = "var(--text-sub)";
  const F = "var(--font-display)";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de l'envoi.");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: A }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: F }}>Message envoyé !</h3>
        <p className="text-sm" style={{ color: T }}>Nous reviendrons vers vous dans les 24h.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium underline transition hover:opacity-70"
          style={{ color: A }}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: T }}>
            Nom <span style={{ color: A }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2"
            style={{ borderColor: B, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: T }}>
            Email <span style={{ color: A }}>*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="vous@entreprise.com"
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2"
            style={{ borderColor: B, background: "var(--bg)", color: "var(--text)" }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: T }}>
          Entreprise
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Nom de votre entreprise (optionnel)"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2"
          style={{ borderColor: B, background: "var(--bg)", color: "var(--text)" }}
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1.5" style={{ color: T }}>
          Message <span style={{ color: A }}>*</span>
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Décrivez votre besoin : type de business, volume de clients, fonctionnalités souhaitées..."
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:ring-2 resize-none"
          style={{ borderColor: B, background: "var(--bg)", color: "var(--text)" }}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full text-white font-semibold py-3.5 rounded-xl text-sm transition hover:opacity-90 hover:shadow-lg disabled:opacity-60"
        style={{ background: A }}
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </button>
      <p className="text-center text-xs" style={{ color: T }}>
        Nous répondons sous 24h. Pas de spam.
      </p>
    </form>
  );
}
