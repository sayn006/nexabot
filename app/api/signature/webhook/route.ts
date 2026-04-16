import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

async function getDocuSealApiKey(): Promise<string | null> {
  // Check DB first, then fallback to env var
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "DOCUSEAL_API_KEY" } });
    if (setting?.value) return setting.value;
  } catch {
    // Setting table may not exist yet, ignore
  }
  return process.env.DOCUSEAL_API_KEY || null;
}

async function sendToDocuSeal(signatureRequest: {
  id: string;
  documentUrl: string | null;
  signers: unknown;
  documentName: string;
}) {
  const apiKey = await getDocuSealApiKey();
  if (!apiKey) {
    console.log("[DocuSeal] No API key configured — skipping DocuSeal integration");
    return null;
  }

  try {
    const baseUrl = process.env.DOCUSEAL_API_URL || "https://api.docuseal.com";
    const signers = signatureRequest.signers as Array<{ name: string; email: string }>;

    const response = await fetch(`${baseUrl}/submissions`, {
      method: "POST",
      headers: {
        "X-Auth-Token": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: process.env.DOCUSEAL_TEMPLATE_ID,
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
