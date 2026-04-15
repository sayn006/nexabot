import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { agents: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Utilisateurs
      </h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          {users.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p>Aucun utilisateur</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Agents</th>
                    <th>Inscrit le</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover">
                      <td className="font-medium">{user.name || "-"}</td>
                      <td className="text-sm">{user.email}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            user.role === "ADMIN"
                              ? "badge-neutral"
                              : "badge-ghost"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{user._count.agents}</td>
                      <td className="text-sm text-base-content/60">
                        {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
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
