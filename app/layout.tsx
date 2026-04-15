import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "NexaBot — Agence IA | Chatbots & Automatisation",
  description: "Automatisez votre business avec l'IA. Chatbots, agents vocaux, automatisation pour PME.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        {children}
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
