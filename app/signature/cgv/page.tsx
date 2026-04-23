import Link from "next/link";

import LegalLayout from "@/app/components/LegalLayout";

export const metadata = {
  title: "Conditions Generales de Vente — emcorp Signature",
  description:
    "Conditions generales de vente du service de signature electronique emcorp.io. Tarifs, paiement, droit de retractation, garanties.",
};

export default function CgvPage() {
  return (
    <LegalLayout
      title="Conditions Generales de Vente"
      subtitle="Service de signature electronique emcorp.io"
      version="1.0"
      effectiveDate="22 avril 2026"
    >
      <div className="callout">
        Les presentes Conditions Generales de Vente (&laquo; <strong>CGV</strong> &raquo;) completent les{" "}
        <Link href="/signature/cgu">Conditions Generales d&apos;Utilisation</Link> (CGU) du service de
        signature electronique emcorp.io. En cas de contradiction, les CGV prevalent sur les CGU pour les
        aspects commerciaux (tarifs, paiement, retractation, garanties).
      </div>

      <h2>Article 1 — Objet</h2>
      <p>
        Les presentes CGV encadrent la vente, par emcorp.io (ci-apres l&apos;&laquo; <strong>Editeur</strong> &raquo;),
        de prestations de services de signature electronique au benefice de toute personne physique (consommateur)
        ou morale (professionnel) ayant souscrit un abonnement ou effectue un achat (ci-apres le &laquo; <strong>Client</strong> &raquo;).
      </p>

      <h2>Article 2 — Prestations proposees</h2>
      <p>Les prestations proposees par l&apos;Editeur se declinent en trois formules :</p>
      <table>
        <thead>
          <tr>
            <th>Formule</th>
            <th>Mode</th>
            <th>Tarif HT</th>
            <th>Duree</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>A l&apos;unite</strong></td>
            <td>Paiement a l&apos;acte (pay-per-use)</td>
            <td>3 € par signature realisee</td>
            <td>Sans engagement</td>
          </tr>
          <tr>
            <td><strong>Pack 50</strong></td>
            <td>Achat de 50 signatures prepayees</td>
            <td>49 € (soit 0,98 € / signature)</td>
            <td>Validite 12 mois a compter de l&apos;achat</td>
          </tr>
          <tr>
            <td><strong>Illimite</strong></td>
            <td>Abonnement mensuel</td>
            <td>99 € par mois</td>
            <td>Mensuel sans engagement, tacite reconduction</td>
          </tr>
        </tbody>
      </table>
      <p>
        Les tarifs sont indiques en euros et hors taxes. La TVA au taux legal en vigueur en France est
        ajoutee sur toutes les factures.
      </p>

      <h2>Article 3 — Commande</h2>
      <p>
        La commande d&apos;une formule s&apos;effectue directement depuis l&apos;espace client apres inscription
        sur le Service. La commande est reputee ferme et definitive apres :
      </p>
      <ol>
        <li>selection de la formule souhaitee ;</li>
        <li>acceptation des presentes CGV et des CGU ;</li>
        <li>paiement via le prestataire de paiement Stripe.</li>
      </ol>
      <p>
        Un recapitulatif de commande ainsi qu&apos;une facture au format PDF sont adresses au Client
        par e-mail.
      </p>

      <h2>Article 4 — Prix</h2>
      <p>
        Les prix sont ceux affiches sur le site au jour de la commande. L&apos;Editeur se reserve le droit
        de modifier ses tarifs a tout moment. Les nouveaux tarifs ne s&apos;appliquent toutefois pas aux
        commandes deja validees ni aux abonnements en cours, qui conservent le prix initial jusqu&apos;a la
        prochaine echeance de renouvellement.
      </p>

      <h2>Article 5 — Modalites de paiement</h2>
      <p>
        Les paiements sont traites par <strong>Stripe Payments Europe, Ltd.</strong>, prestataire de services
        de paiement agree. Les moyens de paiement acceptes sont les cartes bancaires Visa, Mastercard,
        American Express et, selon disponibilite, les prelevements SEPA.
      </p>
      <p>
        Aucune donnee bancaire n&apos;est collectee ni stockee par l&apos;Editeur. L&apos;integralite du flux
        de paiement est securisee par Stripe, conformement a la norme PCI DSS.
      </p>
      <h3>5.1 Pay-per-use</h3>
      <p>
        Chaque signature est facturee a l&apos;issue de sa completion. Le moyen de paiement enregistre par
        le Client est debite automatiquement.
      </p>
      <h3>5.2 Pack 50</h3>
      <p>
        Le prix du Pack 50 est paye en une seule fois a la commande. Les signatures sont immediatement
        creditees sur le compte du Client.
      </p>
      <h3>5.3 Abonnement illimite</h3>
      <p>
        L&apos;abonnement est factureeet preleve chaque mois a la date anniversaire de souscription. Le
        renouvellement est tacite tant que le Client n&apos;a pas resilie depuis son espace.
      </p>

      <h2>Article 6 — Droit de retractation</h2>
      <h3>6.1 Client consommateur</h3>
      <p>
        Conformement a l&apos;article L.221-18 du Code de la consommation, le Client consommateur dispose
        d&apos;un delai de <strong>14 jours</strong> a compter de la souscription pour exercer son droit de
        retractation, sans avoir a motiver sa decision ni a supporter de penalites.
      </p>
      <p>
        Toutefois, conformement a l&apos;article L.221-28, 13° du Code de la consommation, ce droit ne peut
        plus etre exerce <strong>des lors que l&apos;execution du service a commence, avec l&apos;accord
        prealable expres du Client et renoncement expres a son droit de retractation</strong>. En cochant la
        case d&apos;acceptation lors de sa commande, le Client reconnait expressement demander l&apos;execution
        immediate du Service et renonce a son droit de retractation pour les signatures deja realisees.
      </p>
      <p>
        Le formulaire-type de retractation est disponible sur simple demande a{" "}
        <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
      </p>
      <h3>6.2 Client professionnel</h3>
      <p>
        Conformement au Code de la consommation, le droit de retractation ne s&apos;applique pas aux
        professionnels dont l&apos;objet de l&apos;achat entre dans le champ de leur activite principale.
      </p>

      <h2>Article 7 — Remboursement et resiliation</h2>
      <h3>7.1 Pay-per-use</h3>
      <p>
        Les signatures deja realisees ne sont pas remboursables. Une demande de remboursement peut etre
        examinee en cas d&apos;anomalie technique averee ayant empeche la completion de la signature.
      </p>
      <h3>7.2 Pack 50</h3>
      <p>
        Le Pack 50 n&apos;est pas remboursable apres son activation (sauf exercice du droit de retractation
        dans les conditions de l&apos;article 6). Les signatures non utilisees a l&apos;expiration des 12 mois
        sont perdues.
      </p>
      <h3>7.3 Abonnement illimite</h3>
      <p>
        Le Client peut resilier son abonnement a tout moment depuis son espace personnel. La resiliation
        prend effet a la fin de la periode de facturation en cours. Le mois entame reste du dans son
        integralite, sans remboursement prorata temporis.
      </p>

      <h2>Article 8 — Facturation</h2>
      <p>
        Une facture est emise apres chaque paiement et mise a disposition du Client dans son espace
        personnel, a la rubrique &laquo; Facturation &raquo;. Les factures peuvent etre telechargees au format
        PDF a tout moment. Elles sont conservees par l&apos;Editeur pendant la duree legale de 10 ans.
      </p>

      <h2>Article 9 — Garanties et disponibilite</h2>
      <p>
        L&apos;Editeur met tout en œuvre pour assurer une disponibilite optimale du Service. Toutefois, compte
        tenu de la nature du reseau Internet, aucune garantie de disponibilite a 100% n&apos;est fournie.
      </p>
      <p>
        L&apos;Editeur ne saurait etre tenu responsable d&apos;une interruption de service resultant d&apos;une
        cause exterieure (operateur telecom, fournisseur d&apos;energie, editeur tiers, attaque informatique,
        force majeure).
      </p>

      <h2>Article 10 — Reclamations</h2>
      <p>
        Toute reclamation doit etre adressee par e-mail a <a href="mailto:contact@emcorp.io">contact@emcorp.io</a>.
        L&apos;Editeur s&apos;engage a repondre dans un delai maximal de 15 jours ouvres.
      </p>
      <p>
        En cas de differend persistant, le Client consommateur peut saisir gratuitement le service de
        mediation de la consommation <strong>CNPM Mediation Consommation</strong> —{" "}
        <a href="https://cnpm-mediation-consommation.eu">cnpm-mediation-consommation.eu</a>.
      </p>

      <h2>Article 11 — Protection des donnees</h2>
      <p>
        Le traitement des donnees personnelles collectees lors de la commande est decrit dans la{" "}
        <Link href="/confidentialite">politique de confidentialite</Link> du site.
      </p>

      <h2>Article 12 — Litiges et droit applicable</h2>
      <p>
        Les presentes CGV sont soumises au <strong>droit francais</strong>. Tout litige relatif a leur
        interpretation ou a leur execution sera soumis aux tribunaux competents de Paris, sous reserve des
        dispositions imperatives applicables aux consommateurs.
      </p>

      <h2>Article 13 — Modifications</h2>
      <p>
        L&apos;Editeur se reserve le droit de modifier les presentes CGV a tout moment. Les CGV applicables
        a chaque commande sont celles en vigueur au jour de sa validation. Les modifications sont notifiees
        aux Clients disposant d&apos;un abonnement actif au moins 30 jours avant leur entree en vigueur.
      </p>
    </LegalLayout>
  );
}
