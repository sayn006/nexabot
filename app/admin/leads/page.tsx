import { prisma } from "@/lib/prisma";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Leads
      </h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body p-0">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-base-content/50">
              <p>Aucun lead pour le moment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th>Source</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover">
                      <td className="font-medium">{lead.name}</td>
                      <td>
                        <a
                          href={`mailto:${lead.email}`}
                          className="link link-primary text-sm"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="text-sm">{lead.company || "-"}</td>
                      <td>
                        <span className="badge badge-outline badge-sm">
                          {lead.source === "CONTACT_FORM" ? "Formulaire" : "Chatbot"}
                        </span>
                      </td>
                      <td className="text-sm text-base-content/60">
                        {new Date(lead.createdAt).toLocaleDateString("fr-FR", {
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
