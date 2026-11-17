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

export default function Homepage({ data }) {
  // Intro affichée au chargement
  const [activePage, setActivePage] = useState("intro");

  // Rubriques qui affichent la bordure inférieure du menu
  const pagesWithBorder = ["parcours", "projets", "realisations", "cv"];

  // Détermine si la bordure doit être affichée
  const showBorder = pagesWithBorder.includes(activePage);

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

              <Projet01UX />
              <Projet02LMS />
              <Projet03DEV />
              <Projet04GRAPH />
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

      {/* CONTENU SÉLECTIONNÉ */}
      <main key={activePage}>{renderContent()}</main>
    </div>
  );
}
