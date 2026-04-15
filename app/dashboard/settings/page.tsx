import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Parametres</h1>
      <SettingsForm user={{ name: user.name || "", email: user.email }} />
    </div>
  );
}
