import { useState } from "react";
import projetsGraph from "../datas/projetsGraph.json";

export default function Projet04GRAPH(data) {
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container graphCont">
      <h3 className="secTitle01 secTitle02">Graphisme</h3>

      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedImage(d)}
          >
            <p>{d.replace(/\.webp$/, "")}</p>

            <img src={`/img/Graph/${d}`} className="img-responsive" alt={d} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="imageModal" onClick={() => setSelectedImage(null)}>
          <button
            className="modalClose"
            onClick={() => setSelectedImage(null)}
            aria-label="Fermer"
          >
            ×
          </button>

          <img
            src={`/img/Graph/${selectedImage}`}
            alt={selectedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
