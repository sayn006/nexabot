import { requireSignatureUser } from "@/lib/signature/auth";

import ProtectedShell from "../../components/ProtectedShell";
import NewSubmissionForm from "./NewSubmissionForm";

export const metadata = {
  title: "Nouvelle demande — emcorp Signature",
};

export default async function NewSubmissionPage() {
  const user = await requireSignatureUser();

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  return (
    <ProtectedShell user={user}>
      <div className="mb-6">
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ fontFamily: F }}
        >
          Nouvelle demande
        </h1>
        <p className="mt-2 text-sm" style={{ color: T }}>
          Uploadez votre PDF et ajoutez les signataires.
        </p>
      </div>

      {/* Encart explicatif "comment ca marche" */}
      <aside
        aria-label="Comment ca marche"
        className="border rounded-xl px-4 py-3 mb-6 flex items-start gap-3 text-sm"
        style={{
          borderColor: "rgba(13,202,122,0.25)",
          background: "rgba(13,202,122,0.06)",
        }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: A, color: "white" }}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div>
          <p className="font-semibold" style={{ color: A }}>
            Comment ca marche
          </p>
          <p className="text-xs mt-1" style={{ color: T }}>
            Tu envoies un PDF, les signataires recoivent un lien par email
            securise, tu es notifie automatiquement quand le document est
            signe. Valeur legale conforme eIDAS.
          </p>
          <p className="text-[11px] mt-1" style={{ color: TL }}>
            Mode TEST Stripe actif : aucun prelevement reel pendant la phase
            de test.
          </p>
        </div>
      </aside>

      <div
        className="border rounded-2xl p-6 sm:p-8"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <NewSubmissionForm />
      </div>
    </ProtectedShell>
  );
}
