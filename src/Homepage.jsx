/***** HOMEPAGE COMPONENT *****/

/*** IMPORTS GÉNÉRAUX ***/
import { useState, useEffect } from "react";

/*** COMPOSANTS PRINCIPAUX ***/
import Header from "./Components/01-Header";
import Intro from "./Components/02-Intro";
import Parcours from "./Components/03-Parcours";
import Comp from "./Components/04-Competences";
import Envir from "./Components/06-outils";
import CV from "./Components/07-CV";
import Footer from "./Components/08-Footer";

/*** COMPOSANTS RÉALISATIONS ***/
import Projet01UX from "./Components/05-Projet-01-UX";
import Projet02LMS from "./Components/05-Projet-02-LMS";
import Projet03DEV from "./Components/05-Projet-03-DEV";
import Projet04GRAPH from "./Components/05-Projet-04-GRAPH";

/*** CONFIGURATION DES SOUS-RUBRIQUES ***/

// Définit les différentes catégories du sommaire des réalisations.
const sectionsRealisations = [
  { id: "ui-ux-design", label: "UI / UX" },
  { id: "digital-learning-et-lms", label: "Digital Learning / LMS" },
  { id: "developpement", label: "Développement" },
  { id: "creations-graphiques", label: "Graphisme" },
];

/*** GESTION DES ROUTES ***/

/**
 * Récupère la rubrique active à partir du hash de l'URL.
 * Vérifie également si une sous-rubrique des réalisations
 * est spécifiée dans l'adresse.
 */
function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, "");

  // Vérifie si l'URL correspond à une sous-rubrique des réalisations.
  if (hash.startsWith("realisations/")) {
    const sectionId = hash.split("/")[1];

    const project = sectionsRealisations.find(
      (section) => section.id === sectionId,
    );

    if (project) {
      return {
        page: "realisations",
        section: project.id,
      };
    }
  }

  // Liste des rubriques principales accessibles depuis la navigation.
  const validPages = [
    "intro",
    "parcours",
    "competences",
    "projets",
    "realisations",
    "outils",
    "cv",
    "contact",
  ];

  // Retourne la rubrique demandée ou la page d'introduction par défaut.
  return {
    page: validPages.includes(hash) ? hash : "intro",
    section: "ui-ux-design",
  };
}

/*** COMPOSANT HOMEPAGE ***/

