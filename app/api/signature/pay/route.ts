import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { signatureRequestId } = await req.json();

    if (!signatureRequestId) {
      return NextResponse.json({ error: "ID de demande manquant" }, { status: 400 });
    }

    const sigRequest = await prisma.signatureRequest.findUnique({
      where: { id: signatureRequestId },
    });

    if (!sigRequest) {
      return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3003";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Signature electronique",
              description: `Document : ${sigRequest.documentName}`,
            },
            unit_amount: 300,
          },
          quantity: 1,
        },
      ],
      customer_email: sigRequest.email,
      success_url: `${origin}/signature/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/signature`,
      metadata: {
        signatureRequestId: sigRequest.id,
        type: "signature",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[Signature Pay]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
