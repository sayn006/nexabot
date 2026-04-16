import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let configured = false;

    try {
      const setting = await prisma.setting.findUnique({
        where: { key: "DOCUSEAL_API_KEY" },
      });
      if (setting?.value) configured = true;
    } catch {
      // Setting table may not exist yet
    }

    if (!configured && process.env.DOCUSEAL_API_KEY) {
      configured = true;
    }

    return NextResponse.json({ configured });
  } catch (error) {
    console.error("[Signature Config]", error);
    return NextResponse.json({ configured: false });
  }
}
