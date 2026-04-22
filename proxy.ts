import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SIGNATURE_JWT_COOKIE = "signature_jwt";

// Protege les routes privees du portail Signature.
// Validation du JWT : uniquement presence du cookie.
// Le backend Symfony valide le token a chaque appel API.
export function proxy(request: NextRequest) {
  const token = request.cookies.get(SIGNATURE_JWT_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/signature/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signature/dashboard/:path*",
    "/signature/submissions/:path*",
    "/signature/billing",
  ],
};
