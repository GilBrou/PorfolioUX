/*** IMPORT DES DONNÉES ***/
import myDatas from "../datas/data.json";

/***** MODULE CV *****/

export default function CV() {
  // Récupère les informations du CV depuis le fichier JSON.
  const data = myDatas.cv;

  /*** AFFICHAGE DES PARAGRAPHES ***/

  // Génère un paragraphe pour chaque élément du tableau.
  function DisplayParagCV(myP, i) {
    return <p key={"myp" + i}>{myP}</p>;
  }

  /*** STRUCTURE DU CV ***/

  return (
    <div className="cv">
      {/* Titre de la rubrique. */}
      <h2 className="text-center">Mon CV</h2>

      <div className="cvWrapper">
        {/* Visuel associé au CV. */}
        <div className="cvWrapperA">
          <img
            className="cvImg"
            loading="lazy"
            src="./img/cvImg.webp"
            alt=""
          />{" "}
        </div>

        {/* Présentation du CV à partir des paragraphes du fichier JSON. */}
        <div className="cvWrapperB">
          {data.cvParagraph?.map((myP, i) => DisplayParagCV(myP, i))}
        </div>
      </div>

      {/* Lien permettant de télécharger le CV au format PDF. */}
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
