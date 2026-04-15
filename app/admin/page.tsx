import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalUsers, totalLeads, totalAgents, totalConversations, recentLeads, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.lead.count(),
      prisma.agent.count(),
      prisma.conversation.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          _count: { select: { agents: true } },
        },
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Utilisateurs</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Leads</div>
          <div className="stat-value text-secondary">{totalLeads}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Agents</div>
          <div className="stat-value text-accent">{totalAgents}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Conversations</div>
          <div className="stat-value">{totalConversations}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Derniers leads</h2>
            {recentLeads.length === 0 ? (
              <p className="text-base-content/50 py-4">Aucun lead</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Source</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="font-medium">{lead.name}</td>
                        <td className="text-sm">{lead.email}</td>
                        <td>
                          <span className="badge badge-outline badge-xs">
                            {lead.source === "CONTACT_FORM" ? "Formulaire" : "Chatbot"}
                          </span>
                        </td>
                        <td className="text-sm text-base-content/60">
                          {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Derniers utilisateurs</h2>
            {recentUsers.length === 0 ? (
              <p className="text-base-content/50 py-4">Aucun utilisateur</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Agents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="font-medium">{user.name || "-"}</td>
                        <td className="text-sm">{user.email}</td>
                        <td>
                          <span
                            className={`badge badge-xs ${
                              user.role === "ADMIN" ? "badge-neutral" : "badge-ghost"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>{user._count.agents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
