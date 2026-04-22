import Link from "next/link";
import { redirect } from "next/navigation";

import { hasSignatureToken } from "@/lib/signature/auth";

import SignatureFooter from "../components/SignatureFooter";
import SignatureNav from "../components/SignatureNav";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Creer un compte — emcorp Signature",
  description: "Creez votre compte pour gerer vos demandes de signature electronique.",
};

export default async function RegisterPage() {
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
              Creer un compte
            </h1>
            <p className="mt-3 text-sm" style={{ color: T }}>
              Gardez trace de vos demandes et accedez a l&apos;historique de vos documents signes.
            </p>
          </div>

          <div
            className="border rounded-2xl p-8"
            style={{ borderColor: B, background: "var(--surface)" }}
          >
            <RegisterForm />
          </div>

          <p className="text-center text-sm mt-6" style={{ color: TL }}>
            Deja un compte ?{" "}
            <Link href="/signature/login" className="font-semibold" style={{ color: A }}>
              Se connecter
            </Link>
          </p>
        </div>
      </main>

      <SignatureFooter />
    </>
  );
}
