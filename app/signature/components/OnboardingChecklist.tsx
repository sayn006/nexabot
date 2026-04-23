import Link from "next/link";

/**
 * Walkthrough 3 etapes pour les nouveaux utilisateurs du portail Signature.
 * - Etape 1 : choisir un plan ou confirmer pay-per-use
 * - Etape 2 : uploader le premier PDF
 * - Etape 3 : ajouter signataires + envoyer
 *
 * La checklist disparait quand `dismissed` est true (les 3 etapes sont OK).
 */
export interface OnboardingChecklistProps {
  hasActivePlan: boolean;
  hasSubmission: boolean;
  hasCompletedSubmission: boolean;
}

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

export default function OnboardingChecklist({
  hasActivePlan,
  hasSubmission,
  hasCompletedSubmission,
}: OnboardingChecklistProps) {
  // Etape 3 est consideree "faite" des que la 1ere submission a ete creee
  // (l'envoi des emails est immediat cote DocuSeal), ou quand une est signee.
  const step1Done = hasActivePlan;
  const step2Done = hasSubmission;
  const step3Done = hasCompletedSubmission || hasSubmission;

  const allDone = step1Done && step2Done && step3Done;
  if (allDone) {
    return <OnboardingFinishedBadge />;
  }

  const doneCount = [step1Done, step2Done, step3Done].filter(Boolean).length;
  const progressPct = Math.round((doneCount / 3) * 100);

  return (
    <section
      aria-labelledby="onboarding-title"
      className="border rounded-2xl p-6 sm:p-7 mb-6 relative overflow-hidden"
      style={{
        borderColor: B,
        background:
          "linear-gradient(135deg, rgba(13,202,122,0.06) 0%, rgba(13,202,122,0.02) 60%, var(--surface) 100%)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wider mb-1"
            style={{ color: A }}
          >
            Demarrer avec emcorp Signature
          </p>
          <h2
            id="onboarding-title"
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: F }}
          >
            Envoyez votre premier document en 3 etapes
          </h2>
        </div>
        <div
          className="text-xs font-semibold px-3 py-1.5 rounded-full shrink-0"
          style={{
            color: A,
            background: "rgba(13,202,122,0.12)",
          }}
        >
          {doneCount}/3 complete
        </div>
      </div>

      {/* Barre de progression */}
      <div
        className="h-1.5 rounded-full overflow-hidden mb-6"
        style={{ background: "rgba(0,0,0,0.05)" }}
        aria-hidden="true"
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${progressPct}%`,
            background: A,
          }}
        />
      </div>

      <ol className="space-y-3">
        <OnboardingStep
          index={1}
          done={step1Done}
          current={!step1Done}
          title="Choisis ton plan ou paie a l'unite"
          description={
            step1Done
              ? "Ton plan est actif."
              : "Pack 50, illimite, ou 3 € par signature (sans engagement)."
          }
          cta={
            step1Done
              ? null
              : { label: "Voir les plans", href: "/signature/billing" }
          }
        />

        <OnboardingStep
          index={2}
          done={step2Done}
          current={step1Done && !step2Done}
          title="Upload ton premier PDF"
          description={
            step2Done
              ? "Ton document est envoye au signataire."
              : "PDF signe electroniquement, conforme eIDAS."
          }
          cta={
            step2Done
              ? null
              : {
                  label: "Creer une demande",
                  href: "/signature/submissions/new",
                }
          }
        />

        <OnboardingStep
          index={3}
          done={step3Done}
          current={step2Done && !step3Done}
          title="Ajoute les signataires et envoie"
          description="Ils recoivent un email avec un lien securise. Tu es notifie des que c'est signe."
          cta={null}
        />
      </ol>
    </section>
  );
}

interface OnboardingStepProps {
  index: number;
  done: boolean;
  current: boolean;
  title: string;
  description: string;
  cta: { label: string; href: string } | null;
}

function OnboardingStep({
  index,
  done,
  current,
  title,
  description,
  cta,
}: OnboardingStepProps) {
  return (
    <li
      className="flex gap-4 items-start p-4 rounded-xl border transition"
      style={{
        borderColor: current ? A : B,
        background: done ? "rgba(13,202,122,0.04)" : "var(--surface)",
        opacity: done && !current ? 0.85 : 1,
      }}
    >
      <StepIndicator index={index} done={done} current={current} />

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className="font-semibold text-sm"
            style={{
              textDecoration: done ? "line-through" : "none",
              color: done ? TL : undefined,
            }}
          >
            {title}
          </p>
          {current && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: A,
                background: "rgba(13,202,122,0.14)",
              }}
            >
              Prochaine etape
            </span>
          )}
        </div>
        <p className="text-xs mt-1" style={{ color: T }}>
          {description}
        </p>
      </div>

      {cta && (
        <Link
          href={cta.href}
          className="shrink-0 self-center px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition hover:opacity-90"
          style={{ background: A }}
        >
          {cta.label}
        </Link>
      )}
    </li>
  );
}

function StepIndicator({
  index,
  done,
  current,
}: {
  index: number;
  done: boolean;
  current: boolean;
}) {
  if (done) {
    return (
      <div
        aria-hidden="true"
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ background: A, color: "white" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.415L8.5 12.086l6.79-6.793a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2"
      style={{
        borderColor: current ? A : B,
        color: current ? A : TL,
        background: "var(--surface)",
      }}
    >
      {index}
    </div>
  );
}

function OnboardingFinishedBadge() {
  return (
    <div
      className="border rounded-xl px-4 py-3 mb-6 flex items-center gap-3 text-sm"
      style={{
        borderColor: "rgba(13,202,122,0.35)",
        background: "rgba(13,202,122,0.08)",
        color: "#0aad66",
      }}
    >
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: A, color: "white" }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.415L8.5 12.086l6.79-6.793a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <div>
        <p className="font-bold">Felicitations, setup complet</p>
        <p className="text-xs" style={{ color: "#0aad66", opacity: 0.85 }}>
          Ton portail Signature est operationnel.
        </p>
      </div>
    </div>
  );
}
