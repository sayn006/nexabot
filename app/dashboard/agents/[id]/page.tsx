import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import EditAgentForm from "./EditAgentForm";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const agent = await prisma.agent.findUnique({ where: { id } });

  if (!agent || agent.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Modifier l&apos;agent
      </h1>

      <EditAgentForm
        agent={{
          id: agent.id,
          name: agent.name,
          type: agent.type,
          status: agent.status,
          webhookUrl: agent.webhookUrl,
        }}
      />
    </div>
  );
}
