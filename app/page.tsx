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
        "description": "Agence IA & Développement. Chatbot IA, signature électronique eIDAS et facturation électronique 2026.",
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
        "description": "Agence IA & Développement basée à Paris. Chatbot IA, signature électronique et facturation électronique conforme DGFiP.",
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
              "name": "Chatbot IA",
              "description": "Assistant IA 24/7 pour restaurants, e-commerce et PME."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Signature électronique",
              "description": "Signature en ligne certifiée eIDAS, conforme."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Facturation électronique",
              "description": "Mise en conformité 2026 via PDP agréée DGFiP."
            }
          }
        ]
      }
    ]
  };

  // Icônes inline (équivalents Lucide : MessageCircle, FileSignature, FileText)
  const IconMessageCircle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
  const IconFileSignature = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v6h6" />
      <path d="M8 18h1" />
      <path d="M11 18c.667 0 2-.667 2-2s-1.333-2-2-2-2 .667-2 2" />
      <path d="M16 18c1.333-1 2-2 2-3" />
    </svg>
  );
  const IconFileText = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
      <path d="M8 9h2" />
    </svg>
  );

  // Produits phares
  const products = [
    {
      id: "chatbot",
      Icon: IconMessageCircle,
      title: "Chatbot IA",
      desc: "Automatisez votre SAV 24/7 avec des agents IA personnalisés pour restaurants, e-commerce et PME.",
      anchor: "#tarifs-chatbot",
    },
    {
      id: "signature",
      Icon: IconFileSignature,
      title: "Signature électronique",
      desc: "Signez vos contrats, devis et bons de commande en ligne. Certifié eIDAS, valeur juridique conforme.",
      anchor: "#tarifs-signature",
    },
    {
      id: "facturation",
      Icon: IconFileText,
      title: "Facturation électronique",
      desc: "Mise en conformité 2026 clé en main via notre PDP partenaire IOPOLE, agréée DGFiP.",
      anchor: "#tarifs-facturation",
    },
  ];

  // Tarifs Chatbot IA
  const chatbotPlans = [
    {
      name: "Starter",
      price: "77€",
      sub: "/mois",
      setup: "Setup : 500€",
      desc: "Un chatbot pour démarrer",
      features: [
        "Chatbot IA sur votre site",
        "Widget aux couleurs de votre marque",
        "Rapport email des conversations",
        "Support email",
        "Utilisateurs illimités",
      ],
      pop: false,
    },
    {
      name: "Business",
      price: "150€",
      sub: "/mois",
      setup: "Setup : 2 000€",
      desc: "Pour aller plus loin",
      features: [
        "Tout Starter +",
        "Chatbot WhatsApp intégré",
        "Automatisations workflows",
        "Connexion catalogue / CRM",
        "Dashboard analytics",
        "Support prioritaire",
      ],
      pop: true,
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      sub: "",
      setup: "",
      desc: "Solution sur mesure",
      features: [
        "Tout Business +",
        "Agent vocal téléphone",
        "Multi-canaux",
        "Instance dédiée",
        "SLA garanti",
        "Accompagnement dédié",
      ],
      pop: false,
    },
  ];

  // Tarifs Signature électronique
  const signaturePlans = [
    {
      name: "À l'unité",
      price: "3€",
      sub: "/signature",
      setup: "Sans abonnement",
      desc: "Payez ce que vous signez",
      features: [
        "Signature conforme eIDAS",
        "Envoi par email sécurisé",
        "Horodatage & traçabilité",
        "Archivage légal inclus",
        "Idéal ponctuel",
      ],
      pop: false,
    },
    {
      name: "Pack 50",
      price: "99€",
      sub: "/pack",
      setup: "Validité 12 mois",
      desc: "Pour un volume régulier",
      features: [
        "50 signatures incluses (1,98€/signature)",
        "Multi-signataires illimités",
        "Modèles de documents",
        "Relances automatiques",
        "Support prioritaire",
      ],
      pop: true,
    },
    {
      name: "Illimité",
      price: "49€",
      sub: "/mois",
      setup: "Sans engagement",
      desc: "Signatures sans limite",
      features: [
        "Signatures illimitées",
        "API & intégrations",
        "Workflows personnalisés",
        "Branding complet",
        "SLA & support dédié",
      ],
      pop: false,
    },
  ];

  // Tarifs Facturation électronique (repris depuis /facturation-electronique)
  const facturationPlans = [
    {
      name: "Essentiel",
      price: "19€",
      sub: "/mois",
      setup: "Setup offert",
      desc: "TPE et auto-entrepreneurs (< 50 factures/mois)",
      features: [
        "Jusqu'à 50 factures émises/mois",
        "Réception illimitée fournisseurs",
        "Formats Factur-X, UBL, CII",
        "E-reporting TVA automatisé",
        "Archivage légal 10 ans (NF 461)",
        "Support email sous 48h",
      ],
      pop: false,
    },
    {
      name: "Pro",
      price: "49€",
      sub: "/mois",
      setup: "Setup : 250€",
      desc: "PME jusqu'à 500 factures/mois",
      features: [
        "Jusqu'à 500 factures émises/mois",
        "Connecteurs Sage, EBP, Pennylane, Cegid",
        "API pour intégration ERP",
        "Signature électronique incluse",
        "Dashboard analytique (DSO, retards)",
        "Support prioritaire sous 24h",
      ],
      pop: true,
    },
    {
      name: "Business",
      price: "149€",
      sub: "/mois",
      setup: "Setup : sur devis",
      desc: "ETI et volumes importants",
      features: [
        "Volume illimité de factures",
        "API dédiée haute disponibilité",
        "Multi-sociétés, multi-SIRET",
        "Intégration ERP complexe (SAP, Odoo)",
        "SLA 99,9% garanti",
        "Support téléphonique 7j/7",
      ],
      pop: false,
    },
  ];

  const pricingGroups = [
    { id: "tarifs-chatbot", label: "Chatbot IA", note: "Utilisateurs illimités sur tous les plans.", plans: chatbotPlans },
    { id: "tarifs-signature", label: "Signature électronique", note: "Conforme eIDAS. Valeur juridique identique à une signature manuscrite.", plans: signaturePlans },
    { id: "tarifs-facturation", label: "Facturation électronique", note: "PDP agréée DGFiP. Certifications ISO 27001 & NF 461.", plans: facturationPlans },
  ];

  // Logos clients (placeholders — Sayn remplacera)
  const clientLogos = ["Client A", "Client B", "Client C", "Client D", "Client E", "Client F"];

  // Testimonials (placeholders)
  const testimonials = [
    {
      quote: "Depuis l'installation du chatbot, on gère 3x plus de commandes sans embaucher. Le SAV tourne même la nuit.",
      name: "Marc D.",
      role: "Gérant, restaurant indien",
    },
    {
      quote: "Signature électronique conforme, intégration rapide. Nos clients signent leurs devis en 2 minutes depuis leur téléphone.",
      name: "Sophie L.",
      role: "Directrice, cabinet de conseil",
    },
  ];

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
            <a href="#produits" className="hover:text-[var(--text)] transition">Produits</a>
            <a href="/signature" className="hover:text-[var(--text)] transition">Signature</a>
            <a href="/facturation-electronique" className="hover:text-[var(--text)] transition">Facturation élec.</a>
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

      {/* 1. Hero */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[13px] font-medium mb-8" style={{ borderColor: B, color: T }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: A }} />
              Chatbot IA · Signature · Facturation électronique 2026
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
                Démo gratuite
              </a>
              <a href="#produits" className="font-medium px-7 py-3.5 rounded-xl text-sm border transition hover:bg-[var(--bg-alt)]" style={{ borderColor: B, color: T }}>
                Voir nos produits
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

      {/* Marquee (conservé) */}
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

      {/* 2. 3 Produits phares */}
      <section id="produits" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Nos produits</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                3 solutions clés pour digitaliser votre activité
              </h2>
              <p className="mt-4 text-sm max-w-xl mx-auto leading-relaxed" style={{ color: T }}>
                Des produits prêts à l&apos;emploi, pensés pour les restaurants, e-commerçants et PME françaises.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {products.map((p) => (
              <ScrollReveal key={p.id} variant="scale">
                <div className="card-hover group h-full flex flex-col border rounded-2xl p-7 transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5" style={{ background: "var(--accent-bg)", color: A }}>
                    <p.Icon />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: T }}>{p.desc}</p>
                  <a href={p.anchor} className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5" style={{ color: A }}>
                    En savoir plus
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Ils nous ont fait confiance */}
      <section className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Références</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Ils nous ont fait confiance
              </h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-16">
            {clientLogos.map((name) => (
              <ScrollReveal key={name} variant="scale">
                <div
                  className="h-20 flex items-center justify-center border rounded-xl text-sm font-semibold transition-all grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                  style={{ borderColor: B, background: "var(--surface)", color: T, fontFamily: F }}
                >
                  {name}
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <ScrollReveal key={t.name} variant="scale">
                <div className="border rounded-2xl p-7 h-full flex flex-col" style={{ borderColor: B, background: "var(--surface)" }}>
                  <div className="text-3xl leading-none mb-3" style={{ color: A, fontFamily: F }}>&ldquo;</div>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: T }}>{t.quote}</p>
                  <div className="pt-4" style={{ borderTop: `1px solid ${B}` }}>
                    <div className="font-semibold text-sm" style={{ fontFamily: F }}>{t.name}</div>
                    <div className="text-xs" style={{ color: TL }}>{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Comment ça marche */}
      <section id="process" className="py-24 px-6">
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
              { n: "1", title: "Audit", desc: "Appel de cadrage gratuit. On comprend votre besoin, vos outils existants et vos contraintes en 15 minutes." },
              { n: "2", title: "Développement", desc: "En 2 à 5 jours, on configure votre solution : chatbot entraîné avec vos données, signature paramétrée, PDP connectée." },
              { n: "3", title: "Déploiement & Support", desc: "Mise en ligne, formation de vos équipes, suivi continu. Support réactif sous 24h en jour ouvré." },
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

      {/* 5. Tarifs par produit */}
      <section id="tarifs" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Tarifs</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Simple. Transparent. Sans engagement.
              </h2>
              <p className="mt-3 text-sm" style={{ color: T }}>
                3 produits, 3 grilles tarifaires. Choisissez celle qui correspond à votre besoin.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-20">
            {pricingGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <ScrollReveal>
                  <div className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: F }}>
                      <span style={{ color: A }}>·</span> {group.label}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: TL }}>{group.note}</p>
                  </div>
                </ScrollReveal>
                <StaggerContainer className="grid md:grid-cols-3 gap-5">
                  {group.plans.map((p) => (
                    <ScrollReveal key={`${group.id}-${p.name}`} variant="scale">
                      <div className={`card-hover border rounded-2xl p-7 relative h-full flex flex-col ${p.pop ? "ring-2" : ""}`} style={{ borderColor: p.pop ? A : B, background: "var(--surface)" }}>
                        {p.pop && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: A }}>Recommandé</div>
                        )}
                        <h4 className="font-bold text-lg" style={{ fontFamily: F }}>{p.name}</h4>
                        <p className="text-xs mt-1" style={{ color: TL }}>{p.desc}</p>
                        <div className="mt-5 flex items-baseline gap-1">
                          <span className="text-3xl font-bold" style={{ fontFamily: F }}>{p.price}</span>
                          <span className="text-sm" style={{ color: TL }}>{p.sub}</span>
                        </div>
                        {p.setup && <p className="text-xs mt-1" style={{ color: TL }}>{p.setup}</p>}
                        <a href="#contact" className={`block w-full text-center mt-6 py-2.5 rounded-lg text-sm font-semibold transition ${p.pop ? "text-white hover:opacity-90 hover:shadow-lg" : "border hover:bg-[var(--bg-alt)]"}`} style={p.pop ? { background: A } : { borderColor: B, color: T }}>
                          {p.price === "Sur devis" ? "Nous contacter" : "Commencer"}
                        </a>
                        <ul className="mt-6 pt-5 space-y-2.5 flex-1" style={{ borderTop: `1px solid ${B}` }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: F }}>Questions fréquentes</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              { q: "Combien de temps pour installer un chatbot ?", a: "Entre 2 et 5 jours ouvrés selon la complexité. Un chatbot FAQ basique est opérationnel en 48h." },
              { q: "L'IA remplace-t-elle mes employés ?", a: "Non. Elle gère 80% des questions répétitives et transfère les cas complexes à votre équipe." },
              { q: "La signature électronique a-t-elle une vraie valeur légale ?", a: "Oui. Nos signatures sont conformes au règlement eIDAS et ont la même valeur juridique qu'une signature manuscrite. Horodatage et traçabilité inclus." },
              { q: "Qu'est-ce qu'une PDP pour la facturation électronique ?", a: "Une Plateforme de Dématérialisation Partenaire agréée par la DGFiP. Nous nous appuyons sur IOPOLE, PDP agréée, pour garantir la conformité à la réforme 2026." },
              { q: "Suis-je concerné par la facturation électronique en 2026 ?", a: "Toutes les entreprises françaises assujetties à la TVA doivent pouvoir recevoir des factures électroniques dès le 1er septembre 2026. L'émission se généralisera progressivement." },
              { q: "Mes données sont-elles sécurisées ?", a: "Oui. Hébergement en France, certifications ISO 27001 et NF 461 pour l'archivage, aucun partage avec des tiers." },
              { q: "Puis-je tester gratuitement ?", a: "Absolument. Démo personnalisée gratuite avec vos propres données, sans carte bancaire." },
              { q: "L'IA répond-elle n'importe quoi ?", a: "Non. Si elle ne sait pas, elle propose de contacter un humain. Zéro hallucination." },
            ].map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 60}>
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
      <section id="contact" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
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
