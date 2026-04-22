import Link from "next/link";

import { apiFetch, SignatureApiError } from "@/lib/signature/api";
import { requireSignatureUser } from "@/lib/signature/auth";
import type { SignatureSubmission } from "@/lib/signature/types";

import ProtectedShell from "../components/ProtectedShell";
import { formatDate, statusBadge } from "../lib/ui";

export const metadata = {
  title: "Mes demandes — emcorp Signature",
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

export default async function SubmissionsPage() {
  const user = await requireSignatureUser();
  const submissions = await fetchSubmissions();

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  const sorted = [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <ProtectedShell user={user}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: F }}
          >
            Mes demandes
          </h1>
          <p className="mt-1 text-sm" style={{ color: T }}>
            Toutes vos demandes de signature, classees par date.
          </p>
        </div>
        <Link
          href="/signature/submissions/new"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 self-start"
          style={{ background: A }}
        >
          Nouvelle demande
        </Link>
      </div>

      {sorted.length === 0 ? (
        <div
          className="border rounded-2xl p-10 text-center"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          <p className="text-sm" style={{ color: T }}>
            Vous n&apos;avez pas encore cree de demande.
          </p>
        </div>
      ) : (
        <div
          className="border rounded-2xl overflow-hidden"
          style={{ borderColor: B, background: "var(--surface)" }}
        >
          <ul className="divide-y" style={{ borderColor: B }}>
            {sorted.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/signature/submissions/${s.id}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-[var(--bg-alt)] transition"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{s.documentName}</p>
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
