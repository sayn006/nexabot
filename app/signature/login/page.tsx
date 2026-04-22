import Link from "next/link";
import { redirect } from "next/navigation";

import { hasSignatureToken } from "@/lib/signature/auth";

import SignatureFooter from "../components/SignatureFooter";
import SignatureNav from "../components/SignatureNav";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Connexion — emcorp Signature",
  description: "Connectez-vous a votre portail de signature electronique emcorp.",
};

export default async function LoginPage() {
  if (await hasSignatureToken()) {
    redirect("/signature/dashboard");
  }

  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  return (
    <>
      <SignatureNav />

      <main className="min-h-screen px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold mb-2" style={{ color: A }}>
              Portail Signature
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: F }}
            >
              Se connecter
            </h1>
            <p className="mt-3 text-sm" style={{ color: T }}>
              Retrouvez vos demandes et documents signes.
            </p>
          </div>

          <div
            className="border rounded-2xl p-8"
            style={{ borderColor: B, background: "var(--surface)" }}
          >
            <LoginForm />
          </div>

          <p className="text-center text-sm mt-6" style={{ color: TL }}>
            Pas encore de compte ?{" "}
            <Link href="/signature/register" className="font-semibold" style={{ color: A }}>
              Creer un compte
            </Link>
          </p>
        </div>
      </main>

      <SignatureFooter />
    </>
  );
}
