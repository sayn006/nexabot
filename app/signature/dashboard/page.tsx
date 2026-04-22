import Link from "next/link";

import { apiFetch, SignatureApiError } from "@/lib/signature/api";
import { requireSignatureUser } from "@/lib/signature/auth";
import {
  fetchBillingData,
  planLabel,
  statusLabel,
} from "@/lib/signature/billing";
import type { SignatureSubmission } from "@/lib/signature/types";

import ProtectedShell from "../components/ProtectedShell";
import { formatDate, statusBadge } from "../lib/ui";

export const metadata = {
  title: "Tableau de bord — emcorp Signature",
};

interface SubmissionsPayload {
  submissions?: SignatureSubmission[];
  data?: SignatureSubmission[];
  items?: SignatureSubmission[];
}

async function fetchSubmissions(): Promise<SignatureSubmission[]> {
  try {
    const data = await apiFetch<SubmissionsPayload | SignatureSubmission[]>(
      "/api/signature/submissions"
    );
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
      return (
        (data as SubmissionsPayload).submissions ||
        (data as SubmissionsPayload).data ||
        (data as SubmissionsPayload).items ||
        []
      );
    }
    return [];
  } catch (err) {
    if (err instanceof SignatureApiError) return [];
    return [];
  }
}

export default async function DashboardPage() {
  const user = await requireSignatureUser();
  const [submissions, billing] = await Promise.all([
    fetchSubmissions(),
    fetchBillingData(),
  ]);
  const subscription = billing.data?.subscription ?? null;
  const currentPlan = subscription?.plan ?? null;
  const subStatus = statusLabel(subscription?.status ?? null);
  const unlimited = currentPlan === "illimite";

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  const total = submissions.length;
  const completed = submissions.filter((s) => s.status === "completed").length;
  const pending = submissions.filter(
    (s) => s.status === "pending" || s.status === "in_progress"
  ).length;

  const latest = [...submissions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <ProtectedShell user={user}>
      <div className="mb-8">
        <p className="text-sm font-semibold mb-1" style={{ color: A }}>
          Bonjour {user.name || user.email}
        </p>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: F }}
        >
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm" style={{ color: T }}>
          Suivez vos demandes de signature en un coup d&apos;oeil.
        </p>
      </div>

      <div
        className="border rounded-2xl p-5 mb-6 flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <div className="flex items-center gap-4">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: TL }}
            >
              Plan
            </p>
            <p
              className="text-lg font-bold"
              style={{ fontFamily: F }}
            >
              {planLabel(currentPlan)}
            </p>
          </div>
          {currentPlan && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ color: subStatus.color, background: subStatus.bg }}
            >
              {subStatus.label}
            </span>
          )}
        </div>

        {currentPlan ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: TL }}
              >
                Signatures ce mois
              </p>
              <p className="font-semibold">
                {subscription
                  ? unlimited
                    ? `${subscription.signaturesUsed} / illimite`
                    : `${subscription.signaturesUsed} / ${subscription.signaturesQuota}`
                  : "—"}
              </p>
            </div>
            <Link
              href="/signature/billing"
              className="text-sm font-semibold hover:opacity-80 transition"
              style={{ color: A }}
            >
              Gerer
            </Link>
          </div>
        ) : (
          <Link
            href="/signature/billing"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            Choisir un plan
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Demandes totales" value={total} />
        <StatCard label="En cours" value={pending} />
        <StatCard label="Finalisees" value={completed} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ fontFamily: F }}>
          5 dernieres demandes
        </h2>
        <Link
          href="/signature/submissions"
          className="text-sm font-semibold hover:opacity-80 transition"
          style={{ color: A }}
        >
          Tout voir
        </Link>
      </div>

      {latest.length === 0 ? (
        <div
          className="border rounded-2xl p-10 text-center"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          <p className="text-sm mb-4" style={{ color: T }}>
            Aucune demande pour le moment.
          </p>
          <Link
            href="/signature/submissions/new"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            Creer ma premiere demande
          </Link>
        </div>
      ) : (
        <div
          className="border rounded-2xl overflow-hidden"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          <ul className="divide-y" style={{ borderColor: B }}>
            {latest.map((s) => (
              <li key={s.id} className="p-4 sm:p-5">
                <Link
                  href={`/signature/submissions/${s.id}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-sm">{s.documentName}</p>
                    <p className="text-xs mt-0.5" style={{ color: TL }}>
                      {formatDate(s.createdAt)} &middot; {s.signers.length} signataire
                      {s.signers.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  {statusBadge(s.status)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ProtectedShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  const F = "var(--font-display)";
  const TL = "var(--text-light)";
  const B = "var(--border)";
  return (
    <div
      className="border rounded-2xl p-5"
      style={{ borderColor: B, background: "var(--surface)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: TL }}>
        {label}
      </p>
      <p className="text-3xl font-bold mt-2" style={{ fontFamily: F }}>
        {value}
      </p>
    </div>
  );
}
