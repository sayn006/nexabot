// Helpers d'authentification server-side pour le portail Signature.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiFetch, SIGNATURE_JWT_COOKIE, SignatureApiError } from "./api";
import type { SignatureUser } from "./types";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 jours

export interface SetSignatureTokenOptions {
  maxAge?: number;
}

export async function setSignatureToken(
  token: string,
  options: SetSignatureTokenOptions = {}
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SIGNATURE_JWT_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: options.maxAge ?? COOKIE_MAX_AGE_SECONDS,
  });
}

export async function clearSignatureToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SIGNATURE_JWT_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function hasSignatureToken(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(SIGNATURE_JWT_COOKIE)?.value);
}

/**
 * Recupere l'utilisateur connecte, ou null si pas de cookie / token invalide.
 */
export async function getSignatureUser(): Promise<SignatureUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SIGNATURE_JWT_COOKIE)?.value;
  if (!token) return null;

  try {
    const data = await apiFetch<SignatureUser | { user: SignatureUser }>(
      "/api/signature/me"
    );
    if (data && typeof data === "object" && "user" in data) {
      return (data as { user: SignatureUser }).user;
    }
    return data as SignatureUser;
  } catch (err) {
    if (err instanceof SignatureApiError && err.status === 401) {
      return null;
    }
    return null;
  }
}

/**
 * A utiliser dans les pages protegees. Redirige vers /signature/login si non connecte.
 */
export async function requireSignatureUser(): Promise<SignatureUser> {
  const user = await getSignatureUser();
  if (!user) {
    redirect("/signature/login");
  }
  return user;
}
