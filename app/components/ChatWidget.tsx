"use client";
import { useState, useRef, useEffect } from "react";

const WEBHOOK_URL = "https://n8n.emcorp.io/webhook/nexabot-chatbot";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Bonjour ! 👋 Je suis l'assistant NexaBot. Comment puis-je vous aider ? Je peux vous renseigner sur nos chatbots IA, nos tarifs ou organiser une démo gratuite." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMsgs((p) => [...p, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.reply || "Désolé, une erreur est survenue." }]);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Désolé, contactez-nous à contact@nexabot.io" }]);
    } finally {
      setLoading(false);
    }
  };

  const A = "#0dca7a";

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-white"
        style={{ background: A, width: 52, height: 52 }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
        )}
        {!open && msgs.length <= 1 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-pulse" />}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-7rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden border" style={{ background: "#fff", borderColor: "#e8e8e2" }}>
          {/* Header */}
          <div className="px-5 py-3.5 flex items-center gap-3 border-b" style={{ borderColor: "#e8e8e2" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: A }}>N</div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900" style={{ fontFamily: "var(--font-display)" }}>NexaBot</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> En ligne
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: "#fafaf8" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "text-white rounded-br-md"
                    : "bg-white text-gray-800 border rounded-bl-md shadow-sm"
                }`} style={m.role === "user" ? { background: A } : { borderColor: "#e8e8e2" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm" style={{ borderColor: "#e8e8e2" }}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick actions */}
          {msgs.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2" style={{ background: "#fafaf8" }}>
              {["Vos tarifs ?", "Comment ça marche ?", "Démo gratuite"].map((q) => (
                <button key={q} onClick={() => setInput(q)} className="text-xs px-3 py-1.5 rounded-full border transition hover:bg-gray-50" style={{ borderColor: A, color: A }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: "#e8e8e2" }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2.5 bg-gray-50 rounded-full text-sm outline-none focus:ring-2 text-gray-800 placeholder-gray-400"
                style={{ focusRingColor: A } as React.CSSProperties}
                disabled={loading}
              />
              <button onClick={send} disabled={loading || !input.trim()} className="w-10 h-10 rounded-full flex items-center justify-center transition disabled:opacity-40 text-white" style={{ background: A }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">Propulsé par NexaBot</p>
          </div>
        </div>
      )}
    </>
  );
}
