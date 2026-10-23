import ecosysteme from "../datas/ecosysteme.json";

export default function Envir() {
  function renderEnvir(item, i) {
    return (
      <a
        className="ecoCard"
        key={"ecoCard" + i}
        href={item.url}
        target="_blank"
      >
        <h3 className="myEco">{item.name}</h3>
        <img
          src={"/img/icons/" + item.icon || "loading..."}
          alt={item.name || "loading..."}
        />
      </a>
    );
  }

  return ecosysteme ? (
    <div className="envir">
      <h2 className="secTitle01">ECOSYSTÈME NUMÉRIQUE</h2>
      {ecosysteme.map((item, i) => renderEnvir(item, i))}
    </div>
  ) : (
    <div className="envir">Loading...</div>
  );
}
