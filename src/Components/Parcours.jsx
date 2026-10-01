/***CARRER MODULE***/
function Parcours(props) {
  return (
    <div className="parcours">
      <h2 className="secTitle01">Mon parcours</h2>

      <div className="container">
        <div className="row">
          <div className="outer">
            {props.data
              ? props.data.map((d, i) => (
                  <div key={"card" + i} className="card">
                    <div className="info">
                      <h3 className="title">{d.parcoursTitle1}</h3>

                      <a
                        className="subTitle"
                        target="_blank"
                        rel="noreferrer"
                        href={d.link}
                      >
                        {d.parcoursSubTitle}
                      </a>

                      <h3 className="title2">{d.parcoursTitle2}</h3>

                      <div className="inContent">
                        <img
                          className="cardImg"
                          loading="lazy"
                          src={d.parcoursImg}
                          alt={d.parcoursImgAlt}
                        />{" "}
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

export default Parcours;
