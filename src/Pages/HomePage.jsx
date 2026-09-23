/****** HOMEPAGE ******/

/**
 * Nettoie et sécurise le HTML d’une vignette WordPress.
 * 
 
 */
function cleanVignetteHTML(html) {
  if (!html || typeof html !== "string") {
    return "";
  }

  let out = html;

  // Supprime les suffixes de dimensions ajoutés aux images WordPress.
  out = out.replace(/-\d{2,4}x\d{2,4}(\.[a-z]{3,4})/gi, "$1");

  // Force les images en HTTPS lorsque l’URL est en HTTP.
  out = out.replace(
    /(<img[^>]+src=["'])http:\/\/(?!\/)([^"']+)(["'][^>]*>)/gi,
    "$1https://$2$3",
  );

  return out;
}

function formatRSSDate(pubDate) {
  const date = new Date(pubDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/*
console.log(formatRSSDate(value));
*/

/**
 * Page d’accueil affichant les actualités de la bibliothèque universitaire.
 */
export default function HomePage(props) {
  const actus = Array.isArray(props?.actus) ? props.actus : [];

  /**
   * Affiche une actualité avec sa vignette et son titre.
   */

  const renderActu = (actu, index) => (
    <a
      className="actuBox"
      href={actu?.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      key={actu?.id ?? `article-${index}`}
      aria-label={actu?.title || "Actualité de la bibliothèque universitaire"}
    >
      <div
        className="vign"
        dangerouslySetInnerHTML={{
          __html: cleanVignetteHTML(actu?.description || ""),
        }}
      />

      <div className="columnActu">
        <h4>{formatRSSDate(actu?.pubDate)}</h4>

        <h3>{actu?.title || "Sans titre"}</h3>
      </div>
    </a>
  );

  return (
    <div className="pageType">
      <div className="mainZone">
        {/* Titre de la zone des actualités. */}
        <h2 id="actus-heading" className="actus-heading">
          Les actualités de la BU
        </h2>

        <div
          className="actuWrapper"
          role="region"
          aria-labelledby="actus-heading"
        >
          {actus.length === 0 ? (
            <p className="muted">Aucune actualité à afficher pour le moment.</p>
          ) : (
            actus.slice(0, 4).map(renderActu)
          )}
        </div>
      </div>
    </div>
  );
}
