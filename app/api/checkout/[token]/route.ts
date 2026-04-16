import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const subToken = await prisma.subscriptionToken.findUnique({
    where: { token },
    include: { plan: true },
  });

  if (!subToken) {
    return NextResponse.json({ error: "Lien invalide" }, { status: 404 });
  }

  if (subToken.used) {
    return NextResponse.json({ error: "Ce lien a deja ete utilise" }, { status: 400 });
  }

  if (new Date() > subToken.expiresAt) {
    return NextResponse.json({ error: "Ce lien a expire" }, { status: 400 });
  }

  const plan = subToken.plan;
  const freq = subToken.frequence;
  const stripePriceId = freq === "annuel" ? plan.stripePriceIdAnnuel : plan.stripePriceIdMensuel;

  if (!stripePriceId) {
    return NextResponse.json({ error: "Plan non configure" }, { status: 400 });
  }

  try {
    const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3003";

    // Create Stripe customer from token email if available
    const customerData: Record<string, string> = {};
    if (subToken.email) customerData.email = subToken.email;

    const customer = await stripe.customers.create({
      ...customerData,
      metadata: { tokenId: subToken.id, planId: plan.id },
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url: `${origin}/checkout/${token}?status=success`,
      cancel_url: `${origin}/checkout/${token}?status=cancel`,
      metadata: {
        tokenId: subToken.id,
        planId: plan.id,
        frequence: freq,
      },
    });

    // Mark token as used
    await prisma.subscriptionToken.update({
      where: { id: subToken.id },
      data: { used: true },
    });

    return NextResponse.redirect(checkoutSession.url!);
  } catch (error) {
    console.error("[Checkout Token]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
