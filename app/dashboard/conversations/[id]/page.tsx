import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      agent: { select: { name: true, userId: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!conversation || conversation.agent.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/conversations" className="btn btn-ghost btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </Link>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            {conversation.agent.name}
          </h1>
          <p className="text-sm text-base-content/50">
            {conversation.visitorName || conversation.visitorEmail || "Visiteur anonyme"}
            {" - "}
            {new Date(conversation.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          {conversation.messages.length === 0 ? (
            <p className="text-base-content/40 text-center py-8">
              Aucun message dans cette conversation
            </p>
          ) : (
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat ${
                    message.role === "USER" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-header text-xs text-base-content/50 mb-1">
                    {message.role === "USER" ? "Visiteur" : "Assistant"}
                    <time className="ml-2">
                      {new Date(message.createdAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div
                    className={`chat-bubble ${
                      message.role === "USER"
                        ? "chat-bubble-primary"
                        : "chat-bubble-neutral"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
