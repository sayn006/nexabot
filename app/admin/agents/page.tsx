import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminAgentsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const agents = await prisma.agent.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { conversations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return "badge-success";
      case "INACTIVE": return "badge-warning";
      case "DRAFT": return "badge-ghost";
      default: return "badge-ghost";
    }
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case "CHATBOT": return "badge-info";
      case "VOICE": return "badge-secondary";
      case "WORKFLOW": return "badge-accent";
      default: return "badge-ghost";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agents IA</h1>
        <span className="badge badge-lg">{agents.length} agent{agents.length !== 1 ? "s" : ""}</span>
      </div>

      {agents.length === 0 ? (
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body text-center py-12">
            <p className="text-base-content/60">Aucun agent créé pour le moment.</p>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 border border-base-300">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Client</th>
                  <th>Conversations</th>
                  <th>Créé le</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover">
                    <td className="font-medium">{agent.name}</td>
                    <td>
                      <span className={`badge badge-sm ${typeBadge(agent.type)}`}>
                        {agent.type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-sm ${statusBadge(agent.status)}`}>
                        {agent.status}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm">{agent.user.name || "—"}</p>
                        <p className="text-xs text-base-content/50">{agent.user.email}</p>
                      </div>
                    </td>
                    <td>{agent._count.conversations}</td>
                    <td className="text-sm text-base-content/60">
                      {new Date(agent.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