export default function Homepage({ data }) {
  /**
   * Initialise la navigation à partir de l'URL actuelle.
   * La route initiale est déterminée une seule fois au montage.
   */
  const [initialRoute] = useState(getRouteFromHash);

  // Stocke la rubrique principale actuellement affichée.
  const [activePage, setActivePage] = useState(initialRoute.page);

  // Stocke la sous-rubrique actuellement sélectionnée.
  const [activeSection, setActiveSection] = useState(initialRoute.section);

  /**
   * Navigation vers une rubrique principale.
   * Met à jour la page active et synchronise l'URL du navigateur.
   */
  function navigateToPage(page) {
    setActivePage(page);

    const url =
      page === "intro"
        ? window.location.pathname + window.location.search
        : `#${page}`;

    window.history.pushState(null, "", url);
  }

  /**
   * Navigation vers une sous-rubrique des réalisations.
   * Met à jour la section active et son adresse dans l'URL.
   */
  function navigateToSection(id) {
    setActiveSection(id);

    const url = `#realisations/${id}`;

    if (window.location.hash !== url) {
      window.history.pushState(null, "", url);
    }
  }

  /**
   * Gère les événements de navigation du navigateur.
   * Synchronise les rubriques affichées avec l'URL
   * lors de l'utilisation des boutons précédent et suivant.
   */
  useEffect(() => {
    function handlePopState() {
      const route = getRouteFromHash();

      setActivePage(route.page);
      setActiveSection(route.section);
    }

    window.addEventListener("popstate", handlePopState);

    // Supprime l'écouteur lors du démontage du composant.
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /*** CONFIGURATION DU MENU PRINCIPAL ***/

  // Rubriques pour lesquelles une bordure inférieure est affichée.
  const pagesWithBorder = [
    "parcours",
    "competences",
    "projets",
    "realisations",
    "cv",
  ];

  // Détermine si la bordure du menu doit être visible.
  const showBorder = pagesWithBorder.includes(activePage);

  /*** GESTION DU DÉFILEMENT ***/

  /**
   * Défile automatiquement vers la sous-rubrique sélectionnée.
   * Prend en compte la hauteur du menu principal,
   * celle du sommaire secondaire et un décalage complémentaire.
   */
  useEffect(() => {
    // Le défilement ne concerne que les rubriques de réalisations.
    if (activePage !== "projets" && activePage !== "realisations") {
      return;
    }

    // Vérifie que l'URL correspond à la sous-rubrique sélectionnée.
    if (window.location.hash !== `#realisations/${activeSection}`) {
      return;
    }

    // Récupère l'élément HTML correspondant à la section ciblée.
    const section = document.getElementById(activeSection);

    if (!section) return;

    // Récupère les éléments fixes de navigation.
    const header = document.querySelector("nav");
    const sommaire = document.querySelector(".sommaireRealisations");

    // Calcule la hauteur des éléments de navigation.
    const headerHeight = header?.getBoundingClientRect().height || 0;

    const sommaireHeight = sommaire?.getBoundingClientRect().height || 0;

    // Définit un décalage spécifique pour chaque sous-rubrique.
    const offsets = {
      "ui-ux-design": 150,
      "digital-learning-et-lms": 0,
      developpement: 0,
      "creations-graphiques": 0,
    };

    // Applique le décalage correspondant à la section active.
    const extraOffset = offsets[activeSection] ?? 20;

    // Calcule le décalage total à prendre en compte.
    const offset = headerHeight + sommaireHeight + extraOffset;

    // Calcule la position verticale exacte de la section.
    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    // Effectue le défilement avec une animation fluide.
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [activePage, activeSection]);

  /**
   * Gère les clics sur les liens du sommaire secondaire.
   * Empêche le comportement natif du lien et déclenche
   * la navigation vers la sous-rubrique sélectionnée.
   */
  function scrollToSection(e, id) {
    e.preventDefault();
    navigateToSection(id);
  }

  /*** AFFICHAGE DES RUBRIQUES ***/

  /**
   * Détermine le contenu à afficher selon la rubrique active.
   * Transmet les données correspondantes aux composants concernés.
   */
  function renderContent() {
    switch (activePage) {
      case "intro":
        return <Intro data={data.intro} />;

      case "parcours":
        return <Parcours data={data.parcours} />;

      case "competences":
        return <Comp data={data.comp} />;

      case "projets":
      case "realisations":
        return (
          <section id="realisations">
            <div className="realisations">
              <h2 className="secTitle01">Exemples de réalisations</h2>

              {/* Réalisations UI / UX Design. */}
              <div id="ui-ux-design">
                <Projet01UX />
              </div>

              {/* Réalisations Digital Learning et LMS. */}
              <div id="digital-learning-et-lms">
                <Projet02LMS />
              </div>

              {/* Réalisations Développement. */}
              <div id="developpement">
                <Projet03DEV />
              </div>

              {/* Réalisations Graphisme. */}
              <div id="creations-graphiques">
                <Projet04GRAPH />
              </div>
            </div>
          </section>
        );

      case "outils":
        return <Envir />;

      case "cv":
        return <CV />;

      case "contact":
        return <Footer data={data.contact} />;

      // Affiche l'introduction si aucune rubrique ne correspond.
      default:
        return <Intro data={data.intro} />;
    }
  }

  /*** STRUCTURE PRINCIPALE DE LA PAGE ***/

  return (
    <div className="homepage">
      {/* En-tête principal et navigation du site. */}
      <Header
        data={data.nav}
        activePage={activePage}
        setActivePage={navigateToPage}
        showBorder={showBorder}
      />

      {/* Sommaire secondaire affiché uniquement dans les réalisations. */}
      {(activePage === "projets" || activePage === "realisations") && (
        <div className="sommaireRealisations">
          <ul>
            {sectionsRealisations.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={activeSection === section.id ? "active" : ""}
                  onClick={(e) => scrollToSection(e, section.id)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contenu principal actualisé selon la rubrique sélectionnée. */}
      <main key={activePage}>{renderContent()}</main>
    </div>
  );
}
