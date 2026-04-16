import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, documentName, documentUrl, signers, templateId } = body;

    if (!email || !documentName || !signers || !Array.isArray(signers) || signers.length === 0) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    for (const signer of signers) {
      if (!signer.name || !signer.email) {
        return NextResponse.json({ error: "Chaque signataire doit avoir un nom et un email" }, { status: 400 });
      }
    }

    const signatureRequest = await prisma.signatureRequest.create({
      data: {
        email,
        documentName,
        documentUrl: documentUrl || null,
        signers,
        templateId: templateId || null,
        status: "DRAFT",
        price: 3.0,
      },
    });

    return NextResponse.json({ id: signatureRequest.id });
  } catch (error) {
    console.error("[Signature Create]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
