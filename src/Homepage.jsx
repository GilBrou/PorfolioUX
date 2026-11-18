import { useState, useEffect } from "react";

import Header from "./Components/01-Header";
import Intro from "./Components/02-Intro";
import Parcours from "./Components/03-Parcours";
import Comp from "./Components/04-Competences";
import Envir from "./Components/06-outils";
import CV from "./Components/07-CV";
import Footer from "./Components/08-Footer";

import Projet01UX from "./Components/05-Projet-01-UX";
import Projet02LMS from "./Components/05-Projet-02-LMS";
import Projet03DEV from "./Components/05-Projet-03-DEV";
import Projet04GRAPH from "./Components/05-Projet-04-GRAPH";

// Sommaire des réalisations
const sectionsRealisations = [
  { id: "ui-ux-design", label: "UI / UX" },
  { id: "digital-learning-et-lms", label: "Digital Learning / LMS" },
  { id: "developpement", label: "Développement" },
  { id: "creations-graphiques", label: "Graphisme" },
];

// Lecture de l'URL au chargement

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#/, "");

  // Sous-rubriques des réalisations
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

  // Rubriques principales : slugs inchangés
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

  return {
    page: validPages.includes(hash) ? hash : "intro",
    section: "ui-ux-design",
  };
}

export default function Homepage({ data }) {
  // Initialisation depuis l'URL
  const [initialRoute] = useState(getRouteFromHash);

  const [activePage, setActivePage] = useState(initialRoute.page);
  const [activeSection, setActiveSection] = useState(initialRoute.section);

  // Navigation vers une rubrique principale
  function navigateToPage(page) {
    setActivePage(page);

    const url =
      page === "intro"
        ? window.location.pathname + window.location.search
        : `#${page}`;

    window.history.pushState(null, "", url);
  }

  function navigateToSection(id) {
    setActiveSection(id);

    const url = `#realisations/${id}`;

    if (window.location.hash !== url) {
      window.history.pushState(null, "", url);
    }
  }

  // Gestion des boutons précédent / suivant du navigateur
  useEffect(() => {
    function handlePopState() {
      const route = getRouteFromHash();

      setActivePage(route.page);
      setActiveSection(route.section);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Rubriques qui affichent la bordure inférieure du menu
  const pagesWithBorder = [
    "parcours",
    "competences",
    "projets",
    "realisations",
    "cv",
  ];

  const showBorder = pagesWithBorder.includes(activePage);

  // Défilement vers une sous-rubrique
  useEffect(() => {
    if (activePage !== "projets" && activePage !== "realisations") {
      return;
    }

    // On vérifie que l'URL correspond bien à une sous-rubrique

    /*
    if (window.location.hash !== `#${activeSection}`) {
      return;
    }

    */

    if (window.location.hash !== `#realisations/${activeSection}`) {
      return;
    }

    const section = document.getElementById(activeSection);
    if (!section) return;

    const header = document.querySelector("nav");
    const sommaire = document.querySelector(".sommaireRealisations");

    const headerHeight = header?.getBoundingClientRect().height || 0;

    const sommaireHeight = sommaire?.getBoundingClientRect().height || 0;

    const offsets = {
      "ui-ux-design": 150,
      "digital-learning-et-lms": 0,
      developpement: 0,
      "creations-graphiques": 0,
    };

    const extraOffset = offsets[activeSection] ?? 20;

    const offset = headerHeight + sommaireHeight + extraOffset;

    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [activePage, activeSection]);

  // Clic sur le sous-menu
  function scrollToSection(e, id) {
    e.preventDefault();
    navigateToSection(id);
  }

  // Affichage dynamique des rubriques
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

              <div id="ui-ux-design">
                <Projet01UX />
              </div>

              <div id="digital-learning-et-lms">
                <Projet02LMS />
              </div>

              <div id="developpement">
                <Projet03DEV />
              </div>

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

      default:
        return <Intro data={data.intro} />;
    }
  }

  return (
    <div className="homepage">
      {/* HEADER PRINCIPAL */}
      <Header
        data={data.nav}
        activePage={activePage}
        setActivePage={navigateToPage}
        showBorder={showBorder}
      />

      {/* SECOND SOMMAIRE */}
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

      {/* CONTENU */}
      <main key={activePage}>{renderContent()}</main>
    </div>
  );
}
