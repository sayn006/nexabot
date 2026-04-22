import Link from "next/link";
import { hasSignatureToken } from "../../lib/signature/auth";
import { SIGNATURE_PLANS } from "../../lib/signature/billing";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

export const metadata = {
  title: "Signature électronique — emcorp",
  description:
    "Signez vos contrats en ligne avec une signature électronique certifiée eIDAS. Infrastructure sécurisée, archivage légal 10 ans, tarifs à partir de 3€ par signature.",
};

export default async function SignatureLandingPage() {
  const isAuth = await hasSignatureToken();

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[13px] font-medium mb-8"
            style={{ borderColor: B, color: T }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: A }} />
            Signature eIDAS · conforme France / UE
          </div>
          <h1
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-tight tracking-tight mb-6"
            style={{ fontFamily: F }}
          >
            Signature électronique<br />
            <span style={{ color: A }}>pour vos contrats pros.</span>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: T }}>
            Envoyez vos documents à signer en quelques clics. Archivage légal 10 ans, valeur juridique identique à une signature manuscrite. Sans logiciel à installer pour vos destinataires.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {isAuth ? (
              <Link
                href="/signature/dashboard"
                className="px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ background: A }}
              >
                Accéder à mon espace
              </Link>
            ) : (
              <>
                <Link
                  href="/signature/register"
                  className="px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                  style={{ background: A }}
                >
                  Créer un compte
                </Link>
                <Link
                  href="/signature/login"
                  className="px-6 py-3 rounded-lg font-semibold border transition hover:bg-[var(--bg-alt)]"
                  style={{ borderColor: B, color: T }}
                >
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Conforme eIDAS",
                desc: "Signature électronique simple reconnue, valeur juridique en France et dans toute l'UE.",
              },
              {
                title: "Archivage 10 ans",
                desc: "Vos documents signés sont conservés avec horodatage qualifié pendant la durée légale.",
              },
              {
                title: "Sans installation",
                desc: "Vos signataires reçoivent un lien email, signent depuis leur navigateur. Mobile, PC, tablette.",
              },
              {
                title: "Multi-signataires",
                desc: "Envoyez un même document à plusieurs personnes, séquentiellement ou en parallèle.",
              },
              {
                title: "Historique complet",
                desc: "Suivez en temps réel qui a ouvert, qui a signé. Téléchargez le PDF final à tout moment.",
              },
              {
                title: "API disponible",
                desc: "Intégrez la signature dans vos outils métiers via notre API REST simple.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="border rounded-2xl p-6"
                style={{ borderColor: B, background: "var(--surface)" }}
              >
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: F }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: T }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold mb-2" style={{ color: A }}>
              Tarifs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
              Un plan adapté à chaque volume
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SIGNATURE_PLANS.map((plan) => (
              <div
                key={plan.id}
                className="border rounded-2xl p-7 flex flex-col"
                style={{
                  borderColor: plan.highlight ? A : B,
                  background: "var(--surface)",
                  boxShadow: plan.highlight ? "0 6px 22px -12px var(--accent)" : undefined,
                }}
              >
                {plan.highlight && (
                  <div
                    className="self-start text-[11px] font-semibold px-2 py-0.5 rounded-md mb-3"
                    style={{ background: A, color: "white" }}
                  >
                    Recommandé
                  </div>
                )}
                <h3 className="font-bold text-lg mb-1" style={{ fontFamily: F }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: T }}>
                  {plan.description}
                </p>
                <div className="mb-5">
                  <span className="text-4xl font-bold" style={{ fontFamily: F }}>
                    {plan.priceLabel}
                  </span>
                  <span className="text-sm ml-1" style={{ color: TL }}>
                    {" "}{plan.billingLabel}
                  </span>
                </div>
                <ul className="space-y-2 text-sm flex-1" style={{ color: T }}>
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <span style={{ color: A }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={isAuth ? "/signature/billing" : "/signature/register"}
                  className="mt-6 block text-center px-4 py-2.5 rounded-lg font-semibold transition"
                  style={
                    plan.highlight
                      ? { background: A, color: "white" }
                      : { border: `1px solid ${B}`, color: T }
                  }
                >
                  {isAuth ? "Choisir ce plan" : "Créer un compte"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4" style={{ fontFamily: F }}>
            Prêt à signer vos premiers contrats en ligne ?
          </h2>
          <p className="text-base mb-8" style={{ color: T }}>
            Inscription en 2 minutes, premier document signable dans la foulée.
          </p>
          <Link
            href={isAuth ? "/signature/dashboard" : "/signature/register"}
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
            style={{ background: A }}
          >
            {isAuth ? "Accéder à mon espace" : "Créer un compte gratuitement"}
          </Link>
        </div>
      </section>
    </div>
  );
}
