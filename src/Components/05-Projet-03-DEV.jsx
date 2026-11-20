/***** PROJET 03 - DEVELOPMENT COMPONENT *****/

import projetsDev from "../datas/projetsDev.json";

/*** PROJECTS MODULE ***/

export default function Projet03DEV() {
  // Récupère la liste des projets de développement depuis les données JSON.
  let myproject = projetsDev.projetsDev;

  /*** AFFICHAGE DES PROJETS ***/

  return (
    <div className="container devCont">
      {/* TITRE DE LA RUBRIQUE */}
      <h3 className="secTitle01 secTitle02">Développement</h3>

      {/* CONTENEUR DES CARTES PROJETS */}
      <div className="row otherCardsFade">
        {myproject
          ? myproject.map((d, i) => {
              return (
                <div key={d.pId ?? i} className="projectCard thathCard">
                  {/* Image illustrative du projet. */}
                  <img
                    src={d.pImg}
                    loading="lazy"
                    className="projectCardImg"
                    alt={d.pName}
                  />

                  {/* Nom du projet. */}
                  <h2>{d.pName}</h2>

                  {/* Description du projet. */}
                  <h3>{d.pDescription}</h3>

                  {/* BOUTONS DE NAVIGATION : affichés si au moins un lien existe. */}
                  {(d.pSite || d.pCode) && (
                    <div className="buttonW">
                      {/* Lien vers le site du projet. */}
                      {d.pSite && (
                        <a
                          className="urlButton"
                          href={d.pSite}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visiter le site
                        </a>
                      )}

                      {/* Lien vers le code source du projet. */}
                      {d.pCode && (
                        <a
                          className="urlButton"
                          href={d.pCode}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Parcourir le code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}
