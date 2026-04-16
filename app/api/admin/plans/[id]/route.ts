import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const { id } = await params;
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: { _count: { select: { subscriptions: true } } },
  });

  if (!plan) {
    return Response.json({ error: "Plan introuvable" }, { status: 404 });
  }

  return Response.json(plan);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const { id } = await params;
  const body = await request.json();

  const plan = await prisma.plan.findUnique({ where: { id } });
  if (!plan) {
    return Response.json({ error: "Plan introuvable" }, { status: 404 });
  }

  // Check slug uniqueness if changed
  if (body.slug && body.slug !== plan.slug) {
    const existing = await prisma.plan.findUnique({ where: { slug: body.slug } });
    if (existing) {
      return Response.json({ error: "Ce slug existe deja" }, { status: 409 });
    }
  }

  const updated = await prisma.plan.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.description !== undefined && { description: body.description || null }),
      ...(body.priceMensuel !== undefined && { priceMensuel: parseFloat(body.priceMensuel) }),
      ...(body.priceAnnuel !== undefined && { priceAnnuel: body.priceAnnuel ? parseFloat(body.priceAnnuel) : null }),
      ...(body.features !== undefined && { features: body.features }),
      ...(body.active !== undefined && { active: body.active }),
      ...(body.surDemande !== undefined && { surDemande: body.surDemande }),
      ...(body.badgeText !== undefined && { badgeText: body.badgeText || null }),
      ...(body.ordre !== undefined && { ordre: body.ordre }),
    },
  });

  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const { id } = await params;
  const plan = await prisma.plan.findUnique({
    where: { id },
    include: { _count: { select: { subscriptions: true } } },
  });

  if (!plan) {
    return Response.json({ error: "Plan introuvable" }, { status: 404 });
  }

  if (plan._count.subscriptions > 0) {
    return Response.json(
      { error: "Impossible de supprimer un plan avec des abonnements actifs" },
      { status: 400 }
    );
  }

  await prisma.plan.delete({ where: { id } });
  return Response.json({ success: true });
}
