import { useState } from "react";
import projetsGraph from "../datas/projetsGraph.json";

export default function Projet04GRAPH(data) {
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

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
    <div className="container graphCont">
      <h3 className="secTitle01 secTitle02">Graphisme</h3>

      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedIndex(i)}
          >
            {/* Miniature */}
            <img
              src={`/img/graph/mini/${d}`}
              className="img-responsive"
              alt={d}
            />
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

          {/* Flèche précédente */}
          <button
            className="modalArrow modalPrev"
            onClick={prevImage}
            aria-label="Image précédente"
          >
            &#10094;
          </button>

          {/* Image originale */}
          <img
            src={`/img/graph/${projetsRandom[selectedIndex]}`}
            alt={projetsRandom[selectedIndex]}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Flèche suivante */}
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
