import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";

/***PROJECTS MODULE***/
function Projets(props) {
  /*Tooltip*/
  function tTip() {
    const [tip, setTip] = useState(0);
    useEffect(() => {
      function incrementNum() {
        setTip(+1);
      }
      incrementNum();
    }, []);
    if (tip > 0) {
      return (
        <ReactTooltip
          id="techTip"
          place="bottom"
          textColor="#ffa101"
          arrowColor="#ffa101"
          border
          borderColor="#ffa101"
          effect="solid"
          backgroundColor="#222020"
        />
      );
    }
  }
  /*Main*/
  return (
    <section id="realisations">
      <div className="realisations">
        <h2 className="secTitle01">Réalisations</h2>
        <div className="container">
          <h3 className="secTitle01 secTitle02">Web</h3>

          {tTip()}
          {/*Project cards wrapper*/}
          <div className="row otherCardsFade">
            {props.data.projets
              ? props.data.projets.map(
                  (d, i) => (
                    {/*Project card*/},
                    (
                      <div key={d.pId} className="projectCard thathCard">
                        {/*Project image*/}
                        <img
                          src={d.pImg}
                          loading="lazy"
                          className="projectCardImg"
                          alt={d.pName}
                        />{" "}
                        <h2>{d.pName}</h2>
                        <h3>{d.pDescription}</h3>
                        <p>{d.pInfos}</p>
                        <div className="techs">
                          {d.technos.map((technos) => (
                            <img
                              key={technos.name}
                              loading="lazy"
                              src={technos.icon}
                              alt={technos.name}
                              data-tip={technos.name}
                              data-for="techTip"
                            />
                          ))}
                        </div>
                        <div className="buttonW">
                          <a
                            href={d.pSite}
                            className={d.bClassName}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button>{d.but1}</button>
                          </a>

                          <a
                            href={d.pCode}
                            className={d.b2ClassName}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button>{d.but2}</button>
                          </a>
                        </div>
                      </div>
                    )
                  ),
                )
              : "Loading..."}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Projets;
