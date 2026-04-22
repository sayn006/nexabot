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
  const B = "var(--border)";

  return (
    <ProtectedShell user={user}>
      <div className="mb-8">
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

      <div
        className="border rounded-2xl p-6 sm:p-8"
        style={{ borderColor: B, background: "var(--surface)" }}
      >
        <NewSubmissionForm />
      </div>
    </ProtectedShell>
  );
}
