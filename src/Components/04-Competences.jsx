/***** COMPETENCES COMPONENT *****/

/*** COMP MODULE ***/

export default function Comp({ data }) {
  /**
   * Génère une carte de compétences.
   * Affiche le titre de la catégorie et ses différents paragraphes.
   */
  function renderComp(item, i) {
    return (
      <div className="myCompCard" key={"myCompCard" + i}>
        {/* Titre de la catégorie de compétences. */}
        <h3 className="myComp">{item.titreComp}</h3>

        {/* Génération des paragraphes associés à la catégorie. */}
        {item.paragComp.map((item, i) => renderComp2(item, i))}
      </div>
    );
  }

  /**
   * Génère un paragraphe de compétence.
   * Met en évidence la première partie du texte en gras.
   */
  function renderComp2(item, i) {
    return (
      <div className="pComp" key={"pComp" + i}>
        <p>
          {" "}
          <strong>{item.boldp}</strong> {item.pcomp}
        </p>
      </div>
    );
  }

  /*** AFFICHAGE DES COMPÉTENCES ***/

  // Affiche les données lorsqu'elles sont disponibles.
  return data ? (
    <div className="comp">
      {/* Titre principal de la rubrique. */}
      <h2 className="secTitle01">{data.title}</h2>

      {/* Conteneur des différentes catégories de compétences. */}
      <div className="compPart">
        {data.comps.map((item, i) => renderComp(item, i))}
      </div>
    </div>
  ) : (
    // Affiche un message temporaire si les données ne sont pas disponibles.
    <div className="comp">Loading...</div>
  );
}
