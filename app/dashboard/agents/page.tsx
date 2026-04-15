import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AgentsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const agents = await prisma.agent.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { conversations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const statusLabel: Record<string, string> = {
    ACTIVE: "Actif",
    INACTIVE: "Inactif",
    DRAFT: "Brouillon",
  };

  const statusBadge: Record<string, string> = {
    ACTIVE: "badge-success",
    INACTIVE: "badge-error",
    DRAFT: "badge-warning",
  };

  const typeLabel: Record<string, string> = {
    CHATBOT: "Chatbot",
    VOICE: "Vocal",
    WORKFLOW: "Workflow",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Mes Agents
        </h1>
        <Link href="/dashboard/agents/new" className="btn btn-primary">
          + Creer un agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body items-center text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-base-content/50">
              Aucun agent
            </h2>
            <p className="text-base-content/40 mb-4">
              Creez votre premier agent IA pour automatiser vos interactions
            </p>
            <Link href="/dashboard/agents/new" className="btn btn-primary">
              Creer un agent
            </Link>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Conversations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover">
                      <td className="font-medium">{agent.name}</td>
                      <td>
                        <span className="badge badge-outline badge-sm">
                          {typeLabel[agent.type]}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${statusBadge[agent.status]}`}
                        >
                          {statusLabel[agent.status]}
                        </span>
                      </td>
                      <td>{agent._count.conversations}</td>
                      <td>
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/agents/${agent.id}`}
                            className="btn btn-ghost btn-xs"
                          >
                            Modifier
                          </Link>
                          <Link
                            href={`/dashboard/agents/${agent.id}`}
                            className="btn btn-ghost btn-xs text-error"
                          >
                            Supprimer
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
