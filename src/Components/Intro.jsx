/***INTRO MODULE***/

export default function Intro({ data }) {
  console.log(data);
  /*
props.data.title
props.data.paragraphIntro
props.data.photoIntro
props.data.photoAlt*/

  return data ? (
    <div className="intro">
      <div className="introBox">
        <div className="introPart ileft">
          <h2>{data.title}</h2>

          <p>{data.paragraphIntro}</p>
          <br />
          <p>{data.paragraphIntro2}</p>
          <br />

          <p>{data.paragraphIntro3}</p>
        </div>

        <div className="introPart iright">
          <img src={data.photoIntro} alt={data.photoAlt} />
        </div>
      </div>
    </div>
  ) : (
    <div className="intro">Loading...</div>
  );
}
