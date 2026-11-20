/***** PARCOURS COMPONENT *****/

/*** CAREER MODULE ***/

export default function Parcours(props) {
  return (
    <div className="parcours">
      {/* TITRE DE LA RUBRIQUE */}
      <h2 className="secTitle01">Mon parcours</h2>

      {/* CONTENEUR PRINCIPAL */}
      <div className="container">
        <div className="row">
          <div className="outer">
            {/* GÉNÉRATION DES CARTES DU PARCOURS */}
            {props.data
              ? props.data.map((d, i) => (
                  <div key={"card" + i} className="card">
                    <div className="info">
                      {/* TITRE PRINCIPAL : diplôme, formation ou expérience. */}
                      <h3 className="title">{d.parcoursTitle1}</h3>

                      {/* LIEN EXTERNE ASSOCIÉ À LA FORMATION OU À L'EXPÉRIENCE. */}
                      <a
                        className="subTitle"
                        target="_blank"
                        rel="noreferrer"
                        href={d.link}
                      >
                        {d.parcoursSubTitle}
                      </a>

                      {/* TITRE SECONDAIRE : précision complémentaire. */}
                      <h3 className="title2">{d.parcoursTitle2}</h3>

                      {/* CONTENU DE LA CARTE : image et description. */}
                      <div className="inContent">
                        <img
                          className="cardImg"
                          loading="lazy"
                          src={d.parcoursImg}
                          alt={d.parcoursImgAlt}
                        />{" "}
                        {/* Description de la formation ou de l'expérience. */}
                        <p>{d.parcoursParagraph}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
