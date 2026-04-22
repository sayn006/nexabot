import Link from "next/link";
import { notFound } from "next/navigation";

import { apiFetch, SignatureApiError } from "@/lib/signature/api";
import { requireSignatureUser } from "@/lib/signature/auth";
import type { SignatureSubmission } from "@/lib/signature/types";

import ProtectedShell from "../../components/ProtectedShell";
import { formatDate, statusBadge } from "../../lib/ui";

export const metadata = {
  title: "Detail demande — emcorp Signature",
};

async function fetchSubmission(id: string): Promise<SignatureSubmission | null> {
  try {
    const data = await apiFetch<SignatureSubmission | { submission: SignatureSubmission }>(
      `/api/signature/submissions/${encodeURIComponent(id)}`
    );
    if (data && typeof data === "object" && "submission" in data) {
      return (data as { submission: SignatureSubmission }).submission;
    }
    return data as SignatureSubmission;
  } catch (err) {
    if (err instanceof SignatureApiError && err.status === 404) return null;
    return null;
  }
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireSignatureUser();
  const submission = await fetchSubmission(id);

  if (!submission) notFound();

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  return (
    <ProtectedShell user={user}>
      <div className="mb-6">
        <Link
          href="/signature/submissions"
          className="text-sm font-medium hover:opacity-80 transition"
          style={{ color: T }}
        >
          &larr; Retour aux demandes
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: F }}
          >
            {submission.documentName}
          </h1>
          <p className="mt-1 text-sm" style={{ color: TL }}>
            Cree le {formatDate(submission.createdAt)}
          </p>
        </div>
        <div>{statusBadge(submission.status)}</div>
      </div>

      <div
        className="border rounded-2xl p-6 mb-6"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: TL }}>
          Signataires
        </h2>
        {submission.signers.length === 0 ? (
          <p className="text-sm" style={{ color: T }}>
            Aucun signataire.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: B }}>
            {submission.signers.map((s, i) => (
              <li key={`${s.email}-${i}`} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs" style={{ color: TL }}>
                    {s.email}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {s.signedAt && (
                    <span style={{ color: TL }}>{formatDate(s.signedAt)}</span>
                  )}
                  {statusBadge(
                    (s.status === "signed"
                      ? "completed"
                      : s.status === "declined"
                        ? "cancelled"
                        : "pending") as SignatureSubmission["status"]
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {submission.signedDocumentUrl && (
        <div
          className="border rounded-2xl p-6"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: TL }}>
            Document signe
          </h2>
          <a
            href={submission.signedDocumentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            Telecharger le PDF signe
          </a>
        </div>
      )}
    </ProtectedShell>
  );
}
