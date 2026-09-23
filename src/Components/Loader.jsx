/*** LOADER ***/

/**
 * Loader hexagonal stylisé.
 */
export default function Loader() {
  return (
    <div
      className="socketWrap"
      role="status"
      aria-live="polite"
      aria-label="Chargement du site de la bibliothèque universitaire"
    >
      {/* Logo affiché au-dessus du loader. */}
      <img
        src="/img/Logo.webp"
        className="logoLoader"
        alt="Logo Nîmes Université"
      />

      {/* Animation de chargement hexagonale. */}
      <div className="socket" aria-hidden="true">
        {/* Élément central du loader. */}
        <Gel className="center-gel" />

        {/* Première couronne du loader. */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Gel key={`c${index + 1}`} className={`c${index + 1} r1`} />
        ))}

        {/* Deuxième couronne du loader. */}
        {Array.from({ length: 12 }).map((_, index) => (
          <Gel key={`c${index + 7}`} className={`c${index + 7} r2`} />
        ))}

        {/* Troisième couronne du loader. */}
        {Array.from({ length: 19 }).map((_, index) => (
          <Gel key={`c${index + 19}`} className={`c${index + 19} r3`} />
        ))}
      </div>
    </div>
  );
}

/**
 * Cellule hexagonale utilisée dans l’animation du loader.
 */
function Gel({ className }) {
  return (
    <div className={`gel ${className}`}>
      <div className="hex-brick h1"></div>
      <div className="hex-brick h2"></div>
      <div className="hex-brick h3"></div>
    </div>
  );
}