import ecosysteme from "../datas/ecosysteme.json";

/***** ENVIRONNEMENT NUMÉRIQUE *****/

export default function Envir() {
  /*** GÉNÉRATION DES CARTES ***/

  // Crée une carte pour chaque élément de l'écosystème numérique.
  function renderEnvir(item, i) {
    return (
      <a
        className="ecoCard"
        key={"ecoCard" + i}
        href={item.url}
        target="_blank"
      >
        {/* Icône représentant l'outil ou le service. */}
        <img
          src={"/img/icons/" + item.icon || "loading..."}
          alt={item.name || "loading..."}
        />
      </a>
    );
  }

  /*** AFFICHAGE DE L'ÉCOSYSTÈME ***/

  return ecosysteme ? (
    <div className="envir">
      {/* Titre de la rubrique. */}
      <h2 className="secTitle01">ECOSYSTÈME NUMÉRIQUE</h2>

      {/* Parcourt les données JSON pour afficher chaque carte. */}
      {ecosysteme.map((item, i) => renderEnvir(item, i))}
    </div>
  ) : (
    // Message affiché si les données ne sont pas disponibles.
    <div className="envir">Loading...</div>
  );
}
