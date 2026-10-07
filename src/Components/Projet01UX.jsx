import { useState } from "react";
import projetsGraph from "../datas/projetsUX.json";

export default function Projet01UX(data) {
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container UXCont">
      <h3 className="secTitle01 secTitle02">UI / UX</h3>

      <div className="row">
        {projetsRandom.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className="Frame"
            onClick={() => setSelectedImage(d)}
          >
            <img src={`/img/Ux/${d}`} className="img-responsive" alt={d} />
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
            src={`/img/Ux/${selectedImage}`}
            alt={selectedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
