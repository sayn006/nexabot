import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ConversationsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const conversations = await prisma.conversation.findMany({
    where: {
      agent: { userId: session.user.id },
    },
    include: {
      agent: { select: { name: true } },
      _count: { select: { messages: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        Conversations
      </h1>

      {conversations.length === 0 ? (
        <div className="card bg-base-100 shadow">
          <div className="card-body items-center text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-base-content/20 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-base-content/50">
              Aucune conversation
            </h2>
            <p className="text-base-content/40">
              Les conversations avec vos agents apparaitront ici
            </p>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Visiteur</th>
                    <th>Messages</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {conversations.map((conv) => (
                    <tr key={conv.id} className="hover">
                      <td>
                        <Link
                          href={`/dashboard/conversations/${conv.id}`}
                          className="font-medium link link-hover"
                        >
                          {conv.agent.name}
                        </Link>
                      </td>
                      <td>
                        {conv.visitorName || conv.visitorEmail || (
                          <span className="text-base-content/40">Anonyme</span>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-sm badge-outline">
                          {conv._count.messages}
                        </span>
                      </td>
                      <td className="text-base-content/60">
                        {new Date(conv.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
