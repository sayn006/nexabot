import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  const check = await requireAdmin();
  if ("error" in check) {
    return Response.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json();
  const { planId, email, nomComplet, frequence } = body;

  if (!planId || !email) {
    return Response.json(
      { error: "planId et email requis" },
      { status: 400 }
    );
  }

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) {
    return Response.json({ error: "Plan introuvable" }, { status: 404 });
  }

  const freq = frequence || "mensuel";
  const stripePriceId = freq === "annuel" ? plan.stripePriceIdAnnuel : plan.stripePriceIdMensuel;
  if (!stripePriceId) {
    return Response.json(
      { error: "Plan non synchronise avec Stripe" },
      { status: 400 }
    );
  }

  // Create token (expires in 7 days)
  const token = await prisma.subscriptionToken.create({
    data: {
      planId: plan.id,
      email,
      frequence: freq,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3003";
  const paymentLink = `${origin}/checkout/${token.token}`;

  // Send email via Resend
  if (!RESEND_API_KEY) {
    return Response.json(
      { error: "Service email non configure", token: token.token, paymentLink },
      { status: 500 }
    );
  }

  const price = freq === "annuel" && plan.priceAnnuel
    ? `${plan.priceAnnuel}€/an`
    : `${plan.priceMensuel}€/mois`;

  const htmlContent = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fafafa;padding:32px;border-radius:12px">
      <h2 style="color:#0dca7a;margin-bottom:24px">Votre abonnement ${plan.name}</h2>
      ${nomComplet ? `<p style="color:#333">Bonjour ${nomComplet},</p>` : '<p style="color:#333">Bonjour,</p>'}
      <p style="color:#555">Vous avez ete invite a souscrire au plan <strong>${plan.name}</strong> pour <strong>${price}</strong>.</p>
      ${plan.description ? `<p style="color:#666;font-size:14px">${plan.description}</p>` : ""}
      <div style="margin:32px 0;text-align:center">
        <a href="${paymentLink}" style="display:inline-block;background:#0dca7a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px">
          Proceder au paiement
        </a>
      </div>
      <p style="color:#999;font-size:12px">Ce lien est valable 7 jours. Si vous n'avez pas demande cet abonnement, ignorez cet email.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="font-size:12px;color:#999">Envoye depuis emcorp.io</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sayn de emcorp.io <contact@emcorp.io>",
        to: [email],
        subject: `Votre lien de paiement — emcorp.io`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Send Link] Resend error:", err);
      return Response.json(
        { error: "Erreur lors de l'envoi de l'email", token: token.token, paymentLink },
        { status: 500 }
      );
    }

    return Response.json({ success: true, token: token.token, paymentLink });
  } catch (error) {
    console.error("[Send Link] Error:", error);
    return Response.json(
      { error: "Erreur serveur", token: token.token, paymentLink },
      { status: 500 }
    );
  }
}
