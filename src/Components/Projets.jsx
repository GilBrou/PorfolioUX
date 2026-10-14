import { useEffect, useState } from "react";

import Projet01UX from "./Projet01UX";
import Projet02LMS from "./Projet02LMS";
import Projet03DEV from "./Projet03DEV";
import Projet04GRAPH from "./Projet04GRAPH";

/***PROJECTS MODULE***/
function Projets() {
  /*Tooltip*/

  /*Main*/
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
}
export default Projets;
