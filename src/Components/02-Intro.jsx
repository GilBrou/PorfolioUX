/***INTRO MODULE***/
import { Fragment } from "react";

export default function Intro({ data }) {
  function DisplayIntro(myTxt, i) {
    return (
      <Fragment key={"myTxt" + i}>
        <p>{myTxt}</p>
        <br />
      </Fragment>
    );
  }
  return data ? (
    <div className="intro">
      <div className="introBox">
        <div className="introPart ileft">
          <h2 className="secTitle01">{data.title}</h2>

          {data?.paragraphIntro?.map((myTxt, i) => DisplayIntro(myTxt, i))}
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
