"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function refuse() {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 20px 20px",
        }}
      >
        <div
          style={{
            background: "#fafaf8",
            border: "1px solid #e5e5e0",
            borderRadius: 16,
            padding: "24px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
            boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          <p
            style={{
              flex: 1,
              minWidth: 240,
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            Ce site utilise des cookies pour am&eacute;liorer votre
            exp&eacute;rience. En continuant &agrave; naviguer, vous acceptez
            notre utilisation des cookies.{" "}
            <a
              href="#"
              style={{
                color: "#0dca7a",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              En savoir plus
            </a>
          </p>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              onClick={refuse}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                border: "1.5px solid #ccc",
                background: "transparent",
                color: "#555",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#999")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#ccc")
              }
            >
              Refuser
            </button>
            <button
              onClick={accept}
              style={{
                padding: "10px 22px",
                borderRadius: 10,
                border: "none",
                background: "#0dca7a",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0bb86e")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#0dca7a")
              }
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
