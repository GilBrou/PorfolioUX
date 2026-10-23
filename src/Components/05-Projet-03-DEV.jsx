import projetsDev from "../datas/projetsDev.json";

/*** PROJECTS MODULE ***/
export default function Projet03DEV() {
  let myproject = projetsDev.projetsDev;

  /* Tooltip */

  /* Main */
  return (
    <div className="container devCont">
      <h3 className="secTitle01 secTitle02">Développement</h3>

      {/* Project cards wrapper */}
      <div className="row otherCardsFade">
        {myproject
          ? myproject.map((d, i) => {
              return (
                <div key={d.pId ?? i} className="projectCard thathCard">
                  {/* Project image */}
                  <img
                    src={d.pImg}
                    loading="lazy"
                    className="projectCardImg"
                    alt={d.pName}
                  />

                  {/* Project title */}
                  <h2>{d.pName}</h2>

                  {/* Project description */}
                  <h3>{d.pDescription}</h3>

                  {/* Buttons */}
                  {(d.pSite || d.pCode) && (
                    <div className="buttonW">
                      {/* Website */}
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

                      {/* Source code */}
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
