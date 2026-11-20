/***** COMPOSANT D'ARRIÈRE-PLAN ANIMÉ *****/

import { useMemo } from "react";

export default function AnimatedBackground() {
  /*** LISTE DES ICÔNES À ANIMER ***/

  const icons = [
    // Icônes liées au design UX/UI et au développement.
    "fa-palette",
    "fa-layer-group",
    "fa-eye",
    "fa-code",
    "fa-code-branch",
    "fa-graduation-cap",
    "fa-pen",
    "fa-lightbulb",
    "fa-book-open",
  ];

  /*** GÉNÉRATION DES STYLES ALÉATOIRES ***/

  // Calcule les propriétés visuelles de chaque icône une seule fois.
  const styles = useMemo(() => {
    return icons.map(() => {
      // Position horizontale de l'icône dans la fenêtre.
      const randLeft = Math.floor(Math.random() * 90) + 1;

      // Taille aléatoire de l'icône.
      const randFontSize = Math.floor(Math.random() * 1.5) + 1.5;

      // Angle de rotation initial.
      const randRotation = Math.floor(Math.random() * 360) + 1;

      // Délai aléatoire avant le démarrage de l'animation.
      const randDelay = Math.floor(Math.random() * 5) + 1;

      // Durée aléatoire de l'animation.
      const randDuration = Math.floor(Math.random() * 30) + 30;

      // Regroupe les propriétés CSS générées pour chaque icône.
      return {
        position: "absolute",
        left: `${randLeft}vw`,
        fontSize: `${randFontSize}vw`,
        transform: `rotate(${randRotation}deg)`,
        animationDelay: `${randDelay}s`,
        animationDuration: `${randDuration}s`,
      };
    });
  }, []);

  /*** AFFICHAGE DE L'ARRIÈRE-PLAN ***/

  return (
    <div className="presContainer" aria-hidden="true">
      {/* Affiche chaque icône avec ses styles et son animation propres. */}
      {icons.map((icon, i) => (
        <i
          key={i}
          className={`fa ${icon}`}
          style={styles[i]}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
