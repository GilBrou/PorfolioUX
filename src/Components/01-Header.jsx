/***** HEADER COMPONENT *****/

import { useState, useEffect } from "react";

/*** SLUG HELPER ***/

/**
 * Convertit un texte en slug utilisable dans une URL.
 * Supprime les accents, passe le texte en minuscules
 * et remplace les espaces et caractères spéciaux par des tirets.
 */
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/*** HEADER / NAV MODULE ***/

export default function Header({
  data,
  activePage,
  setActivePage,
  showBorder,
}) {
  // Indique si la page a été défilée verticalement.
  const [isScrolled, setIsScrolled] = useState(false);

  // Récupère les éléments du menu depuis les données transmises.
  const menuItems = data?.sectionTitle ?? [];

  /**
   * Surveille la position de défilement de la page.
   * Active ou désactive la classe correspondante sur le menu.
   */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    // Ajoute un écouteur de défilement avec optimisation passive.
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Initialise l'état en fonction de la position actuelle.
    handleScroll();

    // Supprime l'écouteur lors du démontage du composant.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Gère le clic sur le logo ou l'icône d'accueil.
   * Réactive la rubrique d'introduction et remonte en haut de page.
   */
  function handleHomeClick(e) {
    e.preventDefault();

    setActivePage("intro");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /**
   * Gère la navigation entre les rubriques principales.
   * Convertit le nom de la rubrique en slug,
   * met à jour la page active et remonte en haut de page.
   */
  function handleMenuClick(e, myMenu) {
    e.preventDefault();

    const slug = slugify(myMenu);

    setActivePage(slug);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*** CONFIGURATION DES CLASSES CSS ***/

  // Construit les classes du menu selon son état et la rubrique active.
  const navClass = [
    isScrolled ? "scrolled" : "",
    showBorder ? "has-border" : "",
  ]
    .filter(Boolean)
    .join(" ");

  /*** STRUCTURE DU MENU ***/

  return (
    <nav className={navClass}>
      {/* LOGO : permet de revenir à la page d'introduction. */}
      <a href="#top" className="imgWrapNav" onClick={handleHomeClick}>
        <img src={data?.logo || "loading..."} alt={data?.nom || "Logo"} />
      </a>

      {/* MENU PRINCIPAL */}
      <ul>
        {/* ACCUEIL : affiche l'icône et indique la rubrique active. */}
        <li className={activePage === "intro" ? "active2" : ""}>
          <a
            href="#top"
            onClick={handleHomeClick}
            aria-label="Retour à l'introduction"
          >
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>

        {/* RUBRIQUES : génère les liens de navigation depuis les données. */}
        {menuItems.map((myMenu, i) => {
          const slug = slugify(myMenu);

          return (
            <li
              key={"menuItem" + i}
              className={activePage === slug ? "active" : ""}
            >
              <a href={`#${slug}`} onClick={(e) => handleMenuClick(e, myMenu)}>
                {myMenu}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
