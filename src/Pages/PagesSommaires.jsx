/****** PAGE SOMMAIRE ******/

/*** PAGES ET COMPOSANTS ***/
import Ariane from "../Components/Ariane.jsx";

import { RegexThis, RegexBackWithAccent } from "../Utils/Appendix.jsx";
import { redirectWithAuth } from "../Utils/PrimoConnect.jsx";

/**
 * Page de sommaire de niveau 1.
 */
export default function PagesSommaires(props) {
  const { data } = props;

  // Sécurise la récupération des menus de niveau 1.
  const menuList = Array.isArray(data?.menu) ? data.menu : [];

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
   * Affiche le niveau 1 du sommaire correspondant à la page courante.
   */
  function renderSommaireLevel1(menuItem) {
    const url = getCurrentUrl();
    const currentPage = url.substring(url.lastIndexOf("/"));

    if (currentPage.includes(RegexThis(menuItem.titreMenu))) {
      return (
        <div
          key={`lefty-${menuItem.titreMenu}`}
          role="region"
          aria-label={`Sommaire de la section ${RegexBackWithAccent(
            menuItem.titreMenu,
          )}`}
        >
          <h2 key={`titre-${menuItem.titreMenu}`}>
            {RegexBackWithAccent(menuItem.titreMenu)}
          </h2>

          <div
            key={`lefty-${menuItem.titreMenu}-list`}
            className="wrapperForSomLinks"
            role="navigation"
            aria-label="Liens du sommaire"
          >
            {Array.isArray(menuItem.menu2) &&
              menuItem.menu2.map((subItem, index) =>
                renderSommaireLevel2(subItem, menuItem.titreMenu, index),
              )}
          </div>
        </div>
      );
    }

    return null;
  }

  /**
   * Affiche les liens de niveau 2 du sommaire.
   */
  function renderSommaireLevel2(subItem, titreMenu) {
    const href = `/${RegexThis(titreMenu)}/${RegexThis(subItem.element)}`;

    if (!subItem.element.includes("Bases")) {
      return (
        <a
          className="wrapperForSomLinksLinks"
          key={`linkFor-${subItem.element}`}
          href={href}
          aria-label={RegexBackWithAccent(subItem.element)}
        >
          <p>{RegexBackWithAccent(subItem.element)}</p>
        </a>
      );
    }


    else  if (subItem.element.includes("Bases")) {
      return (
        <a
          className="wrapperForSomLinksLinks"
          key={`linkFor-${subItem.element}`}
          href=    "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr"
                   onClick={(event) =>
              redirectWithAuth(
                event,
                "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
              )
            }
          aria-label={RegexBackWithAccent(subItem.element)}
        >
          <p>{RegexBackWithAccent(subItem.element)}</p>
        </a>
      );
    }
    return (
<a
  className="wrapperForSomLinksLinks"
  key={`linkFor-${subItem.element}`}
  href="https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();

    redirectWithAuth(
      event,
      "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
    );
  }}
  aria-label={RegexBackWithAccent(subItem.element)}
>
  <p>{RegexBackWithAccent(subItem.element)}</p>
</a>
    );
  }

  return (
    <div className="pageType pageTypeBU pagesSommaires">
      <Ariane data={data} />

      <div className="mainZone">
        {menuList.map((menuItem, index) =>
          renderSommaireLevel1(menuItem, index),
        )}
      </div>
    </div>
  );
}
