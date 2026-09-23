/***** HEADER *****/

/*** IMPORTS GÉNÉRAUX ***/
import { useState } from "react";
import { RegexThis } from "../Utils/Appendix.jsx";
import { redirectWithAuth } from "../Utils/PrimoConnect.jsx";

/**
 * Header principal du site.
 *
 * Il affiche :
 * - le logo de Nîmes Université ;
 * - le titre du site ;
 * - le menu principal à plusieurs niveaux ;
 * - le menu burger en version mobile ;
 * - le bouton de recherche globale.
 */
export default function Header(props) {
  const myDatas = props.data || {};

  // Gère l’ouverture et la fermeture du menu burger.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gère l’ouverture et la fermeture de la modale de recherche.
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Stocke la recherche saisie par l’utilisateur.
  const [searchTerm, setSearchTerm] = useState("");

  /********************************************
   * MENU BURGER
   ********************************************/
  function toggleMiniMenu() {
    setIsMenuOpen((open) => !open);
  }

  /**
   * Permet d’utiliser le menu burger au clavier.
   */
  function handleBurgerKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMiniMenu();
    }
  }

  /********************************************
   * MODALE DE RECHERCHE
   ********************************************/
  function openSearchModal() {
    setIsSearchOpen(true);
  }

  function closeSearchModal() {
    setIsSearchOpen(false);
  }

  /**
   * Redirige vers la page de résultats avec la recherche saisie.
   */
  function handleSearchSubmit(event) {
    event.preventDefault();

    const q = searchTerm.trim();

    if (!q) {
      return;
    }

    window.location.href = `/recherche?q=${encodeURIComponent(q)}`;
  }

  /********************************************
   * MENU DE NIVEAU 1
   ********************************************/
  function renderMenuLevel1(menuElement) {
    const titreMenu = menuElement.titreMenu;

    return (
      <li className="list firstList" key={titreMenu}>
        <a href={`/${RegexThis(titreMenu)}`} className="logoWrapper majTitre">
          {titreMenu}
        </a>

        <ul className="subMenu">
          {menuElement.menu2?.map((subItem, index) =>
            renderMenuLevel2(subItem, titreMenu, index),
          )}
        </ul>
      </li>
    );
  }

  /********************************************
   * MENU DE NIVEAU 2
   ********************************************/
  function renderMenuLevel2(menuElement, titreMenu) {
    const hasChildren =
      Array.isArray(menuElement.menu3) && menuElement.menu3.length > 0;

    const titreMenu2 = menuElement.element;

    // Redirection spécifique vers les bases de données avec authentification.
    if (titreMenu2.includes("Bases")) {
      return (
        <li className="subList" key={menuElement.element}>
          <a
            href="https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr"
            onClick={(event) =>
              redirectWithAuth(
                event,
                "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
              )
            }
            aria-label={`${menuElement.element}, ouverture du catalogue avec authentification`}
          >
            {menuElement.element}
          </a>
        </li>
      );
    }

    if (hasChildren) {
      return (
        <li className="subList" key={menuElement.element}>
          <a
            href={`/${RegexThis(titreMenu)}/${RegexThis(menuElement.element)}`}
          >
            {menuElement.element}
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>

          <ul className="subMenu2">
            {menuElement.menu3.map((subSubItem, index) =>
              renderMenuLevel3(subSubItem, titreMenu, titreMenu2, index),
            )}
          </ul>
        </li>
      );
    }

    return (
      <li className="subList" key={menuElement.element}>
        <a href={`/${RegexThis(titreMenu)}/${RegexThis(menuElement.element)}`}>
          {menuElement.element}
        </a>
      </li>
    );
  }

  /********************************************
   * MENU DE NIVEAU 3
   ********************************************/
  function renderMenuLevel3(menuElement, titreMenu, titreMenu2) {
    return (
      <li className="subList" key={menuElement.element}>
        <a
          href={
            "/" +
            RegexThis(titreMenu) +
            "/" +
            RegexThis(titreMenu2) +
            "/" +
            RegexThis(menuElement.element)
          }
        >
          {menuElement.element}
        </a>
      </li>
    );
  }

  /********************************************
   * RENDU PRINCIPAL
   ********************************************/
  return (
    <header id="header">
      <nav role="navigation" aria-label="Navigation principale du site">
        {/* Logo de Nîmes Université. */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.unimes.fr/fr/index.html"
          className="logoWrapper"
          aria-label="Aller sur le site de Nîmes Université, ouverture dans un nouvel onglet"
        >
          <img
            fetchpriority="high"
            src="/img/Logo2.webp"
            className="logo"
            alt="Logo de Nîmes Université"
          />
        </a>

        {/* Titre du site cliquable. */}
        <a
          rel="noopener noreferrer"
          href="/"
          className=" logoWrapper logoWrapperTitle"
          aria-label={
            myDatas.titre || "Accueil du site de la bibliothèque universitaire"
          }
        >
          <h1 className="numTitle">{myDatas.titre}</h1>
        </a>

        {/* Bouton du menu burger pour l’affichage mobile. */}
        <div
          className={`burgerM ${isMenuOpen ? "is-open" : ""}`}
          id="burgerM"
          onClick={toggleMiniMenu}
          onKeyDown={handleBurgerKeyDown}
          tabIndex="0"
          aria-label="Ouvrir ou fermer le menu principal"
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          aria-haspopup="true"
          role="button"
        >
          <div className="middleBar"></div>
        </div>

        {/* Menu principal. */}
        <ul
          className={`menu ${isMenuOpen ? "menu-open" : ""}`}
          id="menu"
          style={{
            display: isMenuOpen ? "flex" : undefined,
          }}
        >
          {/* Lien vers la page d’accueil. */}
          <li className="list">
            <a href="/accueil" aria-label="Aller à la page d'accueil">
              <i className="fa fa-home" aria-hidden="true"></i>
              <span className="sr-only">Accueil</span>
            </a>
          </li>

          {/* Menus dynamiques. */}
          {Array.isArray(myDatas.menu) &&
            myDatas.menu.map((menuItem) => renderMenuLevel1(menuItem))}

          {/* Lien vers l’aide et la FAQ. */}
          <a
            className="helper"
            href="/services/une-question-la-bu-vous-repond"
            rel="noopener noreferrer"
            aria-label="Consulter la FAQ de la bibliothèque"
          >
            <p className="helperP1">?</p>
            <p className="helperP2">Une question ? La BU vous répond !</p>
          </a>

          {/* Bouton ouvrant la recherche globale. */}
          <button
            type="button"
            className="searchToggle"
            onClick={openSearchModal}
            aria-label="Ouvrir la recherche globale"
            aria-expanded={isSearchOpen}
            aria-controls="search-modal-title"
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </ul>
      </nav>

      {/* Modale de recherche globale. */}
      {isSearchOpen && (
        <div
          className="searchModalOverlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          onClick={closeSearchModal}
        >
          <div className="searchModal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="searchModalClose"
              onClick={closeSearchModal}
              aria-label="Fermer la recherche"
            >
              ×
            </button>

            <h2 id="search-modal-title" className="searchModalTitle">
              Rechercher sur le site
            </h2>

            <form className="searchModalForm" onSubmit={handleSearchSubmit}>
              <label htmlFor="global-search-input" className="sr-only">
                Saisissez un ou plusieurs mots-clés
              </label>

              <input
                id="global-search-input"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder=""
                autoFocus
              />

              <button type="submit" className="searchModalButton">
                <i className="fa fa-search" aria-hidden="true"></i>
                <span>Rechercher</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}