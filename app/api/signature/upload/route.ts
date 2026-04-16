import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

async function getDocuSealConfig(): Promise<{ apiKey: string | null; url: string }> {
  let apiKey: string | null = null;
  let url = "https://sign.cashloose.com";

  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["DOCUSEAL_API_KEY", "DOCUSEAL_URL"] } },
    });
    for (const s of settings) {
      if (s.key === "DOCUSEAL_API_KEY" && s.value) apiKey = s.value;
      if (s.key === "DOCUSEAL_URL" && s.value) url = s.value;
    }
  } catch {
    // Setting table may not exist yet
  }

  if (!apiKey) apiKey = process.env.DOCUSEAL_API_KEY || null;
  if (!url || url === "https://sign.cashloose.com") {
    url = process.env.DOCUSEAL_URL || "https://sign.cashloose.com";
  }

  return { apiKey, url };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Seuls les fichiers PDF sont acceptés" }, { status: 400 });
    }

    // Save file locally
    const uploadDir = path.join(process.cwd(), "data", "signatures");
    await mkdir(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${timestamp}_${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Try to create DocuSeal template
    const { apiKey, url: docusealUrl } = await getDocuSealConfig();

    let templateId: string | null = null;
    let builderToken: string | null = null;

    if (apiKey) {
      try {
        const base64 = buffer.toString("base64");

        // Create template via DocuSeal API
        const templateRes = await fetch(`${docusealUrl}/api/templates/pdf`, {
          method: "POST",
          headers: {
            "X-Auth-Token": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: file.name.replace(/\.pdf$/i, ""),
            documents: [
              {
                name: file.name,
                file: base64,
              },
            ],
          }),
        });

        if (templateRes.ok) {
          const templateData = await templateRes.json();
          templateId = String(templateData.id);

          // Generate a builder token for the embedded builder
          const tokenRes = await fetch(`${docusealUrl}/api/templates/${templateId}/builder_token`, {
            method: "GET",
            headers: {
              "X-Auth-Token": apiKey,
            },
          });

          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            builderToken = tokenData.token || null;
          }
        } else {
          const errText = await templateRes.text();
          console.error("[DocuSeal] Template creation failed:", errText);
        }
      } catch (err) {
        console.error("[DocuSeal] Error creating template:", err);
      }
    }

    return NextResponse.json({
      fileName,
      filePath: `data/signatures/${fileName}`,
      originalName: file.name,
      templateId,
      builderToken,
      docusealUrl: docusealUrl,
      docusealConfigured: !!apiKey,
    });
  } catch (error) {
    console.error("[Signature Upload]", error);
    return NextResponse.json({ error: "Erreur lors de l'upload" }, { status: 500 });
  }
}
