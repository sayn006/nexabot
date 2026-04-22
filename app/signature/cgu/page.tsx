import Link from "next/link";

import LegalLayout from "@/app/components/LegalLayout";

import { CGU_EFFECTIVE_DATE, CGU_VERSION } from "./constants";

export const metadata = {
  title: "Conditions Generales d'Utilisation — emcorp Signature",
  description:
    "Conditions generales d'utilisation du service de signature electronique emcorp.io. Signature electronique simple conforme au reglement eIDAS.",
};

export default function CguPage() {
  return (
    <LegalLayout
      title="Conditions Generales d'Utilisation"
      subtitle="Service de signature electronique emcorp.io"
      version={CGU_VERSION}
      effectiveDate={CGU_EFFECTIVE_DATE}
    >
      <h2>Preambule</h2>
      <p>
        Les presentes conditions generales d&apos;utilisation (ci-apres les &laquo; <strong>CGU</strong> &raquo;) regissent
        l&apos;utilisation du service de signature electronique edite par emcorp.io (ci-apres l&apos;&laquo; <strong>Editeur</strong> &raquo;)
        et accessible depuis le site <a href="https://emcorp.io/signature">https://emcorp.io/signature</a>.
      </p>
      <p>
        Toute utilisation du Service implique l&apos;acceptation pleine et entiere des presentes CGU par le Client.
        Le Client reconnait avoir pris connaissance des CGU au moment de son inscription et les avoir acceptees
        de maniere libre et eclairee.
      </p>
      <div className="callout">
        <strong>Information importante :</strong> le Service fournit une signature electronique &laquo; simple &raquo;
        au sens du Reglement eIDAS n&deg;910/2014, dont la valeur juridique est reconnue par l&apos;article 1366 du
        Code civil francais. Il ne s&apos;agit pas d&apos;une signature electronique qualifiee.
      </div>

      <h2>Article 1 — Definitions</h2>
      <p>Dans les presentes CGU, les termes ci-apres sont definis comme suit :</p>
      <ul>
        <li>
          <strong>Client</strong> : toute personne physique majeure ou personne morale qui cree un compte
          sur le Service pour emettre des demandes de signature.
        </li>
        <li>
          <strong>Utilisateur</strong> : toute personne physique utilisant le Service au nom et pour le
          compte du Client (salarie, prestataire, mandataire).
        </li>
        <li>
          <strong>Service</strong> : la plateforme en ligne de signature electronique mise a disposition
          par l&apos;Editeur sur <a href="https://emcorp.io/signature">emcorp.io/signature</a>, incluant
          l&apos;envoi de documents a signer, le suivi et l&apos;archivage.
        </li>
        <li>
          <strong>Signataire</strong> : toute personne physique destinataire d&apos;une demande de signature
          adressee par le Client via le Service.
        </li>
        <li>
          <strong>Document</strong> : fichier (PDF principalement) emis par le Client a fin de signature
          electronique par un ou plusieurs Signataires.
        </li>
        <li>
          <strong>Signature electronique simple</strong> : procede electronique permettant au Signataire de
          manifester son consentement, conforme au niveau 1 de classification eIDAS. Son admissibilite en
          preuve ne peut etre refusee au seul motif qu&apos;elle se presente sous forme electronique
          (article 25.1 du Reglement eIDAS).
        </li>
        <li>
          <strong>Compte</strong> : espace personnel accessible par identifiant et mot de passe via lequel
          le Client pilote le Service.
        </li>
      </ul>

      <h2>Article 2 — Objet</h2>
      <p>
        Les presentes CGU ont pour objet de definir les modalites et conditions dans lesquelles l&apos;Editeur
        met a disposition du Client le Service de signature electronique, ainsi que les droits et obligations
        de chaque partie.
      </p>

      <h2>Article 3 — Inscription et compte</h2>
      <h3>3.1 Creation du compte</h3>
      <p>
        L&apos;inscription au Service suppose la creation d&apos;un Compte par le Client. Le Client s&apos;engage a
        fournir des informations exactes, completes et a jour (raison sociale, adresse e-mail, mot de passe).
      </p>
      <h3>3.2 Identification</h3>
      <p>
        L&apos;acces au Compte s&apos;effectue par l&apos;adresse e-mail et le mot de passe choisis par le Client.
        Le Client est seul responsable de la confidentialite de ses identifiants. Toute action realisee sur
        le Compte est reputee l&apos;avoir ete par le Client.
      </p>
      <h3>3.3 Acceptation des CGU</h3>
      <p>
        La validation du formulaire d&apos;inscription vaut acceptation expresse des presentes CGU et de la{" "}
        <Link href="/confidentialite">politique de confidentialite</Link>. Cette acceptation est horodatee et
        archivee par l&apos;Editeur a titre de preuve.
      </p>

      <h2>Article 4 — Description du Service</h2>
      <p>Le Service permet au Client, depuis son Compte :</p>
      <ul>
        <li>de televerser des Documents (formats PDF, DOCX) et d&apos;en editer les zones de signature ;</li>
        <li>d&apos;emettre des demandes de signature vers un ou plusieurs Signataires, par e-mail ;</li>
        <li>de suivre en temps reel l&apos;etat des demandes (envoyee, ouverte, signee, annulee) ;</li>
        <li>de telecharger le Document signe au format PDF accompagne de son certificat d&apos;audit ;</li>
        <li>de conserver l&apos;historique de ses demandes pendant la duree legale ;</li>
        <li>d&apos;acceder, pour les Clients disposant d&apos;un abonnement, a des fonctionnalites avancees
          (modeles, relances automatiques, API).</li>
      </ul>
      <p>
        Le Service s&apos;appuie sur la solution open-source <strong>DocuSeal</strong>, auto-hebergee par
        l&apos;Editeur sur son infrastructure situee dans l&apos;Union europeenne.
      </p>

      <h2>Article 5 — Tarifs et modalites de facturation</h2>
      <h3>5.1 Grille tarifaire</h3>
      <p>Les tarifs en vigueur a la date d&apos;entree en vigueur des presentes CGU sont :</p>
      <table>
        <thead>
          <tr>
            <th>Formule</th>
            <th>Prix HT</th>
            <th>Engagement</th>
            <th>Inclus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A l&apos;unite</strong> (pay-per-use)</td>
            <td>3 € / signature</td>
            <td>Aucun</td>
            <td>Paiement a l&apos;acte, sans abonnement</td>
          </tr>
          <tr>
            <td><strong>Pack 50</strong></td>
            <td>99 € / pack (12 mois)</td>
            <td>Aucun</td>
            <td>50 signatures valables 12 mois</td>
          </tr>
          <tr>
            <td><strong>Illimite</strong></td>
            <td>49 € / mois</td>
            <td>Mensuel sans engagement</td>
            <td>Signatures en nombre illimite, API, support prioritaire</td>
          </tr>
        </tbody>
      </table>
      <p>
        Les prix sont indiques hors taxes. La TVA applicable (au taux legal en vigueur) est ajoutee sur
        les factures. Les tarifs sont susceptibles d&apos;evolution dans les conditions prevues a l&apos;article 16.
      </p>
      <h3>5.2 Paiement</h3>
      <p>
        Les paiements sont realises par carte bancaire via le prestataire <strong>Stripe Payments Europe, Ltd.</strong>.
        Aucune donnee bancaire n&apos;est stockee par l&apos;Editeur.
      </p>
      <h3>5.3 Abonnements — Prelevement et renouvellement</h3>
      <p>
        Les abonnements mensuels (formule &laquo; Illimite &raquo;) sont factures a terme a echoir. Ils sont
        renouveles par tacite reconduction chaque mois. Le Client peut resilier son abonnement a tout moment
        depuis son Compte, la resiliation prenant effet a la fin de la periode en cours. Aucun remboursement
        prorata temporis n&apos;est effectue.
      </p>
      <h3>5.4 Pack 50</h3>
      <p>
        Le Pack 50 est valable 12 mois a compter de l&apos;achat. Les signatures non consommees a l&apos;issue
        de cette periode sont perdues et ne donnent lieu a aucun remboursement.
      </p>
      <h3>5.5 Pay-per-use</h3>
      <p>
        La formule a l&apos;unite est facturee automatiquement a chaque signature effectivement realisee,
        via le moyen de paiement enregistre par le Client sur Stripe.
      </p>
      <h3>5.6 Defaut de paiement</h3>
      <p>
        En cas d&apos;echec de prelevement, l&apos;Editeur se reserve le droit de suspendre l&apos;acces au Service
        apres mise en demeure restee sans effet pendant 8 jours.
      </p>

      <h2>Article 6 — Valeur juridique de la signature electronique</h2>
      <p>
        Le Service produit une <strong>signature electronique simple</strong> au sens de l&apos;article 3.10
        du Reglement (UE) n&deg;910/2014 (eIDAS) du 23 juillet 2014.
      </p>
      <p>
        Conformement a l&apos;article 1366 du Code civil francais, l&apos;ecrit electronique a la meme force
        probante que l&apos;ecrit sur support papier, sous reserve que puisse etre dument identifiee la personne
        dont il emane et qu&apos;il soit etabli et conserve dans des conditions de nature a en garantir
        l&apos;integrite.
      </p>
      <p>
        Pour chaque signature, l&apos;Editeur genere un <strong>dossier de preuve</strong> comprenant :
      </p>
      <ul>
        <li>l&apos;horodatage de chaque etape (envoi, ouverture, signature) ;</li>
        <li>l&apos;adresse IP et le user-agent du Signataire ;</li>
        <li>le hash SHA-256 du Document signe ;</li>
        <li>le certificat d&apos;audit au format PDF joint au Document final.</li>
      </ul>
      <div className="callout">
        <strong>Limites :</strong> la signature fournie n&apos;est <strong>pas qualifiee</strong> au sens eIDAS.
        Elle n&apos;est pas adaptee aux actes pour lesquels la loi impose une signature qualifiee ou avancee
        (actes authentiques, actes notaries, mandats immobiliers specifiques, etc.). Il appartient au Client
        de s&apos;assurer que la signature electronique simple est suffisante pour son usage.
      </div>

      <h2>Article 7 — Obligations du Client</h2>
      <p>Le Client s&apos;engage a :</p>
      <ul>
        <li>fournir des informations exactes et les tenir a jour ;</li>
        <li>utiliser le Service conformement a la loi et aux bonnes mœurs ;</li>
        <li>
          n&apos;emettre des demandes de signature que pour des Documents qu&apos;il est en droit de soumettre
          a un tiers, dont il dispose des droits necessaires ;
        </li>
        <li>
          s&apos;abstenir de soumettre tout Document presentant un caractere illicite, diffamatoire, injurieux,
          contrefaisant, ou portant atteinte a des droits de tiers ;
        </li>
        <li>informer ses Signataires de l&apos;utilisation du Service et, le cas echeant, du traitement de
          leurs donnees personnelles ;</li>
        <li>prendre les mesures de securite raisonnables pour proteger ses identifiants ;</li>
        <li>regler les montants dus aux echeances prevues.</li>
      </ul>

      <h2>Article 8 — Obligations de l&apos;Editeur</h2>
      <p>L&apos;Editeur s&apos;engage a :</p>
      <ul>
        <li>
          mettre tout en œuvre pour assurer la disponibilite du Service (obligation de moyens, non de resultat) ;
        </li>
        <li>
          conserver les Documents signes, leur dossier de preuve et les metadonnees associees pendant
          une duree de <strong>10 ans</strong> a compter de la signature ;
        </li>
        <li>informer le Client en cas d&apos;incident de securite susceptible de l&apos;affecter ;</li>
        <li>heberger les donnees sur une infrastructure situee dans l&apos;Union europeenne ;</li>
        <li>respecter la reglementation applicable en matiere de donnees personnelles.</li>
      </ul>
      <p>
        Le Service est propose en mode &laquo; best-effort &raquo; : l&apos;Editeur ne garantit pas une
        disponibilite de 100%. Des interruptions planifiees peuvent avoir lieu, notamment pour maintenance.
      </p>
      <div className="callout">
        <strong>Archivage :</strong> la conservation effectuee par l&apos;Editeur ne constitue pas un
        archivage electronique probatoire qualifie au sens de la norme NF Z42-013 ou NF Z42-020. Pour un tel
        besoin, le Client doit recourir a un prestataire tiers de confiance qualifie.
      </div>

      <h2>Article 9 — Donnees personnelles</h2>
      <p>
        Le traitement des donnees personnelles dans le cadre du Service est decrit dans la{" "}
        <Link href="/confidentialite">politique de confidentialite</Link>, qui fait partie integrante des
        presentes CGU.
      </p>
      <p>
        Le Client agit en qualite de responsable de traitement pour les donnees des Signataires qu&apos;il
        soumet au Service. L&apos;Editeur intervient en tant que sous-traitant au sens de l&apos;article 28 du
        RGPD.
      </p>

      <h2>Article 10 — Propriete intellectuelle</h2>
      <p>
        Le Service, sa charte graphique, ses logos, ses textes et son code source sont la propriete
        exclusive de l&apos;Editeur ou de ses partenaires. Toute reproduction, representation, adaptation
        ou exploitation non autorisee est interdite.
      </p>
      <p>
        Le Client conserve l&apos;integralite des droits sur les Documents qu&apos;il televerse. Il concede a
        l&apos;Editeur une licence non exclusive, strictement limitee a l&apos;execution du Service et a la
        duree de conservation legale.
      </p>

      <h2>Article 11 — Responsabilite</h2>
      <p>
        La responsabilite de l&apos;Editeur ne peut etre engagee qu&apos;en cas de faute prouvee. Elle est
        limitee aux dommages directs, a l&apos;exclusion de tout dommage indirect (pertes de donnees, perte
        d&apos;exploitation, prejudice commercial, etc.).
      </p>
      <p>
        En tout etat de cause, la responsabilite totale de l&apos;Editeur, toutes causes confondues, est
        plafonnee au montant des sommes effectivement reglees par le Client au titre du Service au cours des
        douze (12) mois precedant le fait generateur.
      </p>
      <p>
        L&apos;Editeur ne saurait etre tenu responsable des consequences d&apos;un mauvais usage du Service par
        le Client, ni de l&apos;inadequation de la signature electronique simple a un cas d&apos;usage pour
        lequel une signature qualifiee serait requise.
      </p>

      <h2>Article 12 — Force majeure</h2>
      <p>
        Aucune partie ne pourra etre tenue responsable d&apos;un manquement a ses obligations resultant d&apos;un
        cas de force majeure au sens de l&apos;article 1218 du Code civil, incluant notamment : catastrophes
        naturelles, actes de guerre ou de terrorisme, greves generales, pannes massives d&apos;infrastructures
        reseau ou energetiques, decisions administratives contraignantes.
      </p>

      <h2>Article 13 — Resiliation</h2>
      <h3>13.1 Resiliation par le Client</h3>
      <p>
        Le Client peut resilier son Compte a tout moment depuis son espace personnel. La resiliation prend
        effet a la fin de la periode de facturation en cours.
      </p>
      <h3>13.2 Resiliation par l&apos;Editeur</h3>
      <p>
        En cas de manquement grave du Client a ses obligations (defaut de paiement, usage illicite, atteinte
        a la securite), l&apos;Editeur peut suspendre puis resilier le Compte de plein droit, apres mise en
        demeure restee sans effet pendant quinze (15) jours.
      </p>
      <h3>13.3 Effets de la resiliation</h3>
      <p>
        A l&apos;issue de la resiliation, le Client conserve l&apos;acces aux Documents deja signes pendant
        la duree de conservation legale (10 ans). Il peut a tout moment demander leur export au format PDF.
      </p>

      <h2>Article 14 — Droit applicable et litiges</h2>
      <p>
        Les presentes CGU sont regies par le <strong>droit francais</strong>.
      </p>
      <p>
        En cas de litige, les parties s&apos;engagent a rechercher une solution amiable prealable. A defaut,
        le Client consommateur peut recourir gratuitement au service de mediation de la consommation
        (<strong>CNPM Mediation Consommation</strong>, 27 avenue de la Liberation, 42400 Saint-Chamond —{" "}
        <a href="https://cnpm-mediation-consommation.eu">cnpm-mediation-consommation.eu</a>).
      </p>
      <p>
        A defaut de resolution amiable, les litiges seront portes devant les <strong>tribunaux competents
        de Paris</strong>, sous reserve des dispositions legales imperatives applicables aux consommateurs.
      </p>

      <h2>Article 15 — Duree</h2>
      <p>
        Les presentes CGU sont conclues pour une duree indeterminee. Elles prennent effet a compter de leur
        acceptation par le Client et demeurent applicables tant que celui-ci dispose d&apos;un Compte actif.
      </p>

      <h2>Article 16 — Modification des CGU</h2>
      <p>
        L&apos;Editeur se reserve le droit de modifier les presentes CGU a tout moment. Toute modification
        substantielle sera notifiee au Client par e-mail, au moins <strong>30 jours avant</strong> son
        entree en vigueur. L&apos;utilisation du Service apres notification vaut acceptation des nouvelles CGU.
      </p>
      <p>
        Si le Client refuse les nouvelles CGU, il peut resilier son Compte sans frais avant leur entree
        en vigueur.
      </p>

      <h2>Article 17 — Contact</h2>
      <p>
        Pour toute question relative aux presentes CGU ou au Service :
      </p>
      <ul>
        <li>E-mail : <a href="mailto:contact@emcorp.io">contact@emcorp.io</a></li>
        <li>Adresse postale : emcorp.io, Paris, France</li>
      </ul>
      <p>
        Les mentions legales completes de l&apos;Editeur sont disponibles sur la page{" "}
        <Link href="/mentions-legales">Mentions legales</Link>.
      </p>
    </LegalLayout>
  );
}
