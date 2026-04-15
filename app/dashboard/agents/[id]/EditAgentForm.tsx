"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditAgentFormProps {
  agent: {
    id: string;
    name: string;
    type: string;
    status: string;
    webhookUrl: string | null;
  };
}

export default function EditAgentForm({ agent }: EditAgentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const status = formData.get("status") as string;
    const webhookUrl = formData.get("webhookUrl") as string;

    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, status, webhookUrl: webhookUrl || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la mise a jour");
      }

      setSuccess("Agent mis a jour avec succes");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Etes-vous sur de vouloir supprimer cet agent ?")) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      router.push("/dashboard/agents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setDeleting(false);
    }
  }

  return (
    <div className="card bg-base-100 shadow max-w-2xl">
      <div className="card-body">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
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
              defaultValue={agent.name}
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
              defaultValue={agent.type}
            >
              <option value="CHATBOT">Chatbot</option>
              <option value="VOICE">Vocal</option>
              <option value="WORKFLOW">Workflow</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Statut</span>
            </label>
            <select
              name="status"
              required
              className="select select-bordered w-full"
              defaultValue={agent.status}
            >
              <option value="DRAFT">Brouillon</option>
              <option value="ACTIVE">Actif</option>
              <option value="INACTIVE">Inactif</option>
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
              defaultValue={agent.webhookUrl || ""}
              placeholder="https://example.com/webhook"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm" />}
                Enregistrer
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push("/dashboard/agents")}
              >
                Retour
              </button>
            </div>
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <span className="loading loading-spinner loading-sm" />}
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
