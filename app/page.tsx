import ScrollReveal from "./components/ScrollReveal";
import StaggerContainer from "./components/StaggerContainer";
import ChatWidget from "./components/ChatWidget";
import ContactForm from "./components/ContactForm";
import MobileNav from "./components/MobileNav";

export default function Home() {
  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "emcorp.io",
        "url": "https://emcorp.io",
        "logo": "https://emcorp.io/logo-icon-green.svg",
        "description": "Agence IA & Développement. Des agents IA qui répondent à vos clients, prennent des réservations et gèrent vos tâches répétitives. 24h/24, 7j/7.",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@emcorp.io",
          "contactType": "customer service",
          "availableLanguage": ["French", "English"]
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "emcorp.io",
        "url": "https://emcorp.io",
        "logo": "https://emcorp.io/logo-icon-green.svg",
        "description": "Agence IA & Développement basée à Paris. Chatbots IA, agents vocaux, automatisations et solutions sur mesure pour entreprises.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressCountry": "FR"
        },
        "email": "contact@emcorp.io",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Chatbot IA site web",
              "description": "Assistant IA intégré à votre site qui répond en langage naturel, propose des produits et guide vos visiteurs."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Chatbot WhatsApp",
              "description": "IA qui répond instantanément sur WhatsApp ou transfère à un humain si besoin."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Automatisations",
              "description": "Relances automatiques, tri d'emails, sync CRM, notifications et workflows automatisés."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Agent vocal",
              "description": "Assistant vocal qui décroche le téléphone, prend des RDV et répond aux questions."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
            <span className="font-bold tracking-tight" style={{ fontFamily: F }}>emcorp</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium" style={{ color: T }}>
            <a href="#services" className="hover:text-[var(--text)] transition">Services</a>
            <a href="#expertises" className="hover:text-[var(--text)] transition">Expertises</a>
            <a href="#process" className="hover:text-[var(--text)] transition">Fonctionnement</a>
            <a href="#tarifs" className="hover:text-[var(--text)] transition">Tarifs</a>
            <a href="#faq" className="hover:text-[var(--text)] transition">FAQ</a>
          </div>
          <a href="#contact" className="hidden md:inline-flex text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition hover:opacity-90" style={{ background: A }}>
            Démo gratuite
          </a>
          <MobileNav />
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

      {/* Credibility / Trust Stats */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Qui sommes-nous</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Une équipe expérimentée derrière chaque agent IA
              </h2>
              <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: T }}>
                Nous combinons expertise technique et compréhension métier pour créer des solutions IA qui fonctionnent vraiment.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "10+", label: "Ans d'expérience", icon: "🏆" },
              { val: "150+", label: "Projets livrés", icon: "🚀" },
              { val: "80+", label: "Clients satisfaits", icon: "🤝" },
              { val: "25+", label: "Experts mobilisés", icon: "👨‍💻" },
            ].map((stat) => (
              <ScrollReveal key={stat.label} variant="scale">
                <div className="text-center p-6 border rounded-2xl transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <span className="text-2xl mb-3 block">{stat.icon}</span>
                  <div className="text-4xl font-bold mb-1" style={{ fontFamily: F, color: A }}>{stat.val}</div>
                  <div className="text-sm font-medium" style={{ color: T }}>{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

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

      {/* Valeurs / Why Us */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Nos valeurs</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Pourquoi nous choisir
              </h2>
              <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: T }}>
                Chaque agent IA que nous créons repose sur ces 4 piliers fondamentaux.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5">
            {[
              {
                emoji: "⚙️",
                title: "Excellence technique",
                desc: "Code propre, architecture solide, technologies de pointe. Nous ne livrons que du travail dont nous sommes fiers.",
              },
              {
                emoji: "👂",
                title: "Écoute client",
                desc: "Chaque projet commence par une compréhension profonde de votre métier, vos contraintes et vos objectifs.",
              },
              {
                emoji: "🧠",
                title: "Innovation IA",
                desc: "Nous restons à la pointe des modèles de langage et des frameworks d'automatisation pour vous offrir le meilleur.",
              },
              {
                emoji: "🔥",
                title: "Support réactif",
                desc: "Un problème ? Une question ? Notre équipe répond en moins de 2h en jour ouvré. Pas de ticket sans réponse.",
              },
            ].map((v) => (
              <ScrollReveal key={v.title} variant="scale">
                <div className="card-hover border rounded-2xl p-7 transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <span className="text-3xl mb-4 block">{v.emoji}</span>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{v.desc}</p>
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

      {/* Visual Divider — Chapter transition */}
      <div className="relative py-2">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 30%, var(--bg) 70%, var(--bg-alt) 100%)" }} />
        <div className="relative max-w-xs mx-auto flex items-center gap-4 py-6">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${B})` }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: TL }}>Et aussi</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${B}, transparent)` }} />
        </div>
      </div>

      {/* Nos autres expertises — Transition */}
      <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-semibold mb-2" style={{ color: A }}>Au-delà de l&apos;IA</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
              Une agence tech complète à votre service
            </h2>
            <p className="mt-4 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: T }}>
              En plus de nos solutions IA, nous concevons des applications web et mobiles sur mesure pour digitaliser votre activité.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio / Realisations */}
      <section id="expertises" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Réalisations</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Des projets livrés, des clients satisfaits
              </h2>
              <p className="mt-3 text-sm" style={{ color: T }}>
                Découvrez quelques-unes des solutions livrées par notre équipe.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Kerala Restaurant Indien",
                category: "App Mobile + Site Web",
                badge: "Restauration",
                emoji: "🍛",
                bg: "linear-gradient(135deg, #ea580c 0%, #ef4444 100%)",
                desc: "Application mobile et site internet de commande en ligne pour restaurant. Les clients parcourent le menu, passent commande et paient directement depuis leur téléphone ou le site web. Backoffice complet pour la gestion du menu, des commandes et des réservations.",
                tech: ["Next.js", "Flutter", "Symfony", "Stripe", "Coolify"],
              },
              {
                name: "OSR Sécurité",
                category: "Web + Mobile",
                badge: "Sécurité",
                emoji: "🛡️",
                bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                desc: "Outil de gestion métier complet pour société de sécurité. Gestion des clients, des sites, des agents, du matériel et planification CRM. Interface interne pour piloter l'ensemble de l'activité au quotidien.",
                tech: ["Flutter", "Symfony", "WebSocket", "Firebase", "MySQL"],
              },
              {
                name: "TPR Transport",
                category: "App Mobile + Outils Web",
                badge: "Transport",
                emoji: "🚛",
                bg: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                desc: "Application mobile et outils de gestion pour entreprise de transport. Création de devis, gestion des contrats, facturation et suivi des missions. Un outil métier complet pour gérer l'activité de A à Z.",
                tech: ["Flutter", "Symfony", "GPS", "MySQL", "REST API"],
              },
              {
                name: "GMAXX",
                category: "Web",
                badge: "BTP",
                emoji: "🏗️",
                bg: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)",
                desc: "Outil de gestion BTP complet. Bons de commande, suivi d'avancement des travaux, factures de situation, gestion des documents, suivi des chantiers et tableau de bord analytique pour piloter l'activité.",
                tech: ["Symfony", "MySQL", "Chart.js", "REST API", "Hostinger"],
              },
              {
                name: "Francilienne Distribution",
                category: "App Mobile + Site de commande",
                badge: "Distribution",
                emoji: "📦",
                bg: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                desc: "Site de commande B2B et application mobile pour distributeur alimentaire. Les clients professionnels passent leurs commandes en ligne, suivent leurs livraisons et gèrent leur historique. Back-office complet pour l'équipe interne.",
                tech: ["Symfony", "Flutter", "MySQL", "PHP", "Bootstrap"],
              },
            ].map((project) => (
              <ScrollReveal key={project.name} variant="scale">
                <div className="card-hover group border rounded-2xl overflow-hidden transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <div className="h-32 flex items-center justify-center relative" style={{ background: project.bg }}>
                    <span className="text-5xl">{project.emoji}</span>
                    <span className="absolute top-3 left-3 text-xs font-semibold text-white px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                      {project.badge}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold" style={{ fontFamily: F }}>{project.name}</h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: "var(--bg-alt)", color: T }}>{project.category}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: T }}>{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-xs font-medium border" style={{ borderColor: B, color: T }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust / CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-16 sm:py-20 text-center" style={{ background: "linear-gradient(135deg, #0dca7a 0%, #0ba968 50%, #099b5a 100%)" }}>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "white", transform: "translate(-30%, 30%)" }} />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: F }}>
                  Rejoignez les entreprises qui automatisent avec nous
                </h2>
                <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                  Plus de 80 entreprises nous font confiance pour leurs agents IA. Pourquoi pas vous ?
                </p>
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                  {[
                    { val: "150+", label: "Projets livrés" },
                    { val: "99.9%", label: "Uptime garanti" },
                    { val: "< 24h", label: "Temps de réponse" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-bold text-white" style={{ fontFamily: F }}>{s.val}</div>
                      <div className="text-xs text-white/70">{s.label}</div>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 bg-white font-semibold px-8 py-3.5 rounded-xl text-sm transition hover:shadow-lg hover:opacity-95" style={{ color: "#0dca7a" }}>
                  Demander une démo gratuite
                  <span>→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
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
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-5 w-auto" />
            <span className="font-semibold" style={{ color: "var(--text)", fontFamily: F }}>emcorp</span>
          </div>
          <div className="flex gap-5">
            <a href="mailto:contact@emcorp.io" className="hover:text-[var(--text)] transition">contact@emcorp.io</a>
          </div>
          <span>© 2026 emcorp.io — Agence IA & Développement</span>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatWidget />
    </>
  );
}
