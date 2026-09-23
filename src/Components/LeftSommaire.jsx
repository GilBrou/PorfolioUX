/****** SOMMAIRE DE PAGE ******/

import { RegexThis } from "../Utils/Appendix.jsx";
import { redirectWithAuth } from "../Utils/PrimoConnect.jsx";


/**
 * Composant principal du sommaire latéral.
 */
export default function LeftSommaire(menu) {
  const menu0 = Array.isArray(menu?.data?.menu) ? menu.data.menu : [];
  const ancres = Array.isArray(menu?.ancres) ? menu.ancres : [];
  const ancresFAQ = Array.isArray(menu?.ancresFAQ) ? menu.ancresFAQ : [];
  const showAncres =
    window.location.pathname === "/services/une-question-la-bu-vous-repond";
  const currentAncres = showAncres ? ancresFAQ : ancres;

  /**
   * Affiche le menu principal correspondant à la page courante.
   */
  function renderSommaireMenu(menuItem, index) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const currentParentSlug = pathParts[0];

    const thisTitle = RegexThis(menuItem.titreMenu);

    if (currentParentSlug === thisTitle) {
      const upMenu = menuItem.titreMenu;

      return (
        <ul key={"menu" + index}>
          <a
            key={upMenu}
            href={"/" + RegexThis(upMenu)}
            className="UpperAncres"
          >
            {upMenu}
          </a>

          {Array.isArray(menuItem.menu2) &&
            menuItem.menu2.map((menuItem, index) =>
              renderSommaireMenu2(menuItem, upMenu, index),
            )}
        </ul>
      );
    }

    return null;
  }

  /**
   * Affiche les entrées de niveau 2 du sommaire.
   */
  function renderSommaireMenu2(menuItem, upMenu, index) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const currentPage = pathParts[1];
    const currentChildPage = pathParts[2];

    const isCurrentLevel2 = currentPage === RegexThis(menuItem.element);
    const hasCurrentChild =
      Array.isArray(menuItem.menu3) &&
      menuItem.menu3.some(
        (item) => currentChildPage === RegexThis(item.element),
      );

    // Cas d’un élément sans sous-menu.
    if (!Array.isArray(menuItem.menu3) || menuItem.menu3.length === 0) {
      if (menuItem.element.includes("Bases")) {
        /*console.log(menuItem.element)*/

        if (isCurrentLevel2) {
          return (
            <li key={"sous menu" + index}>
              <a
                key={menuItem.element}
                className="focusedPage"
                href="https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr"
                         onClick={(event) =>
              redirectWithAuth(
                event,
                "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
              )
            }
                aria-current="page"
              >
                {menuItem.element}
              </a>

              <ul className="ancresMenu">
                {currentAncres.map((ancres, index) =>
                  renderSommaireMenu3(ancres, index),
                )}
              </ul>
            </li>
          );
        }

        return (
          <li key={"sous menu" + index}>
            <a
              key={menuItem.element}
              href="https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr"
                       onClick={(event) =>
              redirectWithAuth(
                event,
                "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
              )
            }
            >

              {menuItem.element}
            </a>
          </li>
        );
      } else {
        if (isCurrentLevel2) {
          return (
            <li key={"sous menu" + index}>
              <a
                key={menuItem.element}
                className="focusedPage"
                href={
                  "/" + RegexThis(upMenu) + "/" + RegexThis(menuItem.element)
                }
                aria-current="page"
              >
                {menuItem.element}
              </a>

              <ul className="ancresMenu">
                {currentAncres.map((ancres, index) =>
                  renderSommaireMenu3(ancres, index),
                )}
              </ul>
            </li>
          );
        }

        return (
          <li key={"sous menu" + index}>
            <a
              key={menuItem.element}
              href={"/" + RegexThis(upMenu) + "/" + RegexThis(menuItem.element)}
            >
              {menuItem.element}
            </a>
          </li>
        );
      }
    }

    // Cas d’un élément contenant un sous-menu actif.
    if (
      Array.isArray(menuItem.menu3) &&
      menuItem.menu3.length > 0 &&
      (isCurrentLevel2 || hasCurrentChild)
    ) {
      return (
        <li key={"sous menu" + index}>
          <a
            key={menuItem.element}
            className="focusedPage"
            href={"/" + RegexThis(upMenu) + "/" + RegexThis(menuItem.element)}
            aria-current={isCurrentLevel2 ? "page" : undefined}
          >
            {menuItem.element}
          </a>

          <ul className="ancresMenu">
            {menuItem.menu3.map((item, index) =>
              renderSommaireMenu4(item.element, index),
            )}
          </ul>
        </li>
      );
    }

    return (
      <li key={"sous menu" + index}>
        <a
          key={menuItem.element}
          href={"/" + RegexThis(upMenu) + "/" + RegexThis(menuItem.element)}
        >
          {menuItem.element}
        </a>
      </li>
    );
  }

  /**
   * Affiche les ancres de la page courante.
   */
  function renderSommaireMenu3(ancres, index) {
    if (!showAncres) {
      return null;
    }

    const slugifyAnchor = (str) =>
      (str || "")
        .toString()
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const targetId = "section-" + slugifyAnchor(ancres);

    const handleClick = (event) => {
      event.preventDefault();

      window.dispatchEvent(
        new CustomEvent("wp-scroll-to-anchor", {
          detail: { id: targetId },
        }),
      );
    };

    return (
      <li key={ancres + index}>
        <a href={"#" + targetId} onClick={handleClick} className="lowerAncres">
          {ancres}
        </a>
      </li>
    );
  }

  /**
   * Affiche les entrées de niveau 3 du sommaire.
   */
  function renderSommaireMenu4(menuItem, index) {
    const pathParts = window.location.pathname.split("/").filter(Boolean);

    if (pathParts[2] === RegexThis(menuItem)) {
      return (
        <li key={"sous menu" + index}>
          <a
            key={menuItem}
            className="focusedPage2"
            href={
              "/" +
              RegexThis(pathParts[0]) +
              "/" +
              RegexThis(pathParts[1]) +
              "/" +
              RegexThis(menuItem)
            }
            aria-current="page"
          >
            {menuItem}
          </a>

          <ul className="ancresMenu">
            {currentAncres.map((ancres, index) =>
              renderSommaireMenu3(ancres, index),
            )}
          </ul>
        </li>
      );
    }

    return (
      <li key={"sous menu" + index}>
        <a
          key={menuItem}
          href={
            "/" +
            RegexThis(pathParts[0]) +
            "/" +
            RegexThis(pathParts[1]) +
            "/" +
            RegexThis(menuItem)
          }
        >
          {menuItem}
        </a>
      </li>
    );
  }

  return (
    <div className="leftSommaire sidy">
      <h4>Sommaire</h4>

      {menu0.map((menuItem, index) => renderSommaireMenu(menuItem, index))}
    </div>
  );
}
