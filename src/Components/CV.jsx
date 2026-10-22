/*** GENERAL ***/
import myDatas from "../datas/data.json";

/*** CV MODULE ***/
export default function CV() {
  const data = myDatas.cv;

  return (
    <div className="cv">
      <h2 className="text-center">Mon CV</h2>
      <p>{data ? data.cvParagraph : "loading..."}</p>

      <a
        className="btn-169"
        href="/CV_Gillian_Brousse.pdf"
        download="CV_Gillian_Brousse.pdf"
      >
        <span className="btn-icon">
          <span></span>
        </span>
        <span className="btn-text">Télécharger</span>
      </a>
    </div>
  );
}
