import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";

import Projet01UX from "./Projet01UX";
import Projet02LMS from "./Projet02LMS";
import Projet03DEV from "./Projet03DEV";
import Projet04GRAPH from "./Projet04GRAPH";

/***PROJECTS MODULE***/
function Projets(props) {
  let myDevprojects = props.data.pDatas.projetsDev;
  let myGraphprojects = props.data.pDatas4;

  /*console.log(myGraphprojects);*/

  /*Tooltip*/
  function tTip() {
    const [tip, setTip] = useState(0);
    useEffect(() => {
      function incrementNum() {
        setTip(+1);
      }
      incrementNum();
    }, []);
    if (tip > 0) {
      return (
        <ReactTooltip
          id="techTip"
          place="bottom"
          textColor="#f9d696"
          arrowColor="#f9d696"
          border
          borderColor="#f9d696"
          effect="solid"
          backgroundColor="#222020"
        />
      );
    }
  }
  /*Main*/
  return (
    <section id="realisations">
      <div className="realisations">
        <h2 className="secTitle01">Exemples de réalisations</h2>
        <Projet01UX data={myDevprojects} />
        <Projet02LMS data={myDevprojects} />
        <Projet03DEV data={myDevprojects} />
        <Projet04GRAPH data={myGraphprojects} />
      </div>
    </section>
  );
}
export default Projets;
