/*** PROJECTS MODULE ***/

export default function Projet04GRAPH(data) {
  console.log(data.data);

  return (
    <div className="container">
      <h3 className="secTitle01 secTitle02">Graphisme</h3>

      <div className="row otherCardsFade"></div>

      <div className="row linedArt">
        <div className="portfolio-items illus">
          {data.data?.map((d, i) => (
            <div
              key={`${d.title}-${i}`}
              className="col-sm-5 col-md-2 col-lg-2 Frame"
            >
              <div className="portfolio-item">
                <div className="hover-bg">
                  <a href={d.largeImage} title={d.title}>
                    <img
                      src={d.smallImage}
                      className="img-responsive"
                      alt={d.title}
                    />{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
