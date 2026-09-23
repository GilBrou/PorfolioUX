/****** FOOTER ******/

/**
 * Pied de page global du site.
 */
export default function Footer() {
  return (
    <footer
      className="footer"
      aria-label="Pied de page du site de la bibliothèque universitaire"
    >
      <div className="leftFooter">
        <div className="footerA">
          {/* Logo et lien vers le site principal de l’université. */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.unimes.fr/fr/index.html"
            className="logoWrapper"
            aria-label="Aller sur le site de Nîmes Université, ouverture dans un nouvel onglet"
          >
            <img
              fetchpriority="high"
              src="/img/Logo.webp"
              className="logo"
              alt="Logo de Nîmes Université"
            />
          </a>
        </div>

        <div className="footerB">
          <p>
            <strong>Nîmes Université</strong>
          </p>

          <p>Rue du Docteur Georges Salan</p>
          <p>CS 13019 30021 Nîmes</p>
        </div>
      </div>

      <div className="rightFooter">
        <div className="footerA">
          {/* Lien vers la page de contact. */}
          <a
            href="/services/une-question-la-bu-vous-repond"
            aria-label="Accéder à la page Une question"
          >
            <p>Une question ?</p>
          </a>

          {/* Lien vers la présentation de la bibliothèque. */}
          <a
            href="/votre-bibliotheque/mieux-nous-connaitre"
            aria-label="Accéder à la page Mieux nous connaître"
          >
            <p>Mieux nous connaître</p>
          </a>

          {/* Lien vers les mentions légales. */}
          <a
            href="/mentions-legales"
            aria-label="Consulter les mentions légales"
          >
            <p>Mentions légales</p>
          </a>
        </div>

        {/* Bloc des réseaux sociaux. */}
        <div className="footerB footerBR" aria-labelledby="side-reseaux">
          <p id="side-reseaux">Réseaux sociaux</p>

          <div
            className="footerBRWrap"
            aria-label="Liens vers les réseaux sociaux"
          >
            <a
              href="https://www.instagram.com/bu.unimes/"
              target="_blank"
              rel="noopener noreferrer"
              className="RezButton"
              aria-label="Instagram de la bibliothèque, ouverture dans un nouvel onglet"
            >
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>

            <a
              href="https://www.facebook.com/BUnimes/?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="RezButton"
              aria-label="Facebook de la bibliothèque, ouverture dans un nouvel onglet"
            >
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
