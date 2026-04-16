import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const sigRequest = await prisma.signatureRequest.findUnique({
      where: { id },
    });

    if (!sigRequest) {
      return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
    }

    return NextResponse.json({
      id: sigRequest.id,
      status: sigRequest.status,
      documentName: sigRequest.documentName,
      signers: sigRequest.signers,
      email: sigRequest.email,
      createdAt: sigRequest.createdAt,
    });
  } catch (error) {
    console.error("[Signature Status]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
