import type { SignatureUser } from "@/lib/signature/types";

import SignatureFooter from "./SignatureFooter";
import SignatureNav from "./SignatureNav";
import SignatureSidebar from "./SignatureSidebar";

export default function ProtectedShell({
  user,
  children,
}: {
  user: SignatureUser;
  children: React.ReactNode;
}) {
  return (
    <>
      <SignatureNav authenticated userName={user.name || user.email} />

      <main className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:gap-10">
          <SignatureSidebar />
          <section className="flex-1 lg:py-8 mt-6 lg:mt-0">{children}</section>
        </div>
      </main>

      <SignatureFooter />
    </>
  );
}
