"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { DocusealBuilder } from "@docuseal/react";

const F = "var(--font-display)";
const T = "var(--text-sub)";
const TL = "var(--text-light)";
const A = "var(--accent)";
const B = "var(--border)";

interface Signer {
  name: string;
  email: string;
}

const STEP_LABELS = [
  "Preparer le document",
  "Ajouter les signataires",
  "Payer et envoyer",
];

export default function SignaturePage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedPath, setUploadedPath] = useState("");
  const [uploading, setUploading] = useState(false);
  const [signers, setSigners] = useState<Signer[]>([{ name: "", email: "" }]);
  const [clientEmail, setClientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // DocuSeal state
  const [docusealConfigured, setDocusealConfigured] = useState<boolean | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [builderToken, setBuilderToken] = useState<string | null>(null);
  const [docusealUrl, setDocusealUrl] = useState("https://sign.cashloose.com");
  const [builderReady, setBuilderReady] = useState(false);

  // Check if DocuSeal is configured
  useEffect(() => {
    fetch("/api/signature/config")
      .then((r) => r.json())
      .then((data) => setDocusealConfigured(data.configured))
      .catch(() => setDocusealConfigured(false));
  }, []);

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Seuls les fichiers PDF sont acceptes.");
      return;
    }
    setFile(selectedFile);
    setError("");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    [handleFileSelect]
  );

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/signature/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur upload");
      setUploadedPath(data.filePath);
      setTemplateId(data.templateId || null);
      setBuilderToken(data.builderToken || null);
      if (data.docusealUrl) setDocusealUrl(data.docusealUrl);

      if (data.builderToken) {
        // Show the builder for field placement
        setBuilderReady(true);
      } else {
        // No builder token — skip to signers step
        setStep(2);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleBuilderSave = () => {
    // User finished placing fields, move to signers step
    setStep(2);
  };

  const addSigner = () => setSigners([...signers, { name: "", email: "" }]);

  const removeSigner = (index: number) => {
    if (signers.length <= 1) return;
    setSigners(signers.filter((_, i) => i !== index));
  };

  const updateSigner = (index: number, field: keyof Signer, value: string) => {
    const updated = [...signers];
    updated[index] = { ...updated[index], [field]: value };
    setSigners(updated);
  };

  const goToStep3 = () => {
    const valid = signers.every((s) => s.name.trim() && s.email.trim() && s.email.includes("@"));
    if (!valid) {
      setError("Veuillez remplir le nom et l'email de chaque signataire.");
      return;
    }
    setError("");
    setStep(3);
  };

  const handlePay = async () => {
    if (!clientEmail.trim() || !clientEmail.includes("@")) {
      setError("Veuillez saisir votre adresse email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Create signature request
      const createRes = await fetch("/api/signature/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clientEmail,
          documentName: file?.name || "document.pdf",
          documentUrl: uploadedPath,
          templateId: templateId,
          signers: signers.map((s) => ({ name: s.name.trim(), email: s.email.trim() })),
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error || "Erreur creation");

      // Create payment session
      const payRes = await fetch("/api/signature/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureRequestId: createData.id }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error || "Erreur paiement");

      // Redirect to Stripe
      window.location.href = payData.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors du paiement");
      setLoading(false);
    }
  };

  // Derive the host for DocusealBuilder from the URL (strip protocol)
  const docusealHost = docusealUrl.replace(/^https?:\/\//, "");

  // Unconfigured state
  if (docusealConfigured === false) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>
                Signature electronique
              </p>
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: F }}
              >
                Faites signer vos documents
              </h1>
            </div>
            <div
              className="border rounded-2xl p-12"
              style={{ borderColor: B, background: "var(--surface)" }}
            >
              <div className="text-5xl mb-4" style={{ color: TL }}>&#9888;</div>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>
                Service en cours de configuration
              </h2>
              <p className="text-sm" style={{ color: T }}>
                Veuillez nous contacter pour utiliser ce service.
              </p>
              <a
                href="mailto:contact@emcorp.io"
                className="inline-block mt-6 px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: A }}
              >
                Nous contacter
              </a>
            </div>
          </div>
        </main>
        <PageFooter />
      </>
    );
  }

  // Loading state
  if (docusealConfigured === null) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-sm" style={{ color: T }}>Chargement...</div>
          </div>
        </main>
        <PageFooter />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className="min-h-screen px-6 py-16">
        <div className={step === 1 && builderReady ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"}>
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold mb-2" style={{ color: A }}>
              Signature electronique
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: F }}
            >
              Faites signer vos documents
            </h1>
            <p className="mt-3 text-sm" style={{ color: T }}>
              Uploadez, placez les champs de signature, ajoutez vos signataires, payez 3&euro; et c&apos;est parti.
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                    style={{
                      background: step >= s ? A : "var(--bg-alt)",
                      color: step >= s ? "white" : TL,
                      fontFamily: F,
                    }}
                  >
                    {s}
                  </div>
                  <span
                    className="hidden sm:inline text-xs font-medium"
                    style={{ color: step >= s ? "var(--text)" : TL }}
                  >
                    {STEP_LABELS[s - 1]}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className="w-8 sm:w-16 h-0.5 rounded"
                    style={{ background: step > s ? A : "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 p-4 rounded-xl text-sm font-medium text-red-700"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {error}
            </div>
          )}

          {/* Step 1: Upload + Builder */}
          {step === 1 && !builderReady && (
            <div className="border rounded-2xl p-8" style={{ borderColor: B, background: "var(--surface)" }}>
              <h2 className="text-lg font-bold mb-1" style={{ fontFamily: F }}>
                1. Uploadez votre document
              </h2>
              <p className="text-sm mb-6" style={{ color: T }}>
                Selectionnez un fichier PDF a faire signer.
              </p>

              <div
                className="border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer"
                style={{
                  borderColor: dragOver ? A : B,
                  background: dragOver ? "var(--accent-bg)" : "var(--bg-alt)",
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <div className="text-4xl mb-3">
                  {file ? (
                    <span style={{ color: A }}>&#10003;</span>
                  ) : (
                    <span style={{ color: TL }}>&#128196;</span>
                  )}
                </div>
                {file ? (
                  <div>
                    <p className="font-semibold text-sm">{file.name}</p>
                    <p className="text-xs mt-1" style={{ color: TL }}>
                      {(file.size / 1024 / 1024).toFixed(2)} Mo
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-sm">
                      Glissez votre PDF ici ou cliquez pour parcourir
                    </p>
                    <p className="text-xs mt-1" style={{ color: TL }}>
                      Format accepte : PDF
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={uploadFile}
                disabled={!file || uploading}
                className="w-full mt-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: A }}
              >
                {uploading ? "Upload en cours..." : "Continuer"}
              </button>
            </div>
          )}

          {/* Step 1b: DocuSeal Builder - Field placement */}
          {step === 1 && builderReady && builderToken && (
            <div className="border rounded-2xl overflow-hidden" style={{ borderColor: B, background: "var(--surface)" }}>
              <div className="p-6 border-b" style={{ borderColor: B }}>
                <h2 className="text-lg font-bold mb-1" style={{ fontFamily: F }}>
                  1. Placez les champs de signature
                </h2>
                <p className="text-sm" style={{ color: T }}>
                  Glissez-deposez les champs (signature, date, texte...) sur votre document.
                  Cliquez sur &laquo; Continuer &raquo; quand vous avez termine.
                </p>
              </div>

              <div style={{ minHeight: "700px" }}>
                <DocusealBuilder
                  token={builderToken}
                  host={docusealHost}
                  language="fr"
                  withSendButton={false}
                  withSignYourselfButton={false}
                  withUploadButton={false}
                  withTitle={false}
                  autosave={true}
                  onSave={handleBuilderSave}
                  backgroundColor="#fafaf8"
                  style={{ width: "100%", minHeight: "700px" }}
                />
              </div>

              <div className="p-6 border-t" style={{ borderColor: B }}>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setBuilderReady(false);
                      setBuilderToken(null);
                      setTemplateId(null);
                      setFile(null);
                      setUploadedPath("");
                      setError("");
                    }}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold border transition hover:bg-[var(--bg-alt)]"
                    style={{ borderColor: B, color: T }}
                  >
                    Recommencer
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: A }}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Signers */}
          {step === 2 && (
            <div className="border rounded-2xl p-8" style={{ borderColor: B, background: "var(--surface)" }}>
              <h2 className="text-lg font-bold mb-1" style={{ fontFamily: F }}>
                2. Ajoutez les signataires
              </h2>
              <p className="text-sm mb-6" style={{ color: T }}>
                Qui doit signer ce document ?
              </p>

              <div className="space-y-4">
                {signers.map((signer, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start p-4 border rounded-xl"
                    style={{ borderColor: B, background: "var(--bg-alt)" }}
                  >
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        placeholder="Nom du signataire"
                        value={signer.name}
                        onChange={(e) => updateSigner(i, "name", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
                        style={{ borderColor: B, "--tw-ring-color": A } as React.CSSProperties}
                      />
                      <input
                        type="email"
                        placeholder="Email du signataire"
                        value={signer.email}
                        onChange={(e) => updateSigner(i, "email", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
                        style={{ borderColor: B, "--tw-ring-color": A } as React.CSSProperties}
                      />
                    </div>
                    {signers.length > 1 && (
                      <button
                        onClick={() => removeSigner(i)}
                        className="mt-2 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border transition hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                        style={{ borderColor: B, color: TL }}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addSigner}
                className="mt-4 flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: A }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ background: A }}>
                  +
                </span>
                Ajouter un signataire
              </button>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setStep(1);
                    setError("");
                    if (builderToken) setBuilderReady(true);
                  }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border transition hover:bg-[var(--bg-alt)]"
                  style={{ borderColor: B, color: T }}
                >
                  Retour
                </button>
                <button
                  onClick={goToStep3}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: A }}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Summary + Pay */}
          {step === 3 && (
            <div className="border rounded-2xl p-8" style={{ borderColor: B, background: "var(--surface)" }}>
              <h2 className="text-lg font-bold mb-1" style={{ fontFamily: F }}>
                3. Recapitulatif et paiement
              </h2>
              <p className="text-sm mb-6" style={{ color: T }}>
                Verifiez les informations puis procedez au paiement.
              </p>

              {/* Summary */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl" style={{ background: "var(--bg-alt)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: TL }}>
                    Document
                  </p>
                  <p className="text-sm font-medium">{file?.name}</p>
                </div>

                <div className="p-4 rounded-xl" style={{ background: "var(--bg-alt)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: TL }}>
                    Signataires ({signers.length})
                  </p>
                  {signers.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm py-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: A }} />
                      <span className="font-medium">{s.name}</span>
                      <span style={{ color: TL }}>— {s.email}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border" style={{ borderColor: A, background: "var(--accent-bg)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-2xl font-bold" style={{ fontFamily: F, color: A }}>
                      3,00 EUR
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: T }}>
                    Paiement unique. Sans abonnement.
                  </p>
                </div>
              </div>

              {/* Client email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Votre email (pour recevoir le document signe)
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white outline-none transition focus:ring-2"
                  style={{ borderColor: B, "--tw-ring-color": A } as React.CSSProperties}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setStep(2); setError(""); }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border transition hover:bg-[var(--bg-alt)]"
                  style={{ borderColor: B, color: T }}
                >
                  Retour
                </button>
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: A }}
                >
                  {loading ? "Redirection..." : "Payer 3,00 EUR"}
                </button>
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: TL }}>
              Paiement securise via Stripe. Signature conforme eIDAS.
            </p>
          </div>
        </div>
      </main>

      <PageFooter />
    </>
  );
}

function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
          <span className="font-bold tracking-tight" style={{ fontFamily: F }}>
            emcorp
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium transition hover:opacity-80"
          style={{ color: T }}
        >
          Retour au site
        </Link>
      </div>
    </nav>
  );
}

function PageFooter() {
  return (
    <footer className="border-t py-8 px-6" style={{ borderColor: B }}>
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
        style={{ color: TL }}
      >
        <div className="flex items-center gap-2">
          <img src="/logo-icon-green.svg" alt="emcorp" className="h-5 w-auto" />
          <span className="font-semibold" style={{ color: "var(--text)", fontFamily: F }}>
            emcorp
          </span>
        </div>
        <a href="mailto:contact@emcorp.io" className="hover:text-[var(--text)] transition">
          contact@emcorp.io
        </a>
        <span>&copy; 2026 emcorp.io</span>
      </div>
    </footer>
  );
}
