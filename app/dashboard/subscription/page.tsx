import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PLANS } from "@/lib/stripe-plans";
import SubscribeButton from "./SubscribeButton";
import PortalButton from "./PortalButton";

export default async function SubscriptionPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const subscription = await prisma.subscription.findFirst({
    where: { userId: session.user.id, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Abonnement</h1>

      {subscription && (
        <div className="alert alert-success mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-bold">Plan {subscription.planType} actif</p>
            <p className="text-sm">
              Renouvellement le {new Date(subscription.currentPeriodEnd).toLocaleDateString("fr-FR")}
            </p>
          </div>
          <PortalButton />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => {
          const isCurrent = subscription?.planType === key;
          return (
            <div
              key={key}
              className={`card bg-base-100 border ${isCurrent ? "border-primary ring-2 ring-primary/20" : "border-base-300"}`}
            >
              <div className="card-body">
                {isCurrent && (
                  <div className="badge badge-primary badge-sm mb-2">Plan actuel</div>
                )}
                <h2 className="card-title">{plan.name}</h2>
                <p className="text-3xl font-bold">
                  {plan.price}€<span className="text-sm font-normal text-base-content/60">/mois</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="card-actions mt-6">
                  {isCurrent ? (
                    <button className="btn btn-disabled w-full">Plan actuel</button>
                  ) : (
                    <SubscribeButton plan={key} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
