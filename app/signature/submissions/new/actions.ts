"use server";

import { redirect } from "next/navigation";

import { apiFetch, SignatureApiError, SIGNATURE_JWT_COOKIE } from "@/lib/signature/api";
import type { SignatureSigner, SignatureSubmission } from "@/lib/signature/types";
import { cookies } from "next/headers";

export interface NewSubmissionState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

function apiBase(): string {
  const base =
    process.env.EMCORP_API_URL ||
    process.env.NEXT_PUBLIC_EMCORP_API ||
    "http://127.0.0.1:8002";
  return base.replace(/\/+$/, "");
}

/**
 * Cree une submission. Essaie d'abord en multipart (fichier inclus),
 * tombe en JSON (base64) si l'API retourne 415.
 */
export async function createSubmissionAction(
  _prev: NewSubmissionState | undefined,
  formData: FormData
): Promise<NewSubmissionState> {
  const documentName = String(formData.get("documentName") || "").trim();
  const file = formData.get("file");
  const signersRaw = formData.getAll("signerName").map((v, i) => ({
    name: String(v).trim(),
    email: String(formData.getAll("signerEmail")[i] || "").trim(),
  }));

  const fieldErrors: Record<string, string> = {};
  if (!documentName) fieldErrors.documentName = "Nom du document requis";
  if (!(file instanceof File) || file.size === 0) {
    fieldErrors.file = "Fichier PDF requis";
  } else if (!file.name.toLowerCase().endsWith(".pdf")) {
    fieldErrors.file = "Seuls les fichiers PDF sont acceptes";
  }
  const signers: SignatureSigner[] = signersRaw.filter((s) => s.name && s.email);
  if (signers.length === 0) fieldErrors.signers = "Au moins un signataire requis";
  for (const s of signers) {
    if (!s.email.includes("@")) fieldErrors.signers = "Email de signataire invalide";
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  let created: SignatureSubmission | null = null;

  // Attempt 1: multipart
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SIGNATURE_JWT_COOKIE)?.value;

    const multipart = new FormData();
    multipart.append("documentName", documentName);
    multipart.append("file", file as File);
    multipart.append("signers", JSON.stringify(signers));

    const res = await fetch(`${apiBase()}/api/signature/submissions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: multipart,
      cache: "no-store",
    });

    if (res.ok) {
      created = (await res.json()) as SignatureSubmission;
    } else if (res.status !== 415 && res.status !== 400) {
      const text = await res.text();
      let message = `Erreur API ${res.status}`;
      try {
        const p = JSON.parse(text);
        if (typeof p?.error === "string") message = p.error;
        else if (typeof p?.message === "string") message = p.message;
      } catch {
        // ignore
      }
      return { error: message };
    }
  } catch {
    // fall through to JSON attempt
  }

  // Attempt 2: JSON with base64 file
  if (!created && file instanceof File) {
    try {
      const buf = Buffer.from(await file.arrayBuffer());
      const base64 = buf.toString("base64");
      created = await apiFetch<SignatureSubmission>("/api/signature/submissions", {
        method: "POST",
        body: {
          documentName,
          fileName: file.name,
          fileContentBase64: base64,
          signers,
        },
      });
    } catch (err) {
      if (err instanceof SignatureApiError) {
        return { error: err.message };
      }
      return { error: "Impossible de creer la demande." };
    }
  }

  if (!created || !created.id) {
    return { error: "Reponse API invalide (id manquant)." };
  }

  redirect(`/signature/submissions/${created.id}`);
}
