import { useState, useEffect } from "react";
import projetsGraph from "../datas/projetsUX.json";

export default function Projet01UX() {
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Bloquer le scroll lorsque la modale est ouverte
  useEffect(() => {
    if (selectedIndex !== null) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Restaurer le scroll à la fermeture ou au démontage
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [selectedIndex]);

  // Image suivante
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % projetsRandom.length);
  };

  // Image précédente
  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + projetsRandom.length) % projetsRandom.length,
    );
  };

  return (
    <div className="container UXCont">
      <h3 className="secTitle01 secTitle02">UI / UX</h3>

      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedIndex(i)}
          >
            {/* Miniature */}
            <img src={`/img/Ux/mini/${d}`} className="img-responsive" alt={d} />
          </div>
        ))}
      </div>

      {/* MODALE */}
      {selectedIndex !== null && (
        <div className="imageModal" onClick={() => setSelectedIndex(null)}>
          {/* Bouton fermer */}
          <button
            className="modalClose"
            onClick={() => setSelectedIndex(null)}
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Image précédente */}
          <button
            className="modalArrow modalPrev"
            onClick={prevImage}
            aria-label="Image précédente"
          >
            &#10094;
          </button>

          {/* Image originale */}
          <img
            src={`/img/Ux/${projetsRandom[selectedIndex]}`}
            alt={projetsRandom[selectedIndex]}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image suivante */}
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
