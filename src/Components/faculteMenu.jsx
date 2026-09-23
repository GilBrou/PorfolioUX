/****** MENU FACULTÉ : ACCÈS RAPIDE AUX GUIDES THÉMATIQUES ******/

/**
 * Composant affichant les accès rapides vers les guides thématiques.
 */
export default function FaculteMenu() {
  return (
    <div className="upper" role="region" aria-labelledby="faculte-menu-heading">
      {/* Titre principal utilisé par aria-labelledby. */}
      <h2 id="faculte-menu-heading">
        Vos ressources documentaires par disciplines
      </h2>

      {/* Conteneur des cartes de navigation. */}
      <div className="secondCardWrapper">
        {/* ---------- ARTS ET DESIGN ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/arts-design"
          className="secondCard secondCard1"
          aria-label="Accéder au guide thématique Arts et Design"
        >
          <p>Arts</p>
          <p>Design</p>
        </a>

        {/* ---------- DROIT / ÉCONOMIE / GESTION ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/droit-economie-gestion"
          className="secondCard secondCard2"
          aria-label="Accéder au guide thématique Droit, Économie et Gestion"
        >
          <p>Droit</p>
          <p>Économie</p>
          <p>Gestion</p>
        </a>

        {/* ---------- LETTRES / LANGUES / HISTOIRE ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/lettres-langues-histoire"
          className="secondCard secondCard3"
          aria-label="Accéder au guide thématique Lettres, Langues et Histoire"
        >
          <p>Lettres</p>
          <p>Langues</p>
          <p>Histoire</p>
        </a>

        {/* ---------- PSYCHOLOGIE ET SCIENCES SOCIALES ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/psychologie-sciences-sociales"
          className="secondCard secondCard4"
          aria-label="Accéder au guide thématique Psychologie et Sciences sociales"
        >
          <p>Psychologie</p>
        </a>

        {/* ---------- SCIENCES ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/sciences"
          className="secondCard secondCard5"
          aria-label="Accéder au guide thématique Sciences"
        >
          <p>Sciences</p>
        </a>

        {/* ---------- STAPS ---------- */}
        <a
          href="/ressources-documentaires/guides-thematiques/staps"
          className="secondCard secondCard6"
          aria-label="Accéder au guide thématique STAPS"
        >
          <p>STAPS</p>
        </a>
      </div>
    </div>
  );
}