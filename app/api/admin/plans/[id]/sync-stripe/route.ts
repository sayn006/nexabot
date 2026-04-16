import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const { id } = await params;
  const plan = await prisma.plan.findUnique({ where: { id } });

  if (!plan) {
    return Response.json({ error: "Plan introuvable" }, { status: 404 });
  }

  try {
    // Create or update Stripe product
    let productId = plan.stripeProductId;
    if (productId) {
      await stripe.products.update(productId, {
        name: plan.name,
        description: plan.description || undefined,
      });
    } else {
      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description || undefined,
        metadata: { planId: plan.id },
      });
      productId = product.id;
    }

    // Create monthly price
    let stripePriceIdMensuel = plan.stripePriceIdMensuel;
    if (!stripePriceIdMensuel) {
      const monthlyPrice = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(plan.priceMensuel * 100),
        currency: "eur",
        recurring: { interval: "month" },
        metadata: { planId: plan.id, frequence: "mensuel" },
      });
      stripePriceIdMensuel = monthlyPrice.id;
    }

    // Create annual price if applicable
    let stripePriceIdAnnuel = plan.stripePriceIdAnnuel;
    if (plan.priceAnnuel && !stripePriceIdAnnuel) {
      const annualPrice = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(plan.priceAnnuel * 100),
        currency: "eur",
        recurring: { interval: "year" },
        metadata: { planId: plan.id, frequence: "annuel" },
      });
      stripePriceIdAnnuel = annualPrice.id;
    }

    // Update plan with Stripe IDs
    const updated = await prisma.plan.update({
      where: { id },
      data: {
        stripeProductId: productId,
        stripePriceIdMensuel,
        stripePriceIdAnnuel,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("[Sync Stripe]", error);
    return Response.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
