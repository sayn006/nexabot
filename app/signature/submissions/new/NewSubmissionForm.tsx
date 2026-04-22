"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { createSubmissionAction, type NewSubmissionState } from "./actions";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

const initialState: NewSubmissionState = {};

interface Signer {
  name: string;
  email: string;
}

export default function NewSubmissionForm() {
  const [state, formAction, pending] = useActionState(createSubmissionAction, initialState);
  const [signers, setSigners] = useState<Signer[]>([{ name: "", email: "" }]);
  const [file, setFile] = useState<File | null>(null);

  const addSigner = () => setSigners([...signers, { name: "", email: "" }]);
  const removeSigner = (i: number) => {
    if (signers.length <= 1) return;
    setSigners(signers.filter((_, idx) => idx !== i));
  };
  const updateSigner = (i: number, key: keyof Signer, value: string) => {
    const next = [...signers];
    next[i] = { ...next[i], [key]: value };
    setSigners(next);
  };

  return (
    <form action={formAction} className="space-y-6">
      {state?.quotaExceeded ? (
        <div
          role="alert"
          className="p-4 rounded-lg text-sm font-medium"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.35)",
            color: "#92400e",
          }}
        >
          <p className="font-bold mb-1">Quota mensuel depasse</p>
          <p className="mb-3">
            Vous avez atteint la limite de votre plan. Upgrade vers le plan
            superieur pour continuer a creer des demandes.
          </p>
          <Link
            href="/signature/billing"
            className="inline-block px-4 py-2 rounded-lg text-xs font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            Voir les plans
          </Link>
        </div>
      ) : state?.error ? (
        <div
          role="alert"
          className="p-3 rounded-lg text-sm font-medium text-red-700"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="documentName" className="block text-sm font-semibold mb-2">
          Nom du document
        </label>
        <input
          id="documentName"
          name="documentName"
          type="text"
          required
          placeholder="Contrat de prestation"
          className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
          style={{ borderColor: B, ["--tw-ring-color" as string]: A } as React.CSSProperties}
        />
        {state?.fieldErrors?.documentName && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.documentName}</p>
        )}
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-semibold mb-2">
          Fichier PDF
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-sm"
        />
        {file && (
          <p className="mt-2 text-xs" style={{ color: TL }}>
            {file.name} &middot; {(file.size / 1024 / 1024).toFixed(2)} Mo
          </p>
        )}
        {state?.fieldErrors?.file && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.file}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="block text-sm font-semibold">Signataires</span>
          <button
            type="button"
            onClick={addSigner}
            className="text-sm font-semibold transition hover:opacity-80"
            style={{ color: A }}
          >
            + Ajouter
          </button>
        </div>

        <div className="space-y-3">
          {signers.map((s, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-4 border rounded-xl"
              style={{ borderColor: B, background: "var(--bg-alt)" }}
            >
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  name="signerName"
                  placeholder="Nom complet"
                  aria-label={`Nom du signataire ${i + 1}`}
                  value={s.name}
                  required
                  onChange={(e) => updateSigner(i, "name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
                  style={{ borderColor: B, ["--tw-ring-color" as string]: A } as React.CSSProperties}
                />
                <input
                  type="email"
                  name="signerEmail"
                  placeholder="email@domaine.fr"
                  aria-label={`Email du signataire ${i + 1}`}
                  value={s.email}
                  required
                  onChange={(e) => updateSigner(i, "email", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
                  style={{ borderColor: B, ["--tw-ring-color" as string]: A } as React.CSSProperties}
                />
              </div>
              {signers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSigner(i)}
                  aria-label={`Supprimer le signataire ${i + 1}`}
                  className="mt-1 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border transition hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                  style={{ borderColor: B, color: TL }}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        {state?.fieldErrors?.signers && (
          <p className="mt-2 text-xs text-red-600">{state.fieldErrors.signers}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: A, fontFamily: F }}
        >
          {pending ? "Creation..." : "Creer la demande"}
        </button>
      </div>

      <p className="text-xs text-center" style={{ color: TL }}>
        Les signataires recevront un email avec un lien securise pour signer. Conforme eIDAS.
      </p>
      <span className="sr-only" style={{ color: T }}>
        Formulaire de creation de demande de signature.
      </span>
    </form>
  );
}
