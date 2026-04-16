import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const plans = await prisma.plan.findMany({
    orderBy: { ordre: "asc" },
    include: { _count: { select: { subscriptions: true } } },
  });

  return Response.json(plans);
}

export async function POST(request: Request) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json();
  const {
    name,
    slug,
    description,
    priceMensuel,
    priceAnnuel,
    features,
    active,
    surDemande,
    badgeText,
    ordre,
  } = body;

  if (!name || !slug || priceMensuel === undefined) {
    return Response.json(
      { error: "Nom, slug et prix mensuel requis" },
      { status: 400 }
    );
  }

  const existing = await prisma.plan.findUnique({ where: { slug } });
  if (existing) {
    return Response.json({ error: "Ce slug existe deja" }, { status: 409 });
  }

  const plan = await prisma.plan.create({
    data: {
      name,
      slug,
      description: description || null,
      priceMensuel: parseFloat(priceMensuel),
      priceAnnuel: priceAnnuel ? parseFloat(priceAnnuel) : null,
      features: features || [],
      active: active ?? true,
      surDemande: surDemande ?? false,
      badgeText: badgeText || null,
      ordre: ordre ?? 0,
    },
  });

  return Response.json(plan, { status: 201 });
}
