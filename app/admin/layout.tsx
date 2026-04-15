import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const role = (session.user as { role?: string })?.role;
  if (role !== "ADMIN") redirect("/dashboard");

  const userName = session.user?.name || session.user?.email || "Admin";

  return <AdminShell userName={userName}>{children}</AdminShell>;
}
