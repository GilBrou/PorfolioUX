/***** PROJET 01 - UI / UX COMPONENT *****/

import { useState, useEffect } from "react";
import projetsGraph from "../datas/projetsUX.json";

/*** UI / UX PROJECT MODULE ***/

export default function Projet01UX() {
  /**
   * Initialise une liste de projets dans un ordre aléatoire.
   * Le mélange est effectué une seule fois au montage du composant.
   */
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  // Stocke l'index de l'image actuellement affichée dans la modale.
  // La valeur null indique qu'aucune image n'est sélectionnée.
  const [selectedIndex, setSelectedIndex] = useState(null);

  /**
   * Bloque le défilement de la page lorsque la modale est ouverte.
   * Restaure les propriétés CSS initiales à sa fermeture
   * ou lors du démontage du composant.
   */
  useEffect(() => {
    if (selectedIndex !== null) {
      // Empêche le défilement sur l'ensemble de la page.
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Réinitialise les propriétés CSS lorsque la modale est fermée.
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Restaure le défilement à la fermeture ou au démontage.
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [selectedIndex]);

  /*** NAVIGATION DANS LA MODALE ***/

  /**
   * Affiche l'image suivante dans la galerie.
   * Revient à la première image lorsque la fin de la liste est atteinte.
   */
  const nextImage = (e) => {
    e.stopPropagation();

    setSelectedIndex((prev) => (prev + 1) % projetsRandom.length);
  };

  /**
   * Affiche l'image précédente dans la galerie.
   * Revient à la dernière image lorsque le début de la liste est atteint.
   */
  const prevImage = (e) => {
    e.stopPropagation();

    setSelectedIndex(
      (prev) => (prev - 1 + projetsRandom.length) % projetsRandom.length,
    );
  };

  /*** AFFICHAGE DE LA GALERIE ***/

  return (
    <div className="container UXCont">
      {/* TITRE DE LA CATÉGORIE */}
      <h3 className="secTitle01 secTitle02">UI / UX</h3>

      {/* GALERIE DE MINIATURES */}
      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedIndex(i)}
          >
            {/* Miniature : ouvre l'image originale dans la modale. */}
            <img src={`/img/Ux/mini/${d}`} className="img-responsive" alt={d} />
          </div>
        ))}
      </div>

      {/* MODALE : AFFICHAGE DE L'IMAGE SÉLECTIONNÉE */}
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

          {/* Image originale : le clic est isolé pour éviter la fermeture. */}
          <img
            src={`/img/Ux/${projetsRandom[selectedIndex]}`}
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
