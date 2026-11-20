/***** LOADER COMPONENT *****/

/**
 * Composant de chargement affiché pendant l'initialisation du site.
 * Présente le logo et l'animation de chargement.
 */
export default function Loader() {
  return (
    <div className="loader-container">
      {/* Logo du site avec son texte alternatif pour l'accessibilité. */}
      <img
        src="/img/GbLogo.webp"
        alt="logo de Gillian Brousse, UI/UX Designer - Digital Learning"
      />

      {/* Élément dédié à l'animation du chargement via CSS. */}
      <div className="loader"></div>
    </div>
  );
}
