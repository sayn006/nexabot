import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

async function getDocuSealConfig(): Promise<{ apiKey: string | null; url: string }> {
  let apiKey: string | null = null;
  let url = "https://sign.cashloose.com";

  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["DOCUSEAL_API_KEY", "DOCUSEAL_URL"] } },
    });
    for (const s of settings) {
      if (s.key === "DOCUSEAL_API_KEY" && s.value) apiKey = s.value;
      if (s.key === "DOCUSEAL_URL" && s.value) url = s.value;
    }
  } catch {
    // Setting table may not exist yet
  }

  if (!apiKey) apiKey = process.env.DOCUSEAL_API_KEY || null;
  if (!url || url === "https://sign.cashloose.com") {
    url = process.env.DOCUSEAL_URL || "https://sign.cashloose.com";
  }

  return { apiKey, url };
}

async function sendToDocuSeal(signatureRequest: {
  id: string;
  documentUrl: string | null;
  signers: unknown;
  documentName: string;
  templateId: string | null;
}) {
  const { apiKey, url: docusealUrl } = await getDocuSealConfig();
  if (!apiKey) {
    console.log("[DocuSeal] No API key configured — skipping DocuSeal integration");
    return null;
  }

  if (!signatureRequest.templateId) {
    console.log("[DocuSeal] No templateId on signature request — skipping");
    return null;
  }

  try {
    const signers = signatureRequest.signers as Array<{ name: string; email: string }>;

    const response = await fetch(`${docusealUrl}/api/submissions`, {
      method: "POST",
      headers: {
        "X-Auth-Token": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: parseInt(signatureRequest.templateId),
        send_email: true,
        submitters: signers.map((s, i) => ({
          name: s.name,
          email: s.email,
          role: `Signer ${i + 1}`,
        })),
      }),
    });

    if (!response.ok) {
      console.error("[DocuSeal] API error:", await response.text());
      return null;
    }

    const data = await response.json();
    return data.id || data[0]?.id || null;
  } catch (error) {
    console.error("[DocuSeal] Error:", error);
    return null;
  }
}

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
      process.env.STRIPE_SIGNATURE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[Signature Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const signatureRequestId = session.metadata?.signatureRequestId;
    const type = session.metadata?.type;

    if (type === "signature" && signatureRequestId) {
      try {
        const sigRequest = await prisma.signatureRequest.update({
          where: { id: signatureRequestId },
          data: {
            status: "PAID",
            stripePaymentId: session.payment_intent || session.id,
          },
        });

        const docusealId = await sendToDocuSeal(sigRequest);

        if (docusealId) {
          await prisma.signatureRequest.update({
            where: { id: signatureRequestId },
            data: {
              status: "SENT",
              docusealSubmissionId: String(docusealId),
            },
          });
          console.log(`[Signature] Document sent via DocuSeal — submission ${docusealId}`);
        } else {
          console.log(`[Signature] Payment received for ${signatureRequestId} — DocuSeal integration pending`);
        }
      } catch (error) {
        console.error("[Signature Webhook] Error processing:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
