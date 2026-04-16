import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "emcorp.io — Agence IA | Chatbots & Automatisation",
  description:
    "Agence IA specialisee dans les chatbots, agents vocaux et l'automatisation pour PME. Boostez votre productivite et votre relation client avec des solutions IA sur mesure. emcorp.io",
  openGraph: {
    title: "emcorp.io — Agence IA | Chatbots & Automatisation",
    description:
      "Agence IA specialisee dans les chatbots, agents vocaux et l'automatisation pour PME. Boostez votre productivite et votre relation client avec des solutions IA sur mesure.",
    url: "https://emcorp.io",
    siteName: "emcorp.io",
    images: [
      {
        url: "/logo-icon-green.svg",
        width: 44,
        height: 51,
        alt: "emcorp.io logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "emcorp.io — Agence IA | Chatbots & Automatisation",
    description:
      "Agence IA specialisee dans les chatbots, agents vocaux et l'automatisation pour PME.",
  },
  metadataBase: new URL("https://emcorp.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        {children}
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function reveal(){
                  document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(function(el){
                    var r=el.getBoundingClientRect();
                    if(r.top<window.innerHeight+40&&r.bottom>0){
                      el.classList.add('visible');
                      var v=el.dataset.variant;
                      if(v==='left')el.classList.add('from-left');
                      if(v==='right')el.classList.add('from-right');
                      if(v==='scale')el.classList.add('scale');
                      if(v==='blur')el.classList.add('blur');
                    }
                  });
                }
                reveal();
                window.addEventListener('scroll',reveal,{passive:true});
                window.addEventListener('resize',reveal,{passive:true});
                setTimeout(reveal,100);
                setTimeout(reveal,500);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
