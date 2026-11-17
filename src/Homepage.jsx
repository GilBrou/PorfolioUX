import { useState } from "react";

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
  { id: "projet-ux", label: "UI / UX" },
  { id: "projet-lms", label: "Digital Learning / LMS" },
  { id: "projet-dev", label: "Développement" },
  { id: "projet-graph", label: "Graphisme" },
];

export default function Homepage({ data }) {
  // Intro affichée au chargement
  const [activePage, setActivePage] = useState("intro");

  // Rubriques qui affichent la bordure inférieure du menu
  const pagesWithBorder = ["parcours", "projets", "realisations", "cv"];

  // Détermine si la bordure doit être affichée
  const showBorder = pagesWithBorder.includes(activePage);

  function scrollToSection(e, id) {
    e.preventDefault();

    const section = document.getElementById(id);
    if (!section) return;

    const header = document.querySelector("nav");
    const sommaire = document.querySelector(".sommaireRealisations");

    const headerHeight = header?.getBoundingClientRect().height || 0;
    const sommaireHeight = sommaire?.getBoundingClientRect().height || 0;

    // Décalage personnalisé pour chaque projet
    const offsets = {
      "projet-ux": 150,
      "projet-lms": 0,
      "projet-dev": 0,
      "projet-graph": 0,
    };

    const extraOffset = offsets[id] ?? 20;
    const offset = headerHeight + sommaireHeight + extraOffset;

    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
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

              <div id="projet-ux">
                <Projet01UX />
              </div>

              <div id="projet-lms">
                <Projet02LMS />
              </div>

              <div id="projet-dev">
                <Projet03DEV />
              </div>

              <div id="projet-graph">
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
      {/* HEADER TOUJOURS VISIBLE */}
      <Header
        data={data.nav}
        activePage={activePage}
        setActivePage={setActivePage}
        showBorder={showBorder}
      />

      {/* SOMMAIRE SOUS LE HEADER */}
      {(activePage === "projets" || activePage === "realisations") && (
        <div className="sommaireRealisations">
          <ul>
            {sectionsRealisations.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CONTENU SÉLECTIONNÉ */}
      <main key={activePage}>{renderContent()}</main>
    </div>
  );
}
