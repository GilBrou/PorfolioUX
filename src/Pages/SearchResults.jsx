/***** PAGES : SEARCHRESULTS *****/

import { useLocation } from "react-router-dom";

/**
 * Récupère les paramètres de recherche présents dans l’URL.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Supprime les balises HTML d’une chaîne.
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, " ");
}

/**
 * Normalise un texte pour faciliter la recherche.
 */
function normalize(text = "") {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Retourne le chemin interne correspondant à un article WordPress.
 */
function getInternalPathFromPost(post) {
  const categories = Array.isArray(post?.categories) ? post.categories : [];
  const slug = post?.slug;

  if (!slug || categories.length === 0) {
    return null;
  }

  if (categories.includes(5)) return `/votre-bibliotheque/${slug}`;
  if (categories.includes(6)) return `/services/${slug}`;
  if (categories.includes(7)) return `/ressources-documentaires/${slug}`;
  if (categories.includes(8)) return `/aide-formation/${slug}`;
  if (categories.includes(9)) return `/appui-a-la-recherche/${slug}`;
  if (categories.includes(10)) {
    return `/votre-bibliotheque/equipements-a-disposition/${slug}`;
  }
  if (categories.includes(11)) {
    return `/ressources-documentaires/guides-thematiques/${slug}`;
  }
  if (categories.includes(35)) {
    return `/ressources-documentaires/guides-thematiques/lettres-langues-histoire/${slug}`;
  }
  if (categories.includes(36)) {
    return `/ressources-documentaires/guides-thematiques/droit-economie-gestion/${slug}`;
  }

  return null;
}

/**
 * Page affichant les résultats de recherche internes.
 */
export default function SearchResults({ posts }) {
  const query = useQuery();
  const q = query.get("q") || "";
  const normalizedQuery = normalize(q.trim());

  const allPosts = Array.isArray(posts) ? posts : [];

  if (!normalizedQuery) {
    return (
      <div className="pageType pageTypeBU">
        <div className="mainZone">
          <div className="mainArticle">
            <h2>Recherche dans les pages de la BU</h2>

            <p aria-live="polite">
              Saisissez un mot-clé dans la barre de recherche du header.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const matchedPosts = allPosts.filter((post) => {
    const title = normalize(post.title?.rendered || "");
    const content = normalize(stripHtml(post.content?.rendered || ""));

    return title.includes(normalizedQuery) || content.includes(normalizedQuery);
  });

  const results = matchedPosts
    .map((post) => {
      const path = getInternalPathFromPost(post);

      if (!path) {
        return null;
      }

      const excerpt = stripHtml(
        post.excerpt?.rendered || post.content?.rendered || "",
      ).slice(0, 240);

      return {
        id: post.id,
        path,
        titleHtml: post.title?.rendered || "(Sans titre)",
        excerpt,
      };
    })
    .filter(Boolean);

  return (
    <div className="pageType pageTypeBU">
      <div className="mainZone">
        <div className="mainArticle">
          <h2>
            Résultats pour&nbsp;: <em>{q}</em>
          </h2>

          <p aria-live="polite">
            {results.length} page{results.length > 1 ? "s" : ""} trouvée
            {results.length > 1 ? "s" : ""}.
          </p>

          {results.length === 0 && (
            <p aria-live="polite">Aucune page interne ne contient ce terme.</p>
          )}

          {results.length > 0 && (
            <ul className="searchResultsList" role="list">
              {results.map((res) => (
                <li key={res.id} className="searchResultItem" role="listitem">
                  <a
                    href={res.path}
                    className="searchResultLink"
                    aria-label={`Aller à la page : ${stripHtml(
                      res.titleHtml,
                    ).trim()}`}
                  >
                    <h3
                      className="searchResultTitle"
                      dangerouslySetInnerHTML={{ __html: res.titleHtml }}
                    />

                    {res.excerpt && (
                      <p className="searchResultExcerpt">{res.excerpt}…</p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}