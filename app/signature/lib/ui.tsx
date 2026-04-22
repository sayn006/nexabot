import type { SubmissionStatus } from "@/lib/signature/types";

export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

interface BadgeSpec {
  label: string;
  color: string;
  bg: string;
}

const STATUS_SPECS: Record<SubmissionStatus, BadgeSpec> = {
  draft: { label: "Brouillon", color: "#64647a", bg: "rgba(100,100,122,0.12)" },
  pending: { label: "En attente", color: "#b25e00", bg: "rgba(245,158,11,0.15)" },
  in_progress: { label: "En cours", color: "#1d4ed8", bg: "rgba(59,130,246,0.12)" },
  completed: { label: "Signe", color: "#0aad66", bg: "rgba(13,202,122,0.14)" },
  cancelled: { label: "Annule", color: "#b91c1c", bg: "rgba(239,68,68,0.12)" },
  expired: { label: "Expire", color: "#b91c1c", bg: "rgba(239,68,68,0.12)" },
};

export function statusBadge(status: SubmissionStatus | string | undefined) {
  const spec =
    (status && STATUS_SPECS[status as SubmissionStatus]) ||
    ({ label: status || "Inconnu", color: "#64647a", bg: "rgba(100,100,122,0.12)" } as BadgeSpec);
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ color: spec.color, background: spec.bg }}
    >
      {spec.label}
    </span>
  );
}
