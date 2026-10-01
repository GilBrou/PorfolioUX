/***INTRO MODULE***/

export default function Intro({ data }) {
  return data ? (
    <div className="intro">
      <div className="introBox">
        <div className="introPart ileft">
          <h2 className="secTitle01">{data.title}</h2>

          <p>{data.paragraphIntro}</p>
          <br />
          <p>{data.paragraphIntro2}</p>
          <br />

          <p>{data.paragraphIntro3}</p>
        </div>

        <div className="introPart iright">
          <div className="imgwrap">
            <img src={data.photoIntro} alt={data.photoAlt} className="myImg" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="intro">Loading...</div>
  );
}
