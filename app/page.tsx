import ScrollReveal from "./components/ScrollReveal";
import StaggerContainer from "./components/StaggerContainer";
import ChatWidget from "./components/ChatWidget";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: A }}>
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="font-bold tracking-tight" style={{ fontFamily: F }}>nexabot</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium" style={{ color: T }}>
            <a href="#services" className="hover:text-[var(--text)] transition">Services</a>
            <a href="#process" className="hover:text-[var(--text)] transition">Fonctionnement</a>
            <a href="#tarifs" className="hover:text-[var(--text)] transition">Tarifs</a>
            <a href="#faq" className="hover:text-[var(--text)] transition">FAQ</a>
          </div>
          <a href="#contact" className="text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition hover:opacity-90" style={{ background: A }}>
            Démo gratuite
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[13px] font-medium mb-8" style={{ borderColor: B, color: T }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: A }} />
              Nouveau : Agents IA pour restaurants & e-commerce
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight" style={{ fontFamily: F }}>
              Votre business tourne<br />
              <span style={{ color: A }}>même quand vous dormez</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: T }}>
              Des agents IA qui répondent à vos clients, prennent des réservations et gèrent vos tâches répétitives. 24h/24, 7j/7.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={450}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              <a href="#contact" className="text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition hover:opacity-90 hover:shadow-lg" style={{ background: A }}>
                Démarrer — c&apos;est gratuit
              </a>
              <a href="#services" className="font-medium px-7 py-3.5 rounded-xl text-sm border transition hover:bg-[var(--bg-alt)]" style={{ borderColor: B, color: T }}>
                Voir les services
              </a>
            </div>
          </ScrollReveal>
        </div>
        <StaggerContainer className="max-w-3xl mx-auto mt-20 flex flex-wrap justify-center gap-10">
          {[
            { icon: "⚡", val: "24/7", sub: "Toujours actif" },
            { icon: "💬", val: "< 3s", sub: "Temps de réponse" },
            { icon: "📉", val: "-80%", sub: "Tickets support" },
            { icon: "🎯", val: "100%", sub: "Configurable" },
          ].map((s) => (
            <ScrollReveal key={s.sub} variant="scale">
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-bold text-lg" style={{ fontFamily: F }}>{s.val}</div>
                  <div className="text-xs" style={{ color: TL }}>{s.sub}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </StaggerContainer>
      </section>

      {/* Marquee */}
      <div className="border-y overflow-hidden py-4" style={{ borderColor: B }}>
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 text-sm font-medium" style={{ color: TL }}>
              <span>Chatbot IA</span><span>•</span>
              <span>WhatsApp Business</span><span>•</span>
              <span>Agent Vocal</span><span>•</span>
              <span>Automatisation</span><span>•</span>
              <span>Support 24/7</span><span>•</span>
              <span>E-commerce</span><span>•</span>
              <span>Restaurants</span><span>•</span>
              <span>PME</span><span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Services</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                4 solutions pour automatiser votre activité
              </h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: "💬", title: "Chatbot site web", desc: "Un assistant intégré à votre site qui connaît votre activité par cœur. Il répond en langage naturel, propose des produits, guide vos visiteurs.", price: "à partir de 77€/mois" },
              { emoji: "📱", title: "Chatbot WhatsApp", desc: "Vos clients vous écrivent sur WhatsApp ? L'IA répond instantanément ou transfère à un humain si besoin. Zéro message manqué.", price: "à partir de 97€/mois" },
              { emoji: "🔄", title: "Automatisations", desc: "Relances automatiques, tri d'emails, sync CRM, notifications. Tout ce qui est répétitif, on l'automatise.", price: "à partir de 150€/mois" },
              { emoji: "🎙️", title: "Agent vocal", desc: "Un assistant qui décroche le téléphone, prend des RDV et répond aux questions. Indiscernable d'un humain.", price: "sur devis" },
            ].map((s) => (
              <ScrollReveal key={s.title} variant="scale">
                <div className="card-hover group border rounded-2xl p-7 transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "var(--accent-bg)", color: A }}>{s.price}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Comment ça marche</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Opérationnel en 3 étapes
              </h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { n: "1", title: "On échange", desc: "Appelez-nous ou remplissez le formulaire. On comprend votre besoin en 15 minutes." },
              { n: "2", title: "On configure", desc: "En 2-5 jours votre agent IA est prêt, entraîné avec vos données (menu, FAQ, catalogue)." },
              { n: "3", title: "Ça tourne", desc: "Votre agent est en ligne 24/7. Vous recevez des rapports et pouvez ajuster à tout moment." },
            ].map((step) => (
              <ScrollReveal key={step.n}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl font-bold text-white mb-5 transition-transform hover:scale-110" style={{ background: A, fontFamily: F }}>
                    {step.n}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Tarifs</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Simple. Transparent. Sans engagement.
              </h2>
              <p className="mt-3 text-sm" style={{ color: T }}>Utilisateurs illimités sur tous les plans.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Starter", price: "77€", sub: "/mois", setup: "Setup : 500€", desc: "Un chatbot pour démarrer", features: ["Chatbot IA sur votre site", "Widget aux couleurs de votre marque", "Rapport email des conversations", "Support email", "Utilisateurs illimités"], pop: false },
              { name: "Business", price: "150€", sub: "/mois", setup: "Setup : 2 000€", desc: "Pour aller plus loin", features: ["Tout Starter +", "Chatbot WhatsApp intégré", "Automatisations workflows", "Connexion catalogue / CRM", "Dashboard analytics", "Support prioritaire"], pop: true },
              { name: "Enterprise", price: "Sur devis", sub: "", setup: "", desc: "Solution sur mesure", features: ["Tout Business +", "Agent vocal téléphone", "Multi-canaux", "Instance dédiée", "SLA garanti", "Accompagnement dédié"], pop: false },
            ].map((p) => (
              <ScrollReveal key={p.name} variant="scale">
                <div className={`card-hover border rounded-2xl p-7 relative ${p.pop ? "ring-2" : ""}`} style={{ borderColor: p.pop ? A : B, background: "var(--surface)" }}>
                  {p.pop && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: A }}>Recommandé</div>
                  )}
                  <h3 className="font-bold text-lg" style={{ fontFamily: F }}>{p.name}</h3>
                  <p className="text-xs mt-1" style={{ color: TL }}>{p.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-bold" style={{ fontFamily: F }}>{p.price}</span>
                    <span className="text-sm" style={{ color: TL }}>{p.sub}</span>
                  </div>
                  {p.setup && <p className="text-xs mt-1" style={{ color: TL }}>{p.setup}</p>}
                  <a href="#contact" className={`block w-full text-center mt-6 py-2.5 rounded-lg text-sm font-semibold transition ${p.pop ? "text-white hover:opacity-90 hover:shadow-lg" : "border hover:bg-[var(--bg-alt)]"}`} style={p.pop ? { background: A } : { borderColor: B, color: T }}>
                    {p.price === "Sur devis" ? "Nous contacter" : "Commencer"}
                  </a>
                  <ul className="mt-6 pt-5 space-y-2.5" style={{ borderTop: `1px solid ${B}` }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: T }}>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: A }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: F }}>Questions fréquentes</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              { q: "Combien de temps pour installer un chatbot ?", a: "Entre 2 et 5 jours ouvrés selon la complexité. Un chatbot FAQ basique est opérationnel en 48h." },
              { q: "L'IA remplace-t-elle mes employés ?", a: "Non. Elle gère 80% des questions répétitives et transfère les cas complexes à votre équipe." },
              { q: "Mes données sont-elles sécurisées ?", a: "Oui. Hébergement en France, serveurs dédiés, aucun partage avec des tiers." },
              { q: "Puis-je tester gratuitement ?", a: "Absolument. Démo personnalisée gratuite avec vos propres données." },
              { q: "L'IA répond-elle n'importe quoi ?", a: "Non. Si elle ne sait pas, elle propose de contacter un humain. Zéro hallucination." },
            ].map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 100}>
                <details className="group border rounded-xl" style={{ borderColor: B, background: "var(--surface)" }}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm" style={{ fontFamily: F }}>
                    {f.q}
                    <span className="text-lg transition-transform duration-300 group-open:rotate-45" style={{ color: TL }}>+</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: T }}>{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <ScrollReveal variant="scale">
          <div className="max-w-xl mx-auto border rounded-3xl p-8 sm:p-12" style={{ borderColor: B, background: "var(--surface)" }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: F }}>
                Prêt à <span style={{ color: A }}>automatiser</span> ?
              </h2>
              <p className="text-sm" style={{ color: T }}>
                Décrivez votre besoin, on vous répond sous 24h avec une démo personnalisée.
              </p>
            </div>
            <ContactForm />
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6" style={{ borderColor: B }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: TL }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: A }}>
              <span className="text-white text-[10px] font-bold">N</span>
            </div>
            <span className="font-semibold" style={{ color: "var(--text)", fontFamily: F }}>nexabot</span>
          </div>
          <div className="flex gap-5">
            <a href="mailto:contact@emcorp.io" className="hover:text-[var(--text)] transition">contact@emcorp.io</a>
          </div>
          <span>© 2026 NexaBot — Propulsé par emcorp.io</span>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatWidget />
    </>
  );
}
