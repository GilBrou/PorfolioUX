import { useState } from "react";
import projetsGraph from "../datas/projetsGraph.json";

export default function Projet04GRAPH(data) {
  const [projetsRandom] = useState(() =>
    [...projetsGraph].sort(() => Math.random() - 0.5),
  );

  return (
    <div className="container GraphCont">
      <h3 className="secTitle01 secTitle02">Graphisme</h3>

      <div className="row">
        {projetsRandom.map((d, i) => (
          <div key={`${d}-${i}`} className="Frame">
            <p>{d.replace(/\.webp$/, "")}</p>

            <img src={`/img/Graph/${d}`} className="img-responsive" alt={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
