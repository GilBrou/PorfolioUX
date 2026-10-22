/***GENERAL***/
import { Link } from "react-router-dom";
import myDatas from "../datas/data.json";

/***CV MODULE***/
export default function CV() {
  /**console.log(data);*/

  let data = myDatas.cv;

  return (
    <div className="cv">
      <h2 className="text-center">Mon CV</h2>
      <p>{data ? data.cvParagraph : "loading..."} </p>

      <button
        className="btn-169"
        href="./CV_Gillian_Brousse.pdf"
        download="CV_Gillian_Brousse.pdf"
      >
        <span className="btn-icon">
          <span></span>
        </span>
        <span className="btn-text">Télécharger</span>
      </button>
    </div>
  );
}
