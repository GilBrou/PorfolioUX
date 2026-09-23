/***** SECOND MENU : TUILES D’ACCÈS RAPIDE ******/

import { redirectWithAuth } from "../Utils/PrimoConnect.jsx";

/**
 * Composant affichant les tuiles d’accès rapide.
 */
export default function SecondMenu(props) {
  // Sécurise la récupération des données.
  const tuiles = Array.isArray(props?.data) ? props.data : [];

  /**
   * Affiche une tuile du second menu.
   */
  function renderTuile(tuile, index) {
    if (!tuile.titre.includes("Bases")) {
      return (
        <a
          key={`tuile-${index}-${tuile.titre}`}
          href={tuile.lien}
          className="secondMenuTile"
          aria-label={tuile.titre}
        >
          <div className="upSecMen upSecMenIcon">
            <img
              fetchpriority="high"
              src={`/img/${tuile.image}`}
              alt={`icône : ${tuile.titre}`}
            />
          </div>

          <h2 className="majTitre">{tuile.titre}</h2>
        </a>
      );
    }

    return (
      <a
        key={`tuile-${index}-${tuile.titre}`}
        href="#"
        onClick={(event) =>
          redirectWithAuth(
            event,
            "https://catalogue.scdi-montpellier.fr/nde/dbsearch?vid=33MON_INST:33UN_NDE&lang=fr",
          )
        }
        className="secondMenuTile"
        aria-label={tuile.titre}
      >
        <div className="upSecMen upSecMenIcon">
          <img
            fetchpriority="high"
            src={`/img/${tuile.image}`}
            alt={`icône : ${tuile.titre}`}
          />
        </div>

        <h2>{tuile.titre}</h2>
      </a>
    );
  }

  return (
    <div
      className="secondMenu"
      role="navigation"
      aria-label="Accès rapide aux principales rubriques de la bibliothèque"
    >
      {tuiles.map(renderTuile)}
    </div>
  );
}