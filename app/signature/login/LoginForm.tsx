"use client";

import { useActionState } from "react";

import { loginAction, type LoginState } from "./actions";

const F = "var(--font-display)";
const A = "var(--accent)";
const B = "var(--border)";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div
          role="alert"
          className="p-3 rounded-lg text-sm font-medium text-red-700"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
          style={{ borderColor: B, ["--tw-ring-color" as string]: A } as React.CSSProperties}
        />
        {state?.fieldErrors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
          style={{ borderColor: B, ["--tw-ring-color" as string]: A } as React.CSSProperties}
        />
        {state?.fieldErrors?.password && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: A, fontFamily: F }}
      >
        {pending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
