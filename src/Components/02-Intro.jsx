/***** INTRO COMPONENT *****/

import { Fragment } from "react";

/*** INTRO MODULE ***/

export default function Intro({ data }) {
  /**
   * Génère un paragraphe de présentation.
   * Utilise un Fragment pour associer chaque paragraphe
   * à sa clé React sans ajouter de conteneur HTML supplémentaire.
   */
  function DisplayIntro(myTxt, i) {
    return (
      <Fragment key={"myTxt" + i}>
        <p>{myTxt}</p>
        <br />
      </Fragment>
    );
  }

  /*** AFFICHAGE DU CONTENU ***/

  // Affiche les données de présentation lorsqu'elles sont disponibles.
  return data ? (
    <div className="intro">
      <div className="introBox">
        {/* PARTIE GAUCHE : titre et paragraphes de présentation. */}
        <div className="introPart ileft">
          <h2 className="secTitle01">{data.title}</h2>

          {/* Génère les paragraphes à partir des données JSON. */}
          {data?.paragraphIntro?.map((myTxt, i) => DisplayIntro(myTxt, i))}
        </div>

        {/* PARTIE DROITE : photographie de présentation. */}
        <div className="introPart iright">
          <div className="imgwrap">
            <img src={data.photoIntro} alt={data.photoAlt} className="myImg" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    // Affiche un message temporaire si les données ne sont pas disponibles.
    <div className="intro">Loading...</div>
  );
}
