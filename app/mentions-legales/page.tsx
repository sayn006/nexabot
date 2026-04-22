import Link from "next/link";

import LegalLayout from "@/app/components/LegalLayout";

export const metadata = {
  title: "Mentions legales — emcorp.io",
  description:
    "Mentions legales du site emcorp.io : editeur, hebergeur, propriete intellectuelle, credits.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      title="Mentions legales"
      subtitle="Informations reglementaires du site emcorp.io"
      effectiveDate="22 avril 2026"
    >
      <p>
        Conformement aux dispositions de l&apos;article 6-III de la loi n&deg;2004-575 du 21 juin 2004 pour la
        confiance dans l&apos;economie numerique (LCEN), il est porte a la connaissance des utilisateurs et
        visiteurs du site <a href="https://emcorp.io">emcorp.io</a> les informations suivantes.
      </p>

      <h2>1. Editeur du site</h2>
      <ul>
        <li><strong>Denomination :</strong> emcorp.io</li>
        <li><strong>Forme juridique :</strong> [FORME JURIDIQUE A COMPLETER — SAS / SARL / EI]</li>
        <li><strong>SIREN :</strong> [SIREN A COMPLETER]</li>
        <li><strong>SIRET :</strong> [SIRET A COMPLETER]</li>
        <li><strong>N&deg; de TVA intracommunautaire :</strong> [TVA A COMPLETER]</li>
        <li><strong>Capital social :</strong> [CAPITAL A COMPLETER]</li>
        <li><strong>Siege social :</strong> Paris, France</li>
        <li><strong>E-mail :</strong> <a href="mailto:contact@emcorp.io">contact@emcorp.io</a></li>
        <li><strong>Telephone :</strong> <a href="tel:+33643165273">06 43 16 52 73</a></li>
        <li><strong>Directeur de la publication :</strong> Sayn Punithan (Sahinthan Punithanathan)</li>
      </ul>

      <h2>2. Hebergeur</h2>
      <p>Le site est heberge sur une infrastructure auto-administree (Coolify) operee en France :</p>
      <ul>
        <li><strong>Hebergeur :</strong> [HEBERGEUR A COMPLETER — OVHcloud / Scaleway / Hetzner]</li>
        <li><strong>Adresse :</strong> [ADRESSE HEBERGEUR A COMPLETER]</li>
        <li><strong>Site :</strong> [URL HEBERGEUR A COMPLETER]</li>
        <li><strong>Zone de traitement :</strong> Union europeenne (UE)</li>
      </ul>

      <h2>3. Propriete intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu du site (textes, graphismes, logos, icones, images, sons, videos, code
        source) est la propriete exclusive de l&apos;editeur ou fait l&apos;objet d&apos;une autorisation
        d&apos;utilisation. Toute reproduction, representation, modification, publication, adaptation de
        tout ou partie des elements du site, quel que soit le moyen ou le procede utilise, est interdite,
        sauf autorisation ecrite prealable.
      </p>
      <p>
        Toute exploitation non autorisee du site ou de l&apos;un quelconque des elements qu&apos;il contient
        sera consideree comme constitutive d&apos;une contrefacon et poursuivie conformement aux dispositions
        des articles L.335-2 et suivants du Code de la Propriete Intellectuelle.
      </p>

      <h2>4. Credits et technologies</h2>
      <p>Le site emcorp.io est propulse par :</p>
      <ul>
        <li><strong>Next.js 15</strong> (Vercel, Inc.) — framework React.</li>
        <li><strong>Symfony 7</strong> (SensioLabs) — backend PHP pour les APIs.</li>
        <li><strong>DocuSeal</strong> — signature electronique open-source (licence AGPLv3).</li>
        <li><strong>Stripe Payments Europe, Ltd.</strong> — traitement des paiements.</li>
        <li><strong>Resend, Inc.</strong> — envoi des e-mails transactionnels.</li>
        <li><strong>Coolify</strong> — orchestration de deploiement.</li>
      </ul>

      <h2>5. Donnees personnelles</h2>
      <p>
        Le traitement des donnees personnelles est detaille dans notre{" "}
        <Link href="/confidentialite">politique de confidentialite</Link>. Pour toute question relative a
        vos donnees, ecrivez-nous a <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Les informations sur l&apos;utilisation des cookies sont disponibles sur la page{" "}
        <Link href="/cookies">Cookies</Link>.
      </p>

      <h2>7. Conditions d&apos;utilisation</h2>
      <p>
        L&apos;usage du service de signature electronique est regi par des{" "}
        <Link href="/signature/cgu">Conditions Generales d&apos;Utilisation (CGU)</Link> et des{" "}
        <Link href="/signature/cgv">Conditions Generales de Vente (CGV)</Link> specifiques.
      </p>

      <h2>8. Signalement de contenu illicite</h2>
      <p>
        Tout internaute constatant la presence d&apos;un contenu manifestement illicite sur le site peut le
        signaler a l&apos;editeur a l&apos;adresse <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les presentes mentions legales sont soumises au droit francais. En cas de litige, les tribunaux
        francais seront seuls competents.
      </p>
    </LegalLayout>
  );
}
