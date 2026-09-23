/****** ARIANE ******/

/*** IMPORTS GÉNÉRAUX ***/
import { RegexThis, RegexBackWithAccent } from "../Utils/Appendix.jsx";

/**
 * Composant du fil d’Ariane.
 */
export default function Ariane() {
  /**
   * Construit les URLs cumulées à partir des segments de l’URL.
   *
   * Exemple :
   * ["venir-a-la-bu", "equipements-a-disposition", "mon-article"]
   *
   * Résultat :
   * [
   *   "/venir-a-la-bu",
   *   "/venir-a-la-bu/equipements-a-disposition",
   *   "/venir-a-la-bu/equipements-a-disposition/mon-article"
   * ]
   */
  function buildCumulativeLinks(segments) {
    const links = [];

    segments.forEach((segment, index) => {
      const slugSegment = RegexThis(segment);

      if (index === 0) {
        links.push(`/${slugSegment}`);
      } else {
        const previous = segments
          .slice(0, index + 1)
          .map((s) => RegexThis(s))
          .join("/");

        links.push(`/${previous}`);
      }
    });

    return links;
  }

  /**
   * Met une majuscule à la première lettre d’une chaîne.
   */
  function capitalizeFirstLetter(str = "") {
    if (!str) {
      return "";
    }

    return str.replace(/^./, (character) => character.toUpperCase());
  }

  /**
   * Génère le contenu du fil d’Ariane à partir de l’URL courante.
   */
  function renderAriane() {
    const pathname = window.location?.pathname || "/";

    // Récupère les segments de l’URL en supprimant les valeurs vides.
    let arianeUrls = pathname.split("/").filter(Boolean);

    // Supprime le segment "accueil" pour éviter un doublon avec le lien Accueil.
    arianeUrls = arianeUrls.filter((segment) => segment !== "accueil");

    // Si l’utilisateur est sur la page d’accueil, un seul lien est affiché.
    if (arianeUrls.length === 0) {
      return (
        <div className="ariane">
          <a href="/accueil" aria-current="page">
            Accueil
          </a>
        </div>
      );
    }

    // Construit les liens cumulés correspondant à chaque niveau du fil d’Ariane.
    const links = buildCumulativeLinks(arianeUrls);

    return (
      <div className="ariane">
        {/* Lien initial vers la page d’accueil. */}
        <a href="/accueil">Accueil</a>

        {/* Liens correspondant aux segments de l’URL courante. */}
        {links.map((href, index) => (
          <a
            key={`ariane-link-${index}`}
            href={href}
            aria-current={index === links.length - 1 ? "page" : undefined}
          >
            {capitalizeFirstLetter(RegexBackWithAccent(arianeUrls[index]))}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="ariane1" role="navigation" aria-label="Fil d’Ariane">
      {renderAriane()}
    </div>
  );
}