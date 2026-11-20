import { useState, useEffect } from "react";
import projetsGraph from "../datas/projetsGraph.json";

/***** PROJET 04 - GRAPHISME *****/

export default function Projet04GRAPH() {
  // Mélange aléatoirement l'ordre des images au premier affichage.
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  // Stocke l'index de l'image sélectionnée.
  // La valeur null indique qu'aucune image n'est ouverte.
  const [selectedIndex, setSelectedIndex] = useState(null);

  /*** GESTION DU SCROLL DE LA PAGE ***/

  // Bloque le défilement de la page lorsque la modale est ouverte.
  useEffect(() => {
    if (selectedIndex !== null) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Rétablit le défilement lorsque la modale est fermée.
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Nettoie les styles lors du démontage du composant.
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [selectedIndex]);

  /*** NAVIGATION ENTRE LES IMAGES ***/

  // Affiche l'image suivante et revient à la première en fin de liste.
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % projetsRandom.length);
  };

  // Affiche l'image précédente et revient à la dernière en début de liste.
  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + projetsRandom.length) % projetsRandom.length,
    );
  };

  /*** AFFICHAGE DE LA GALERIE ***/

  return (
    <div className="container graphCont">
      {/* Titre de la rubrique. */}
      <h3 className="secTitle01 secTitle02">Graphisme</h3>
      {/* Galerie des miniatures. */}
      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedIndex(i)}
          >
            <img
              src={`/img/graph/mini/${d}`}
              className="img-responsive"
              alt={d}
            />
          </div>
        ))}
      </div>
      /*** MODALE D'AFFICHAGE DES IMAGES ***/
      {/* La modale apparaît uniquement lorsqu'une image est sélectionnée. */}
      {selectedIndex !== null && (
        <div className="imageModal" onClick={() => setSelectedIndex(null)}>
          {/* Bouton de fermeture de la modale. */}
          <button
            className="modalClose"
            onClick={() => setSelectedIndex(null)}
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Bouton de navigation vers l'image précédente. */}
          <button
            className="modalArrow modalPrev"
            onClick={prevImage}
            aria-label="Image précédente"
          >
            &#10094;
          </button>

          {/* Image sélectionnée en grand format. */}
          <img
            src={`/img/graph/${projetsRandom[selectedIndex]}`}
            alt={projetsRandom[selectedIndex]}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Bouton de navigation vers l'image suivante. */}
          <button
            className="modalArrow modalNext"
            onClick={nextImage}
            aria-label="Image suivante"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
