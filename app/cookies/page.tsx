import Link from "next/link";

import LegalLayout from "@/app/components/LegalLayout";

export const metadata = {
  title: "Cookies — emcorp.io",
  description:
    "Politique d'utilisation des cookies sur emcorp.io. Uniquement des cookies strictement necessaires.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Politique Cookies"
      subtitle="Les cookies utilises sur le site emcorp.io"
      effectiveDate="22 avril 2026"
    >
      <p>
        Un cookie est un petit fichier depose sur votre terminal (ordinateur, tablette, mobile) lorsque
        vous consultez un site. Il permet au site de reconnaitre votre navigateur et de conserver des
        informations necessaires a son bon fonctionnement.
      </p>

      <h2>1. Notre approche : cookies strictement necessaires</h2>
      <div className="callout">
        <strong>Le site emcorp.io n&apos;utilise que des cookies strictement necessaires au fonctionnement
        du service.</strong> Aucun cookie de mesure d&apos;audience tiers, aucun tracker publicitaire, aucun
        pixel de reseau social ne sont deposes sans votre action.
      </div>
      <p>
        Conformement a la deliberation CNIL n&deg;2020-091 du 17 septembre 2020, les cookies strictement
        necessaires au fonctionnement du service ne necessitent pas le recueil prealable de votre
        consentement. Un bandeau de consentement est neanmoins affiche a titre informatif.
      </p>

      <h2>2. Cookies utilises</h2>
      <table>
        <thead>
          <tr>
            <th>Nom / categorie</th>
            <th>Finalite</th>
            <th>Duree</th>
            <th>Emetteur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>signature_token</strong></td>
            <td>Authentification au service de signature (JWT, httpOnly)</td>
            <td>Session + 7 jours</td>
            <td>emcorp.io</td>
          </tr>
          <tr>
            <td><strong>cookie-consent</strong></td>
            <td>Memorise votre choix concernant le bandeau cookies</td>
            <td>13 mois (localStorage)</td>
            <td>emcorp.io</td>
          </tr>
          <tr>
            <td><strong>__stripe_mid / __stripe_sid</strong></td>
            <td>Prevention de la fraude sur les paiements</td>
            <td>Jusqu&apos;a 1 an</td>
            <td>Stripe Payments Europe, Ltd.</td>
          </tr>
          <tr>
            <td><strong>cf_clearance / __cf_bm</strong> (le cas echeant)</td>
            <td>Protection anti-bot / CDN</td>
            <td>30 minutes a 1 an</td>
            <td>Cloudflare, Inc.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Cookies que nous n&apos;utilisons pas</h2>
      <ul>
        <li>Google Analytics, Matomo ou tout autre outil d&apos;analytics tiers ;</li>
        <li>Facebook Pixel, LinkedIn Insight Tag, TikTok Pixel ou autres trackers publicitaires ;</li>
        <li>Widgets sociaux deposant des cookies (boutons &laquo; J&apos;aime &raquo;, embeds) ;</li>
        <li>Outils de retargeting ou de profilage comportemental.</li>
      </ul>

      <h2>4. Gerer les cookies</h2>
      <p>
        Les cookies strictement necessaires ne peuvent etre desactives sans degrader votre experience
        (impossibilite de vous connecter notamment). Vous pouvez toutefois a tout moment parametrer votre
        navigateur pour refuser les cookies, les supprimer ou etre alerte avant leur depot.
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Chrome
          </a>
        </li>
        <li>
          <a href="https://support.mozilla.org/fr/kb/effacer-cookies-donnees-site-firefox" target="_blank" rel="noopener noreferrer">
            Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
            Safari
          </a>
        </li>
        <li>
          <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
            Edge
          </a>
        </li>
      </ul>

      <h2>5. Pour en savoir plus</h2>
      <p>
        Consultez notre <Link href="/confidentialite">politique de confidentialite</Link> pour connaitre la
        liste des traitements effectues sur vos donnees personnelles.
      </p>
      <p>
        Vous pouvez egalement consulter le site de la CNIL :{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer">
          cnil.fr/cookies
        </a>.
      </p>
    </LegalLayout>
  );
}
