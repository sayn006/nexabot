import Link from "next/link";

import LegalLayout from "@/app/components/LegalLayout";

export const metadata = {
  title: "Politique de confidentialite — emcorp.io",
  description:
    "Politique de confidentialite et de protection des donnees personnelles d'emcorp.io, conforme au RGPD et a la loi Informatique et Libertes.",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Politique de confidentialite"
      subtitle="Protection des donnees personnelles chez emcorp.io — conforme RGPD"
      version="1.0"
      effectiveDate="22 avril 2026"
    >
      <p>
        La presente politique decrit la maniere dont emcorp.io (ci-apres &laquo; <strong>nous</strong> &raquo;)
        collecte, utilise et protege vos donnees personnelles, conformement au Reglement (UE) 2016/679
        (&laquo; <strong>RGPD</strong> &raquo;) et a la loi n&deg;78-17 du 6 janvier 1978 modifiee.
      </p>

      <h2>1. Responsable de traitement</h2>
      <p>
        Le responsable de traitement des donnees personnelles collectees via les sites{" "}
        <a href="https://emcorp.io">emcorp.io</a> et <a href="https://emcorp.io/signature">emcorp.io/signature</a>{" "}
        est :
      </p>
      <ul>
        <li><strong>emcorp.io</strong></li>
        <li>Adresse : Paris, France</li>
        <li>E-mail : <a href="mailto:contact@emcorp.io">contact@emcorp.io</a></li>
        <li>Directeur de la publication : Sayn Punithan</li>
      </ul>
      <p>
        emcorp.io n&apos;a pas designe de Delegue a la Protection des Donnees (DPO), la nature et l&apos;ampleur
        des traitements ne le rendant pas obligatoire. Toute demande relative aux donnees personnelles peut
        etre adressee a <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
      </p>

      <h2>2. Donnees collectees</h2>
      <h3>2.1 Site institutionnel emcorp.io</h3>
      <ul>
        <li>
          <strong>Formulaire de contact</strong> : nom, prenom, e-mail, entreprise, message.
        </li>
        <li>
          <strong>Navigation</strong> : pages visitees, duree de visite, navigateur, systeme
          d&apos;exploitation, adresse IP partielle (anonymisee).
        </li>
      </ul>
      <h3>2.2 Service de signature electronique</h3>
      <ul>
        <li>
          <strong>Compte Client</strong> : adresse e-mail, mot de passe (hashe bcrypt), raison sociale,
          SIRET (optionnel), date de creation.
        </li>
        <li>
          <strong>Donnees de facturation</strong> : identifiant client Stripe, montants, factures. Les
          donnees bancaires (numero de carte, CVV) ne sont <strong>jamais</strong> collectees par nos
          services — elles sont traitees directement par Stripe.
        </li>
        <li>
          <strong>Documents soumis a signature</strong> : fichiers PDF televerses par le Client, liste des
          signataires (nom, e-mail), statut, horodatages, adresses IP des signataires.
        </li>
        <li>
          <strong>Journaux techniques</strong> : logs de connexion, logs applicatifs (non nominatifs pour
          la plupart).
        </li>
      </ul>
      <h3>2.3 Chatbot / Widget de contact</h3>
      <p>
        Lorsque vous utilisez notre chatbot ou notre formulaire de contact, les conversations et messages
        sont collectes afin d&apos;etablir le dialogue, repondre a vos demandes et, le cas echeant, donner
        suite commercialement.
      </p>

      <h2>3. Finalites et bases legales</h2>
      <table>
        <thead>
          <tr>
            <th>Finalite</th>
            <th>Base legale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Creation et gestion du compte sur le service de signature</td>
            <td>Execution du contrat (art. 6.1.b RGPD)</td>
          </tr>
          <tr>
            <td>Facturation et encaissement</td>
            <td>Execution du contrat + obligation legale (art. 6.1.b et 6.1.c RGPD)</td>
          </tr>
          <tr>
            <td>Envoi et suivi des demandes de signature</td>
            <td>Execution du contrat (art. 6.1.b RGPD)</td>
          </tr>
          <tr>
            <td>Conservation des documents signes (10 ans)</td>
            <td>Obligation legale + interet legitime probatoire (art. 6.1.c et 6.1.f RGPD)</td>
          </tr>
          <tr>
            <td>Reponse aux demandes de contact</td>
            <td>Interet legitime (art. 6.1.f RGPD)</td>
          </tr>
          <tr>
            <td>Prospection commerciale B2B</td>
            <td>Interet legitime (art. 6.1.f RGPD), droit d&apos;opposition garanti</td>
          </tr>
          <tr>
            <td>Amelioration du site et statistiques anonymes</td>
            <td>Interet legitime (art. 6.1.f RGPD)</td>
          </tr>
          <tr>
            <td>Cookies strictement necessaires</td>
            <td>Execution du contrat (art. 6.1.b RGPD)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Destinataires des donnees</h2>
      <p>Vos donnees sont accessibles uniquement aux personnes habilitees d&apos;emcorp.io. Elles peuvent etre
      transmises aux sous-traitants techniques suivants, strictement dans le cadre de l&apos;execution du
      Service :</p>
      <ul>
        <li>
          <strong>Stripe Payments Europe, Ltd.</strong> (Irlande) — traitement des paiements.
        </li>
        <li>
          <strong>Resend, Inc.</strong> — envoi des e-mails transactionnels (relances de signature,
          notifications, factures).
        </li>
        <li>
          <strong>DocuSeal</strong> — moteur open-source de signature auto-heberge sur notre infrastructure
          (UE).
        </li>
        <li>
          <strong>Coolify / Hebergeur</strong> — hebergement des applications et des bases de donnees
          (voir mentions legales pour l&apos;adresse de l&apos;hebergeur).
        </li>
      </ul>
      <p>
        Aucune donnee n&apos;est cedee ni vendue a des tiers a des fins commerciales.
      </p>

      <h2>5. Transferts hors Union europeenne</h2>
      <p>
        L&apos;integralite des donnees traitees par le Service est hebergee dans l&apos;Union europeenne.
        Aucun transfert de donnees vers un pays tiers n&apos;est realise, hors cas exceptionnel dument
        encadre par des clauses contractuelles types (SCC) valideees par la Commission europeenne.
      </p>

      <h2>6. Durees de conservation</h2>
      <table>
        <thead>
          <tr>
            <th>Donnee</th>
            <th>Duree</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Compte Client (service signature)</td>
            <td>Duree du contrat + 3 ans apres cloture pour finalites commerciales</td>
          </tr>
          <tr>
            <td>Documents signes et dossier de preuve</td>
            <td>10 ans a compter de la signature (archivage legal)</td>
          </tr>
          <tr>
            <td>Factures et pieces comptables</td>
            <td>10 ans (obligation legale comptable)</td>
          </tr>
          <tr>
            <td>Donnees de prospection (leads non convertis)</td>
            <td>3 ans a compter du dernier contact</td>
          </tr>
          <tr>
            <td>Journaux techniques (logs)</td>
            <td>12 mois maximum</td>
          </tr>
          <tr>
            <td>Cookies</td>
            <td>13 mois maximum</td>
          </tr>
        </tbody>
      </table>

      <h2>7. Securite</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriees pour garantir un
        niveau de securite adapte au risque :
      </p>
      <ul>
        <li>chiffrement en transit (HTTPS/TLS 1.3) sur l&apos;ensemble des echanges ;</li>
        <li>hashage des mots de passe avec bcrypt (cout adaptatif) ;</li>
        <li>acces aux serveurs par cle SSH, absence d&apos;authentification par mot de passe ;</li>
        <li>sauvegardes automatiques chiffrees, testees regulierement ;</li>
        <li>segmentation reseau, parefeu et mises a jour de securite.</li>
      </ul>

      <h2>8. Vos droits</h2>
      <p>Vous disposez, sur les donnees vous concernant, des droits suivants :</p>
      <ul>
        <li><strong>Droit d&apos;acces</strong> : connaitre les donnees que nous traitons sur vous ;</li>
        <li><strong>Droit de rectification</strong> : corriger toute donnee inexacte ;</li>
        <li><strong>Droit d&apos;effacement</strong> (&laquo; droit a l&apos;oubli &raquo;), sous reserve des
          obligations legales de conservation ;</li>
        <li><strong>Droit a la limitation</strong> du traitement ;</li>
        <li><strong>Droit a la portabilite</strong> : recevoir vos donnees dans un format lisible ;</li>
        <li><strong>Droit d&apos;opposition</strong>, notamment a toute prospection ;</li>
        <li><strong>Directives post-mortem</strong> : vous pouvez definir le sort de vos donnees apres votre deces.</li>
      </ul>
      <p>
        Pour exercer ces droits, ecrivez-nous a <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>{" "}
        en joignant un justificatif d&apos;identite. Nous repondrons dans un delai maximum d&apos;un mois.
      </p>
      <p>
        En cas de reponse insatisfaisante ou en l&apos;absence de reponse, vous pouvez introduire une
        reclamation aupres de la <strong>Commission Nationale de l&apos;Informatique et des Libertes (CNIL)</strong> —
        3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{" "}
        <a href="https://www.cnil.fr">www.cnil.fr</a>.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Le site utilise uniquement les cookies strictement necessaires a son fonctionnement (session,
        preferences de langue, consentement cookies, panier Stripe). Pour plus de details, consultez la
        page <Link href="/cookies">Cookies</Link>.
      </p>

      <h2>10. Modifications</h2>
      <p>
        La presente politique peut etre modifiee a tout moment pour tenir compte d&apos;evolutions
        reglementaires, jurisprudentielles ou techniques. La version en vigueur est celle publiee sur
        cette page.
      </p>

      <h2>11. Contact</h2>
      <p>
        Pour toute question relative a la protection de vos donnees personnelles, ecrivez-nous a{" "}
        <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
      </p>
    </LegalLayout>
  );
}
