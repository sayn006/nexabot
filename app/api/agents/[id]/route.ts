import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Non authentifie" }, { status: 401 });

  const { id } = await params;

  const agent = await prisma.agent.findUnique({ where: { id } });

  if (!agent || agent.userId !== session.user.id) {
    return Response.json({ error: "Agent introuvable" }, { status: 404 });
  }

  return Response.json(agent);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Non authentifie" }, { status: 401 });

  const { id } = await params;

  const agent = await prisma.agent.findUnique({ where: { id } });

  if (!agent || agent.userId !== session.user.id) {
    return Response.json({ error: "Agent introuvable" }, { status: 404 });
  }

  const body = await request.json();
  const { name, type, status, webhookUrl, config } = body;

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (type !== undefined) {
    if (!["CHATBOT", "VOICE", "WORKFLOW"].includes(type)) {
      return Response.json({ error: "Type invalide" }, { status: 400 });
    }
    data.type = type;
  }
  if (status !== undefined) {
    if (!["DRAFT", "ACTIVE", "INACTIVE"].includes(status)) {
      return Response.json({ error: "Statut invalide" }, { status: 400 });
    }
    data.status = status;
  }
  if (webhookUrl !== undefined) data.webhookUrl = webhookUrl || null;
  if (config !== undefined) data.config = config;

  const updated = await prisma.agent.update({
    where: { id },
    data,
  });

  return Response.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Non authentifie" }, { status: 401 });

  const { id } = await params;

  const agent = await prisma.agent.findUnique({ where: { id } });

  if (!agent || agent.userId !== session.user.id) {
    return Response.json({ error: "Agent introuvable" }, { status: 404 });
  }

  await prisma.agent.delete({ where: { id } });

  return Response.json({ success: true });
}
