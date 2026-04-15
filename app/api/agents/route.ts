import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Non authentifie" }, { status: 401 });

  const agents = await prisma.agent.findMany({
    where: { userId: session.user.id },
    include: { _count: { select: { conversations: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(agents);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return Response.json({ error: "Non authentifie" }, { status: 401 });

  const body = await request.json();
  const { name, type, webhookUrl } = body;

  if (!name || !type) {
    return Response.json(
      { error: "Le nom et le type sont requis" },
      { status: 400 }
    );
  }

  if (!["CHATBOT", "VOICE", "WORKFLOW"].includes(type)) {
    return Response.json({ error: "Type invalide" }, { status: 400 });
  }

  const agent = await prisma.agent.create({
    data: {
      name,
      type,
      webhookUrl: webhookUrl || null,
      status: "DRAFT",
      userId: session.user.id,
    },
  });

  return Response.json(agent, { status: 201 });
}
