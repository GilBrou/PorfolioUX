/*** GENERAL ***/
import myDatas from "../datas/data.json";

/*** CV MODULE ***/
export default function CV() {
  const data = myDatas.cv;

  function DisplayParagCV(myP, i) {
    return <p key={"myp" + i}>{myP}</p>;
  }

  return (
    <div className="cv">
      <h2 className="text-center">Mon CV</h2>

      <div className="cvWrapper">
        <div className="cvWrapperA">
          <img
            className="cvImg"
            loading="lazy"
            src="./img/cvImg.webp"
            alt=""
          />{" "}
        </div>

        <div className="cvWrapperB">
          {data.cvParagraph?.map((myP, i) => DisplayParagCV(myP, i))}
        </div>
      </div>
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
