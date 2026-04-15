import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@emcorp.io";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Service email non configuré." },
        { status: 500 }
      );
    }

    const htmlContent = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0dca7a">Nouveau message — NexaBot</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Nom</td><td style="padding:8px 0">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 0;font-weight:bold;color:#555">Entreprise</td><td style="padding:8px 0">${company}</td></tr>` : ""}
        </table>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="white-space:pre-wrap;color:#333">${message}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="font-size:12px;color:#999">Envoyé depuis nexabot.io</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NexaBot <noreply@emcorp.io>",
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[NexaBot] Message de ${name}${company ? ` — ${company}` : ""}`,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Contact] Resend error:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Contact] Error:", e);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
