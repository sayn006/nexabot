import { NextResponse } from "next/server";

import { clearSignatureToken } from "@/lib/signature/auth";

export async function GET(request: Request) {
  await clearSignatureToken();
  const url = new URL("/signature/login", request.url);
  return NextResponse.redirect(url);
}

export async function POST(request: Request) {
  await clearSignatureToken();
  const url = new URL("/signature/login", request.url);
  return NextResponse.redirect(url, { status: 303 });
}
