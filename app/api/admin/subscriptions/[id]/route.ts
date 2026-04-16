import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
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
  const subscription = await prisma.subscription.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, email: true, name: true } },
      customPlan: true,
    },
  });

  if (!subscription) {
    return Response.json({ error: "Abonnement introuvable" }, { status: 404 });
  }

  return Response.json(subscription);
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
  const subscription = await prisma.subscription.findUnique({ where: { id } });

  if (!subscription) {
    return Response.json({ error: "Abonnement introuvable" }, { status: 404 });
  }

  // Cancel on Stripe
  try {
    await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
  } catch (error) {
    console.error("[Cancel Stripe Sub]", error);
    // Continue to update DB even if Stripe fails
  }

  // Update DB
  await prisma.subscription.update({
    where: { id },
    data: { status: "CANCELED" },
  });

  return Response.json({ success: true });
}
