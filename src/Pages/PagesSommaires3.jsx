/****** PAGE SOMMAIRE 3 ******/

/*** PAGES ET COMPOSANTS ***/
import Ariane from "../Components/Ariane.jsx";

/**
 * Page de sommaire de niveau 3.
 */
export default function PagesSommaires3(props) {
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
   * Affiche le titre correspondant à la section courante.
   */
  function getTitle() {
    const url = getCurrentUrl();

    if (url.includes("gestion")) {
      return (
        <h2 key={"titre" + "droit, economie, gestion"}>
          Droit, économie, gestion
        </h2>
      );
    } else if (url.includes("histoire")) {
      return (
        <h2 key={"titre" + "Lettres, Langues, Histoire"}>
          Lettres, Langues, Histoire
        </h2>
      );
    } else if (url.includes("sciences")) {
      return <h2 key={"titre" + "Sciences"}>Sciences</h2>;
    }

    return null;
  }

  /**
   * Affiche les liens du sommaire détaillé selon la section courante.
   */
  function getContent() {
    const url = getCurrentUrl();
    const currentPage = url.substring(url.lastIndexOf("/"));

    if (currentPage.includes("gestion")) {
      return (
        <div
          key={`lefty0-droiecogestion`}
          role="region"
          aria-label={"Sommaire détaillé de la section " + currentPage}
        >
          <div
            key={"lefty" + currentPage + "-list"}
            className="wrapperForSomLinks"
            role="navigation"
            aria-label="Liens du sommaire détaillé"
          >
            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Droit"}
              href="/ressources-documentaires/guides-thematiques/droit-economie-gestion/droit"
              aria-label="Droit"
            >
              <p>Droit</p>
            </a>

            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-economie"}
              href="/ressources-documentaires/guides-thematiques/droit-economie-gestion/economie-gestion"
              aria-label="Économie, gestion"
            >
              <p>économie, gestion</p>
            </a>
          </div>
        </div>
      );
    } else if (currentPage.includes("histoire")) {
      return (
        <div
          key={`lefty0-droiecogestion`}
          role="region"
          aria-label={"Sommaire détaillé de la section " + currentPage}
        >
          <div
            key={"lefty" + currentPage + "-list"}
            className="wrapperForSomLinks"
            role="navigation"
            aria-label="Liens du sommaire détaillé"
          >
            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Lettres"}
              href="/ressources-documentaires/guides-thematiques/lettres-langues-histoire/lettres"
              aria-label="Lettres"
            >
              <p>Lettres</p>
            </a>

            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Langues"}
              href="/ressources-documentaires/guides-thematiques/lettres-langues-histoire/langues"
              aria-label="Langues"
            >
              <p>Langues</p>
            </a>

            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Histoire"}
              href="/ressources-documentaires/guides-thematiques/lettres-langues-histoire/histoire"
              aria-label="Histoire"
            >
              <p>Histoire</p>
            </a>
          </div>
        </div>
      );
    } else if (currentPage.includes("science")) {
      return (
        <div
          key={`lefty0-Sciences`}
          role="region"
          aria-label={"Sommaire détaillé de la section " + currentPage}
        >
          <div
            key={"lefty" + currentPage + "-list"}
            className="wrapperForSomLinks"
            role="navigation"
            aria-label="Liens du sommaire détaillé"
          >
            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Sciences1"}
              href="/ressources-documentaires/guides-thematiques/sciences/sciences-de-la-vie-et-sciences-de-la-terre"
              aria-label="Sciences de la vie et Sciences de la Terre"
            >
              <p>Sciences de la vie et Sciences de la Terre</p>
            </a>

            <a
              className="wrapperForSomLinksLinks"
              key={"linkFor-Sciences2"}
              href="/ressources-documentaires/guides-thematiques/sciences/sciences-fondamentales-et-sciences-appliquees"
              aria-label="Sciences fondamentales et sciences appliquées"
            >
              <p>Sciences fondamentales et sciences appliquées</p>
            </a>
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="pageType pageTypeBU pagesSommaires">
      <Ariane data={props} />

      <div className="mainZone">
        {getTitle()}
        {getContent()}
      </div>
    </div>
  );
}