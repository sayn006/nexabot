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
 *
 * Le backend Symfony (`/api/signature/me`) renvoie actuellement :
 *   { success: true, client: { id, email, raison_sociale, siret, actif, subscription } }
 *
 * On normalise ce payload vers notre type `SignatureUser` (id, email, name),
 * en supportant aussi les anciennes formes `{ user: {...} }` et payload racine.
 */
export async function getSignatureUser(): Promise<SignatureUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SIGNATURE_JWT_COOKIE)?.value;
  if (!token) return null;

  try {
    const data = await apiFetch<unknown>("/api/signature/me");
    return normalizeSignatureUser(data);
  } catch (err) {
    if (err instanceof SignatureApiError && err.status === 401) {
      return null;
    }
    return null;
  }
}

/**
 * Normalise la reponse `/api/signature/me` (ou /login /register) vers SignatureUser.
 * Tolerant aux trois formes : { client }, { user }, ou directement le user a la racine.
 */
export function normalizeSignatureUser(data: unknown): SignatureUser | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  // Forme Symfony : { success, client: {...} }
  if (d.client && typeof d.client === "object") {
    return buildUserFromRaw(d.client as Record<string, unknown>);
  }

  // Forme historique : { user: {...} }
  if (d.user && typeof d.user === "object") {
    return buildUserFromRaw(d.user as Record<string, unknown>);
  }

  // Forme directe
  if (typeof d.id === "number" && typeof d.email === "string") {
    return buildUserFromRaw(d);
  }

  return null;
}

function buildUserFromRaw(raw: Record<string, unknown>): SignatureUser | null {
  const id = typeof raw.id === "number" ? raw.id : Number(raw.id);
  const email = typeof raw.email === "string" ? raw.email : null;
  if (!id || Number.isNaN(id) || !email) return null;

  // Le backend utilise `raison_sociale`, le type local expose `name`.
  const name =
    (typeof raw.name === "string" && raw.name) ||
    (typeof raw.raison_sociale === "string" && raw.raison_sociale) ||
    null;

  const createdAt =
    typeof raw.createdAt === "string"
      ? raw.createdAt
      : typeof raw.created_at === "string"
        ? raw.created_at
        : undefined;

  return { id, email, name, createdAt };
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
