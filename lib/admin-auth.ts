import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Non authentifie", status: 401 } as const;
  }
  const role = (session.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    return { error: "Acces interdit", status: 403 } as const;
  }
  return { session } as const;
}
