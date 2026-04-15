import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const obj = event.data.object;

  switch (event.type) {
    case "checkout.session.completed": {
      const userId = obj.metadata?.userId;
      const plan = obj.metadata?.plan;
      const subscriptionId = obj.subscription;

      if (userId && subscriptionId && plan) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const subData = sub as unknown as Record<string, unknown>;
        await prisma.subscription.create({
          data: {
            userId,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: (sub as any).items.data[0].price.id,
            plan: plan as "STARTER" | "BUSINESS" | "ENTERPRISE",
            status: "ACTIVE",
            currentPeriodStart: new Date(((subData.current_period_start as number) || Date.now() / 1000) * 1000),
            currentPeriodEnd: new Date(((subData.current_period_end as number) || Date.now() / 1000) * 1000),
          },
        });
      }
      break;
    }

    case "invoice.paid": {
      const subscriptionId = obj.subscription;
      if (subscriptionId) {
        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const subData = sub as unknown as Record<string, unknown>;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            status: "ACTIVE",
            currentPeriodStart: new Date(((subData.current_period_start as number) || Date.now() / 1000) * 1000),
            currentPeriodEnd: new Date(((subData.current_period_end as number) || Date.now() / 1000) * 1000),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: obj.id },
        data: { status: "CANCELED" },
      });
      break;
    }

    case "invoice.payment_failed": {
      const subscriptionId = obj.subscription;
      if (subscriptionId) {
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: { status: "PAST_DUE" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
