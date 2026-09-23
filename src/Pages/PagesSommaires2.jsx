/****** PAGE SOMMAIRE 2 ******/

/*** PAGES ET COMPOSANTS ***/
import Ariane from "../Components/Ariane.jsx";

import { RegexThis, RegexBackWithAccent } from "../Utils/Appendix.jsx";

/**
 * Page de sommaire de niveau 2.
 */
export default function PagesSommaires2(props) {
  const { data } = props;

  // Sécurise la récupération du menu principal.
  const menu = Array.isArray(data?.menu) ? data.menu : [];

  /**
   * Récupère l’URL courante uniquement côté navigateur.
   */
  function getCurrentUrl() {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  }

  /**
   * Affiche le niveau 1 correspondant à la section courante.
   */
  function renderSommaireLevel1(menuItem) {
    const url = getCurrentUrl();
    const currentPage = url.substring(url.lastIndexOf("/"));

    if (url.includes(RegexThis(menuItem.titreMenu))) {
      return (
        <div
          key={`lefty0-${menuItem.titreMenu}`}
          role="region"
          aria-label={`Sommaire détaillé de la section ${RegexBackWithAccent(
            menuItem.titreMenu,
          )}`}
        >
          {Array.isArray(menuItem.menu2) &&
            menuItem.menu2.map((subItem, index) =>
              renderSommaireLevel2(
                subItem,
                menuItem.titreMenu,
                currentPage,
                index,
              ),
            )}
        </div>
      );
    }

    return null;
  }

  /**
   * Affiche le niveau 2 correspondant à la page courante.
   */
  function renderSommaireLevel2(subItem, titreMenu, currentPage) {
    if (currentPage.includes(RegexThis(subItem.element))) {
      const titre2 = subItem.element;

      return (
        <div key={`lefty-${subItem.titreMenu || titreMenu}`}>
          <h2 key={`titre-${subItem.element}`}>
            {RegexBackWithAccent(subItem.element)}
          </h2>

          <div
            key={`lefty-${titreMenu}-list`}
            className="wrapperForSomLinks"
            role="navigation"
            aria-label="Liens du sommaire détaillé"
          >
            {Array.isArray(subItem.menu3) &&
              subItem.menu3.map((linkItem, index) =>
                renderSommaireLevel3(linkItem, titreMenu, titre2, index),
              )}
          </div>
        </div>
      );
    }

    return null;
  }

  /**
   * Affiche les liens de niveau 3.
   */
  function renderSommaireLevel3(linkItem, titreMenu, titre2) {
    const href =
      "/" +
      RegexThis(titreMenu) +
      "/" +
      RegexThis(titre2) +
      "/" +
      RegexThis(linkItem.element);

    return (
      <a
        className="wrapperForSomLinksLinks"
        key={`linkFor-${linkItem.element}`}
        href={href}
        aria-label={RegexBackWithAccent(linkItem.element)}
      >
        <p>{RegexBackWithAccent(linkItem.element)}</p>
      </a>
    );
  }

  return (
    <div className="pageType pageTypeBU pagesSommaires">
      <Ariane data={data} />

      <div className="mainZone">
        {menu.map((menuItem, index) => renderSommaireLevel1(menuItem, index))}
      </div>
    </div>
  );
}