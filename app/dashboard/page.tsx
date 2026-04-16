import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [agents, conversationsThisMonth, subscription] = await Promise.all([
    prisma.agent.findMany({
      where: { userId },
      include: {
        _count: { select: { conversations: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.conversation.count({
      where: {
        agent: { userId },
        createdAt: { gte: startOfMonth },
      },
    }),
    prisma.subscription.findFirst({
      where: { userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

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

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="stats shadow bg-base-100 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="stat-title">Agents</div>
          <div className="stat-value text-primary">{agents.length}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="stat-title">Conversations ce mois</div>
          <div className="stat-value text-secondary">{conversationsThisMonth}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="stat-title">Abonnement</div>
          <div className="stat-value text-sm">
            {subscription ? subscription.planType : "Aucun"}
          </div>
          <div className="stat-desc">
            {subscription ? "Actif" : "Pas d'abonnement actif"}
          </div>
        </div>
      </div>

      {/* Agents list */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Mes Agents</h2>
            <Link href="/dashboard/agents" className="btn btn-primary btn-sm">
              Creer un agent
            </Link>
          </div>

          {agents.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p className="text-lg mb-2">Aucun agent pour le moment</p>
              <p className="text-sm">Creez votre premier agent IA pour commencer</p>
            </div>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Conversations</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td className="font-medium">{agent.name}</td>
                      <td>
                        <span className="badge badge-outline badge-sm">
                          {agent.type}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${statusBadge[agent.status]}`}>
                          {statusLabel[agent.status]}
                        </span>
                      </td>
                      <td>{agent._count.conversations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
