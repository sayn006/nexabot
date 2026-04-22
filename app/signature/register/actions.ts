"use server";

import { redirect } from "next/navigation";

import { publicApiFetch, SignatureApiError } from "@/lib/signature/api";
import { setSignatureToken } from "@/lib/signature/auth";
import type { SignatureAuthResponse } from "@/lib/signature/types";

export interface RegisterState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function registerAction(
  _prev: RegisterState | undefined,
  formData: FormData
): Promise<RegisterState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const name = String(formData.get("name") || "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!email || !email.includes("@")) fieldErrors.email = "Email invalide";
  if (password.length < 8) fieldErrors.password = "8 caracteres minimum";
  if (!name) fieldErrors.name = "Nom requis";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  try {
    const data = await publicApiFetch<SignatureAuthResponse>(
      "/api/signature/register",
      { method: "POST", body: { email, password, raison_sociale: name } }
    );

    if (!data?.token) {
      return { error: "Reponse API invalide (token manquant)." };
    }

    await setSignatureToken(data.token);
  } catch (err) {
    if (err instanceof SignatureApiError) {
      return { error: err.message };
    }
    return { error: "Impossible de creer le compte. Reessayez plus tard." };
  }

  redirect("/signature/dashboard");
}
