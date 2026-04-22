import type { Metadata } from "next";
import ScrollReveal from "../components/ScrollReveal";
import StaggerContainer from "../components/StaggerContainer";
import MobileNav from "../components/MobileNav";
import ContactForm from "../components/ContactForm";
import ChatWidget from "../components/ChatWidget";

export const metadata: Metadata = {
  title: "Facturation électronique 2026 — PDP agréée DGFiP | emcorp.io",
  description:
    "Mise en conformité facturation électronique 2026-2027 pour PME et TPE. Plateforme agréée DGFiP propulsée par IOPOLE : émission, réception, e-reporting, archivage 10 ans. Accompagnement clé en main.",
  openGraph: {
    title: "Facturation électronique 2026 — PDP agréée DGFiP | emcorp.io",
    description:
      "Mise en conformité facturation électronique pour PME/TPE : PDP agréée DGFiP, Factur-X, e-reporting TVA, archivage légal, accompagnement humain.",
    url: "https://emcorp.io/facturation-electronique",
    siteName: "emcorp.io",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "https://emcorp.io/facturation-electronique" },
};

export default function FacturationElectroniquePage() {
  const F = "var(--font-display)";
  const T = "var(--text-sub)";
  const TL = "var(--text-light)";
  const A = "var(--accent)";
  const B = "var(--border)";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Facturation électronique 2026 — PDP agréée DGFiP",
    "provider": {
      "@type": "Organization",
      "name": "emcorp.io",
      "url": "https://emcorp.io",
    },
    "areaServed": { "@type": "Country", "name": "France" },
    "description":
      "Mise en conformité facturation électronique pour PME et TPE via partenariat avec IOPOLE, Plateforme de Dématérialisation Partenaire agréée DGFiP.",
    "offers": [
      { "@type": "Offer", "name": "Essentiel", "priceCurrency": "EUR", "price": "19" },
      { "@type": "Offer", "name": "Pro", "priceCurrency": "EUR", "price": "49" },
      { "@type": "Offer", "name": "Business", "priceCurrency": "EUR", "price": "149" },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'une PDP (Plateforme de Dématérialisation Partenaire) ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Une PDP, désormais appelée Plateforme Agréée (PA), est une plateforme privée immatriculée par la DGFiP, habilitée à émettre, recevoir et transmettre les factures électroniques ainsi que les données de e-reporting à l'administration fiscale." }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les dates d'entrée en vigueur ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Au 1er septembre 2026, toutes les entreprises doivent être capables de recevoir des factures électroniques et les grandes entreprises et ETI doivent les émettre. Au 1er septembre 2027, l'obligation d'émission s'étend aux PME, TPE et micro-entreprises." }
      },
      {
        "@type": "Question",
        "name": "Puis-je continuer avec mes factures PDF ou Word ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Non. Les factures devront être structurées aux formats Factur-X, UBL ou CII et transmises via une plateforme agréée ou le portail public. Un PDF simple ne sera plus accepté entre professionnels en France." }
      },
      {
        "@type": "Question",
        "name": "Faut-il utiliser le portail public gratuit (PPF) ou une PDP ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Le PPF joue désormais un rôle d'annuaire et de concentrateur de données. Pour émettre et recevoir des factures, il faut obligatoirement une plateforme agréée. C'est cette plateforme qui assure la conformité, la traçabilité et l'archivage." }
      },
      {
        "@type": "Question",
        "name": "Combien de temps pour être opérationnel ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Entre 3 et 15 jours selon la formule et vos outils existants. Pour une PME standard avec un logiciel de facturation courant (Sage, EBP, Pennylane, etc.), le branchement se fait en moins d'une semaine." }
      },
      {
        "@type": "Question",
        "name": "Mes données sont-elles hébergées en France ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. L'infrastructure IOPOLE est hébergée en France, certifiée ISO 27001, avec archivage légal NF 461 (conservation 10 ans)." }
      },
      {
        "@type": "Question",
        "name": "Est-ce que je peux connecter mon logiciel de facturation actuel ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui, via API, connecteur direct ou import de fichier. Les principaux logiciels du marché sont compatibles : Sage, EBP, Cegid, Pennylane, Axonaut, Dolibarr, ainsi que les ERP métier." }
      },
      {
        "@type": "Question",
        "name": "Puis-je résilier à tout moment ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Les formules Essentiel et Pro sont sans engagement, résiliables au mois. La formule Business bénéficie d'un tarif préférentiel pour un engagement annuel." }
      }
    ]
  };

  const plans = [
    {
      name: "Essentiel",
      price: "19€",
      sub: "/mois",
      setup: "Setup offert",
      desc: "Pour TPE et auto-entrepreneurs (< 50 factures/mois)",
      pop: false,
      features: [
        "Jusqu'à 50 factures émises/mois",
        "Réception illimitée des factures fournisseurs",
        "Formats Factur-X, UBL, CII",
        "Envoi automatique via PDP agréée DGFiP",
        "E-reporting TVA et transactions B2C",
        "Archivage légal 10 ans (NF 461)",
        "Portail web simple",
        "Support email sous 48h",
      ],
    },
    {
      name: "Pro",
      price: "49€",
      sub: "/mois",
      setup: "Setup : 250€",
      desc: "Pour PME (jusqu'à 500 factures/mois)",
      pop: true,
      features: [
        "Jusqu'à 500 factures émises/mois",
        "Réception illimitée",
        "Connecteurs Sage, EBP, Pennylane, Cegid, Axonaut",
        "API pour intégration ERP sur mesure",
        "Signature électronique des factures",
        "Tableau de bord analytique (DSO, retards, TVA)",
        "Multi-utilisateurs, gestion des rôles",
        "Accompagnement personnalisé au démarrage",
        "Support prioritaire sous 24h",
      ],
    },
    {
      name: "Business",
      price: "149€",
      sub: "/mois",
      setup: "Setup : sur devis",
      desc: "Pour ETI et volumes importants (1 500+ factures/mois)",
      pop: false,
      features: [
        "Volume illimité de factures",
        "API dédiée haute disponibilité",
        "Multi-sociétés, multi-SIRET",
        "Intégration ERP complexe (SAP, Odoo, Sage X3)",
        "Conformité inter-pays (EU Peppol)",
        "SLA 99,9% garanti par contrat",
        "Référent technique dédié",
        "Formation équipe sur site",
        "Support téléphonique 7j/7",
      ],
    },
  ];

  const features = [
    {
      emoji: "📤",
      title: "Émission conforme",
      desc: "Vos factures sortent au format Factur-X, UBL ou CII, transmises automatiquement à vos clients via le canal PDP-PPF.",
    },
    {
      emoji: "📥",
      title: "Réception centralisée",
      desc: "Toutes vos factures fournisseurs arrivent dans un seul portail, indexées, validables en un clic, exportables vers votre compta.",
    },
    {
      emoji: "🧾",
      title: "E-reporting automatisé",
      desc: "Déclaration automatique à la DGFiP des données de TVA et des transactions B2C. Plus de saisie manuelle.",
    },
    {
      emoji: "🗄️",
      title: "Archivage légal 10 ans",
      desc: "Conservation légale NF 461 des factures pendant 10 ans, consultables à tout moment, opposables en cas de contrôle.",
    },
    {
      emoji: "🔌",
      title: "Connecteurs logiciels",
      desc: "Branchement direct avec Sage, EBP, Cegid, Pennylane, Axonaut, Dolibarr, Odoo, ou votre ERP via API.",
    },
    {
      emoji: "✍️",
      title: "Signature électronique",
      desc: "Signez numériquement vos factures et devis avec valeur légale eIDAS. Intégré à la plateforme sans surcoût.",
    },
    {
      emoji: "🇫🇷",
      title: "Hébergement France",
      desc: "Infrastructure hébergée en France, certifiée ISO 27001. Vos données ne quittent jamais le territoire.",
    },
    {
      emoji: "🧑‍💼",
      title: "Accompagnement humain",
      desc: "Un contact dédié pour le paramétrage, la migration et les questions. On ne vous laisse pas seul face à la réforme.",
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: B, background: "rgba(250,250,248,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo-icon-green.svg" alt="emcorp" className="h-7 w-auto" />
            <span className="font-bold tracking-tight" style={{ fontFamily: F }}>emcorp</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium" style={{ color: T }}>
            <a href="/#services" className="hover:text-[var(--text)] transition">Services</a>
            <a href="/#expertises" className="hover:text-[var(--text)] transition">Expertises</a>
            <a href="/signature" className="hover:text-[var(--text)] transition">Signature</a>
            <a href="/facturation-electronique" className="hover:text-[var(--text)] transition" style={{ color: A }}>Facturation élec.</a>
            <a href="/#tarifs" className="hover:text-[var(--text)] transition">Tarifs</a>
            <a href="/#faq" className="hover:text-[var(--text)] transition">FAQ</a>
          </div>
          <a href="#contact" className="hidden md:inline-flex text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition hover:opacity-90" style={{ background: A }}>
            Demander un devis
          </a>
          <MobileNav />
        </div>
      </nav>

      {/* Urgency banner */}
      <div className="border-b" style={{ borderColor: B, background: "linear-gradient(90deg, rgba(245,158,11,0.08), rgba(239,68,68,0.08))" }}>
        <div className="max-w-6xl mx-auto px-6 py-2.5 text-[13px] font-medium flex items-center justify-center gap-2 flex-wrap text-center">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#f59e0b" }} />
          <span style={{ color: "var(--text)" }}>Échéance légale : 1er septembre 2026 — toutes les entreprises doivent pouvoir recevoir des factures électroniques</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-[13px] font-medium mb-8" style={{ borderColor: B, color: T }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: A }} />
              Infrastructure propulsée par IOPOLE, PDP agréée DGFiP
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight" style={{ fontFamily: F }}>
              Mise en conformité<br />
              <span style={{ color: A }}>facturation électronique 2026</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: T }}>
              On installe, on paramètre et on vous forme à la réforme obligatoire en France.
              Émission, réception, e-reporting, archivage légal — clé en main pour PME et TPE.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={450}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              <a href="#contact" className="text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition hover:opacity-90 hover:shadow-lg" style={{ background: A }}>
                Demander un devis
              </a>
              <a href="#tarifs" className="font-medium px-7 py-3.5 rounded-xl text-sm border transition hover:bg-[var(--bg-alt)]" style={{ borderColor: B, color: T }}>
                Voir les tarifs
              </a>
            </div>
          </ScrollReveal>
        </div>

        <StaggerContainer className="max-w-3xl mx-auto mt-16 flex flex-wrap justify-center gap-10">
          {[
            { icon: "📅", val: "Sept. 2026", sub: "Échéance réception" },
            { icon: "📅", val: "Sept. 2027", sub: "Émission PME/TPE" },
            { icon: "✅", val: "DGFiP", sub: "Plateforme agréée" },
            { icon: "🇫🇷", val: "100%", sub: "Hébergé en France" },
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

      {/* La loi en clair */}
      <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>La réforme</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Ce que la loi impose, sans le jargon
              </h2>
              <p className="mt-4 text-sm max-w-xl mx-auto leading-relaxed" style={{ color: T }}>
                La réforme généralise l&apos;échange de factures électroniques entre professionnels en France. Toute entreprise assujettie à la TVA est concernée.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-5">
            {[
              {
                date: "1er septembre 2026",
                title: "Obligation de réception",
                desc: "Toutes les entreprises, même les plus petites, doivent pouvoir recevoir les factures électroniques de leurs fournisseurs. Les grandes entreprises et ETI commencent à émettre.",
                badge: "Vague 1",
              },
              {
                date: "1er septembre 2027",
                title: "Obligation d'émission PME/TPE",
                desc: "L'obligation d'émettre ses factures au format électronique s'étend à toutes les PME, TPE, micro-entreprises et auto-entrepreneurs.",
                badge: "Vague 2",
              },
            ].map((w) => (
              <ScrollReveal key={w.date} variant="scale">
                <div className="card-hover border rounded-2xl p-7 transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "var(--accent-bg)", color: A }}>
                      {w.badge}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: TL }}>{w.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: F }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{w.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="mt-8 border rounded-2xl p-6 text-sm leading-relaxed" style={{ borderColor: B, background: "var(--surface)", color: T }}>
              <strong style={{ color: "var(--text)", fontFamily: F }}>Bon à savoir — </strong>
              Le Portail Public de Facturation (PPF) joue un rôle d&apos;annuaire et de concentrateur des données.
              Pour émettre et recevoir des factures, vous devez obligatoirement passer par une Plateforme Agréée (PA, ex-PDP) comme IOPOLE.
              <br />
              <a href="https://www.impots.gouv.fr/node/13676" target="_blank" rel="noopener noreferrer" className="underline font-medium mt-2 inline-block" style={{ color: A }}>
                Source officielle impots.gouv.fr →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="left">
            <div className="max-w-xl mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Fonctionnalités</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                Tout ce qu&apos;il vous faut, dans une seule plateforme
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: T }}>
                On fournit l&apos;infrastructure technique, le paramétrage, la formation et le support. Vous continuez à facturer comme avant, en conformité.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <ScrollReveal key={f.title} variant="scale">
                <div className="card-hover border rounded-2xl p-6 h-full transition-all hover:border-[var(--accent)]/30" style={{ borderColor: B, background: "var(--surface)" }}>
                  <span className="text-3xl mb-4 block">{f.emoji}</span>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: F }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-24 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Tarifs</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                3 formules, adaptées à votre volume
              </h2>
              <p className="mt-3 text-sm" style={{ color: T }}>
                Prix indicatifs HT. Sans engagement sur Essentiel et Pro. Tarifs de lancement susceptibles d&apos;évoluer.
              </p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {plans.map((p) => (
              <ScrollReveal key={p.name} variant="scale">
                <div className={`card-hover border rounded-2xl p-7 relative h-full flex flex-col ${p.pop ? "ring-2" : ""}`} style={{ borderColor: p.pop ? A : B, background: "var(--surface)" }}>
                  {p.pop && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: A }}>
                      Recommandé PME
                    </div>
                  )}
                  <h3 className="font-bold text-lg" style={{ fontFamily: F }}>{p.name}</h3>
                  <p className="text-xs mt-1" style={{ color: TL }}>{p.desc}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-3xl font-bold" style={{ fontFamily: F }}>{p.price}</span>
                    <span className="text-sm" style={{ color: TL }}>{p.sub}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: TL }}>{p.setup}</p>
                  <a href="#contact" className={`block w-full text-center mt-6 py-2.5 rounded-lg text-sm font-semibold transition ${p.pop ? "text-white hover:opacity-90 hover:shadow-lg" : "border hover:bg-[var(--bg-alt)]"}`} style={p.pop ? { background: A } : { borderColor: B, color: T }}>
                    Demander un devis
                  </a>
                  <ul className="mt-6 pt-5 space-y-2.5 flex-1" style={{ borderTop: `1px solid ${B}` }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: T }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: A }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <p className="text-center text-xs mt-8 max-w-2xl mx-auto" style={{ color: TL }}>
              Volume hors forfait facturé 0,25€ par facture émise. Tous les tarifs incluent l&apos;accès PDP agréée DGFiP, l&apos;archivage légal 10 ans et le support. Certifications : ISO 27001, NF 461.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>Comment ça marche</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: F }}>
                De votre appel à la première facture électronique
              </h2>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-4 gap-6">
            {[
              { n: "1", title: "Audit gratuit", desc: "On analyse votre flux actuel (logiciel de facturation, volume, spécificités métier) en 30 minutes." },
              { n: "2", title: "Paramétrage", desc: "On configure votre PDP, on connecte votre logiciel comptable ou ERP, on importe vos clients." },
              { n: "3", title: "Formation", desc: "Session de prise en main de 1h avec vos équipes. Tous vos cas d'usage couverts." },
              { n: "4", title: "Mise en production", desc: "Première facture électronique envoyée. Support réactif en cas de question." },
            ].map((step) => (
              <ScrollReveal key={step.n}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl text-xl font-bold text-white mb-4 transition-transform hover:scale-110" style={{ background: A, fontFamily: F }}>
                    {step.n}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: F }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Partner IOPOLE */}
      <section className="py-20 px-6" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="border rounded-2xl p-8 sm:p-10" style={{ borderColor: B, background: "var(--surface)" }}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0" style={{ background: "var(--accent-bg)", color: A, fontFamily: F }}>
                  IO
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold mb-1" style={{ color: A }}>Notre partenaire technique</p>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: F }}>
                    Infrastructure propulsée par IOPOLE
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: T }}>
                    IOPOLE est une Plateforme Agréée (PA, ex-PDP) immatriculée par la DGFiP, conforme aux exigences techniques du PPF.
                    Nous assurons le lien humain : accompagnement, paramétrage, formation, support francophone.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold mb-2" style={{ color: A }}>FAQ</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: F }}>Questions fréquentes</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {[
              { q: "Qu'est-ce qu'une PDP (Plateforme de Dématérialisation Partenaire) ?", a: "Une PDP, désormais appelée Plateforme Agréée (PA), est une plateforme privée immatriculée par la DGFiP, habilitée à émettre, recevoir et transmettre les factures électroniques ainsi que les données de e-reporting à l'administration fiscale." },
              { q: "Quelles sont les dates d'entrée en vigueur ?", a: "1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques, et les grandes entreprises et ETI doivent commencer à émettre. 1er septembre 2027 : l'obligation d'émission s'étend aux PME, TPE, micro-entreprises et auto-entrepreneurs." },
              { q: "Puis-je continuer avec mes factures PDF ou Word ?", a: "Non. Les factures devront être structurées aux formats Factur-X, UBL ou CII et transmises via une Plateforme Agréée ou le portail public. Un PDF simple envoyé par email ne sera plus accepté entre professionnels assujettis à la TVA en France." },
              { q: "Faut-il utiliser le PPF gratuit ou une PDP ?", a: "Le PPF (Portail Public de Facturation) joue désormais un rôle d'annuaire et de concentrateur de données vers la DGFiP. Pour émettre et recevoir des factures, il faut obligatoirement passer par une Plateforme Agréée. C'est elle qui assure la conformité, la traçabilité et l'archivage." },
              { q: "Combien de temps pour être opérationnel ?", a: "Entre 3 et 15 jours selon la formule et vos outils existants. Pour une PME standard avec un logiciel de facturation courant (Sage, EBP, Pennylane, Axonaut…), le branchement prend moins d'une semaine." },
              { q: "Mes données sont-elles hébergées en France ?", a: "Oui. L'infrastructure IOPOLE est hébergée en France, certifiée ISO 27001, avec archivage légal NF 461 (conservation 10 ans). Vos données ne quittent jamais le territoire." },
              { q: "Puis-je connecter mon logiciel de facturation actuel ?", a: "Oui, via API, connecteur direct ou import de fichier. Les principaux logiciels du marché sont compatibles : Sage, EBP, Cegid, Pennylane, Axonaut, Dolibarr, Odoo, ainsi que les ERP métier sur mesure." },
              { q: "Puis-je résilier à tout moment ?", a: "Les formules Essentiel et Pro sont sans engagement, résiliables au mois. La formule Business bénéficie d'un tarif préférentiel pour un engagement annuel, négociable selon votre volume." },
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

      {/* CTA banner */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden px-8 py-14 sm:px-14 sm:py-16 text-center" style={{ background: "linear-gradient(135deg, #0dca7a 0%, #0ba968 50%, #099b5a 100%)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "white", transform: "translate(-30%, 30%)" }} />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: F }}>
                  Ne prenez pas de retard sur septembre 2026
                </h2>
                <p className="text-white/85 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                  Réservez votre audit gratuit de 30 minutes. On vérifie votre niveau de conformité et on vous propose le bon plan.
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 bg-white font-semibold px-8 py-3.5 rounded-xl text-sm transition hover:shadow-lg hover:opacity-95" style={{ color: "#0dca7a" }}>
                  Réserver mon audit gratuit
                  <span>→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <ScrollReveal variant="scale">
          <div className="max-w-xl mx-auto border rounded-3xl p-8 sm:p-12" style={{ borderColor: B, background: "var(--surface)" }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: F }}>
                Passez à la <span style={{ color: A }}>facturation électronique</span>
              </h2>
              <p className="text-sm" style={{ color: T }}>
                Décrivez votre activité et votre volume de factures. On revient vers vous sous 24h avec un devis personnalisé.
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

      <ChatWidget />
    </>
  );
}
