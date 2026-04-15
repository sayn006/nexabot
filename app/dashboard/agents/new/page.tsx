"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAgentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const webhookUrl = formData.get("webhookUrl") as string;

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, webhookUrl: webhookUrl || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la creation");
      }

      router.push("/dashboard/agents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Creer un agent
      </h1>

      <div className="card bg-base-100 shadow max-w-2xl">
        <div className="card-body">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom de l&apos;agent</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Mon chatbot"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                name="type"
                required
                className="select select-bordered w-full"
                defaultValue="CHATBOT"
              >
                <option value="CHATBOT">Chatbot</option>
                <option value="VOICE">Vocal</option>
                <option value="WORKFLOW">Workflow</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Webhook URL{" "}
                  <span className="text-base-content/50">(optionnel)</span>
                </span>
              </label>
              <input
                type="url"
                name="webhookUrl"
                placeholder="https://example.com/webhook"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm" />}
                Creer l&apos;agent
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push("/dashboard/agents")}
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
