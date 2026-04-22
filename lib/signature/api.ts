// Wrapper fetch pour l'API Symfony emcorp (module Signature).
// Gere le cookie JWT httpOnly 'signature_jwt' cote serveur.

import { cookies } from "next/headers";

export const SIGNATURE_JWT_COOKIE = "signature_jwt";

function getApiBase(): string {
  const base =
    process.env.EMCORP_API_URL ||
    process.env.NEXT_PUBLIC_EMCORP_API ||
    (process.env.NODE_ENV === "production"
      ? "https://app.emcorp.io"
      : "http://127.0.0.1:8002");
  return base.replace(/\/+$/, "");
}

export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  // Si true, n'ajoute pas le header Authorization meme si le cookie existe
  skipAuth?: boolean;
  // Si true, ne leve pas d'erreur sur statut non-OK et retourne la reponse brute
  raw?: boolean;
}

export class SignatureApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "SignatureApiError";
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Appel a l'API Symfony emcorp avec gestion du JWT via cookie httpOnly.
 * A utiliser uniquement cote serveur (server components, server actions, route handlers).
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { body, skipAuth, raw, headers, ...rest } = options;

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }
  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (!skipAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get(SIGNATURE_JWT_COOKIE)?.value;
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = `${getApiBase()}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...rest,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  if (raw) {
    return res as unknown as T;
  }

  const text = await res.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    let message = `API error ${res.status}`;
    if (payload && typeof payload === "object") {
      const p = payload as Record<string, unknown>;
      if (typeof p.error === "string") message = p.error;
      else if (typeof p.message === "string") message = p.message;
      else if (typeof p.detail === "string") message = p.detail;
    }
    throw new SignatureApiError(message, res.status, payload);
  }

  return payload as T;
}

/**
 * Appel a l'API sans JWT (pour register/login).
 */
export async function publicApiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  return apiFetch<T>(path, { ...options, skipAuth: true });
}
