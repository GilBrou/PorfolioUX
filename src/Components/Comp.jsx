/***COMP MODULE***/

export default function Comp({ data }) {
  function renderComp(item, i) {
    console.log(item);

    return (
      <div className="myCompCard" key={"myCompCard" + i}>
        <h3 className="myComp">{item.titreComp}</h3>
        {/*<div className="myCompDetails">tableau à venir</div>*/}
        {item.paragComp.map((item, i) => renderComp2(item, i))}
      </div>
    );
  }

  function renderComp2(item, i) {
    return (
      <div className="pComp" key={"pComp" + i}>
        <p>
          {" "}
          <strong>{item.boldp}</strong> {item.pcomp}
        </p>
      </div>
    );
  }

  return data ? (
    <div className="comp">
      <h2 className="secTitle01">{data.title}</h2>
      <div className="compPart">
        {data.comps.map((item, i) => renderComp(item, i))}
      </div>
    </div>
  ) : (
    <div className="comp">Loading...</div>
  );
}
