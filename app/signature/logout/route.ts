import { NextResponse } from "next/server";

import { clearSignatureToken } from "@/lib/signature/auth";

function buildLoginUrl(request: Request): URL {
  const headers = request.headers;
  const forwardedHost = headers.get("x-forwarded-host") ?? headers.get("host");
  const forwardedProto = headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return new URL("/signature/login", `${forwardedProto}://${forwardedHost}`);
  }

  return new URL("/signature/login", request.url);
}

export async function GET(request: Request) {
  await clearSignatureToken();
  return NextResponse.redirect(buildLoginUrl(request));
}

export async function POST(request: Request) {
  await clearSignatureToken();
  return NextResponse.redirect(buildLoginUrl(request), { status: 303 });
}
