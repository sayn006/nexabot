"use server";

import { redirect } from "next/navigation";

import { publicApiFetch, SignatureApiError } from "@/lib/signature/api";
import { setSignatureToken } from "@/lib/signature/auth";
import type { SignatureAuthResponse } from "@/lib/signature/types";

export interface LoginState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function loginAction(
  _prev: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const fieldErrors: Record<string, string> = {};
  if (!email || !email.includes("@")) fieldErrors.email = "Email invalide";
  if (!password) fieldErrors.password = "Mot de passe requis";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  try {
    const data = await publicApiFetch<SignatureAuthResponse>(
      "/api/signature/login",
      { method: "POST", body: { email, password } }
    );

    if (!data?.token) {
      return { error: "Reponse API invalide (token manquant)." };
    }

    await setSignatureToken(data.token);
  } catch (err) {
    if (err instanceof SignatureApiError) {
      if (err.status === 401) {
        return { error: "Email ou mot de passe incorrect." };
      }
      return { error: err.message };
    }
    return { error: "Impossible de se connecter. Reessayez plus tard." };
  }

  redirect("/signature/dashboard");
}
