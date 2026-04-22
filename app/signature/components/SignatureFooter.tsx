const F = "var(--font-display)";
const TL = "var(--text-light)";
const B = "var(--border)";

export default function SignatureFooter() {
  return (
    <footer className="border-t py-8 px-6 mt-12" style={{ borderColor: B }}>
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
        style={{ color: TL }}
      >
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
