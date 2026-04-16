import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const subscriptions = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, email: true, name: true } },
      customPlan: { select: { id: true, name: true, slug: true } },
    },
  });

  return Response.json(subscriptions);
}

export async function POST(request: Request) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json();
  const { userId, planId, frequence } = body;

  if (!userId || !planId) {
    return Response.json(
      { error: "userId et planId requis" },
      { status: 400 }
    );
  }

  const [user, plan] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.plan.findUnique({ where: { id: planId } }),
  ]);

  if (!user) return Response.json({ error: "Utilisateur introuvable" }, { status: 404 });
  if (!plan) return Response.json({ error: "Plan introuvable" }, { status: 404 });

  const freq = frequence || "mensuel";
  const stripePriceId = freq === "annuel" ? plan.stripePriceIdAnnuel : plan.stripePriceIdMensuel;

  if (!stripePriceId) {
    return Response.json(
      { error: "Plan non synchronise avec Stripe. Synchronisez d'abord." },
      { status: 400 }
    );
  }

  return Response.json({
    message: "Utilisez /api/admin/subscriptions/send-link pour envoyer un lien de paiement au client.",
    planId: plan.id,
    userId: user.id,
    stripePriceId,
  });
}
