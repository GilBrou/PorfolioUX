/****** PAGESBU : AFFICHAGE D’UN ARTICLE WORDPRESS VIA L’API ******/

import { useEffect, useMemo } from "react";

/*** PAGES ET COMPOSANTS ***/
import Ariane from "../Components/Ariane.jsx";
import LeftSommaire from "../Components/LeftSommaire.jsx";
import WpContentIsolated from "../Utils/WpContentIsolated.jsx";

/**
 * Page d’affichage d’un article WordPress.
 *
 * Elle affiche :
 * - le fil d’Ariane ;
 * - le sommaire latéral si la page utilise des ancres ;
 * - le contenu WordPress isolé ;
 * - le sommaire alphabétique pour le glossaire.
 */
export default function PagesBU(props) {
  const menu = props.menu;
  const posts = Array.isArray(props?.posts) ? props.posts : [];

  const FAQ_CATEGORY_ID = 31;
  const ANCHOR_CATEGORY_ID = 32;
  const TUILES_CATEGORY_ID = 50;

  const currentSlug =
    window.location.pathname.split("/").filter(Boolean).pop() || "";

  const isSpecialFAQPage =
    window.location.pathname === "/services/une-question-la-bu-vous-repond";

  const currentArticle = posts.find((post) => post?.slug === currentSlug) || null;

  const isFAQ =
    Array.isArray(currentArticle?.categories) &&
    currentArticle.categories.includes(FAQ_CATEGORY_ID);

  const isAnchors =
    Array.isArray(currentArticle?.categories) &&
    currentArticle.categories.includes(ANCHOR_CATEGORY_ID);

  const isTuiles =
    Array.isArray(currentArticle?.categories) &&
    currentArticle.categories.includes(TUILES_CATEGORY_ID);

  const isGlossaire = currentArticle?.slug === "glossaire";

  const showLeftSommaire = isAnchors && !isTuiles;

  /**
   * Récupère le texte des titres H2 pour construire les ancres du sommaire.
   */
  const anchors = useMemo(() => {
    if (!currentArticle?.content?.rendered) {
      return [];
    }

    if (isTuiles || isSpecialFAQPage) {
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(
      currentArticle.content.rendered,
      "text/html",
    );

    return Array.from(doc.querySelectorAll("h2")).map(
      (element) => element.textContent?.trim() || "",
    );
  }, [currentArticle, isTuiles, isSpecialFAQPage]);

  /**
   * Récupère le texte des titres H3 pour les ancres de la FAQ spéciale.
   */
  const anchorsFAQ = useMemo(() => {
    if (!currentArticle?.content?.rendered) {
      return [];
    }

    if (!isSpecialFAQPage) {
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(
      currentArticle.content.rendered,
      "text/html",
    );

    return Array.from(doc.querySelectorAll("h3")).map(
      (element) => element.textContent?.trim() || "",
    );
  }, [currentArticle, isSpecialFAQPage]);

  /**
   * Récupère les titres H2 uniquement pour la page glossaire.
   */
  const glossaireH2Titles = useMemo(() => {
    if (!currentArticle?.content?.rendered) {
      return [];
    }

    if (currentArticle?.slug !== "glossaire") {
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(
      currentArticle.content.rendered,
      "text/html",
    );

    return Array.from(doc.querySelectorAll("h2"))
      .map((element) => element.textContent?.trim() || "")
      .filter(Boolean);
  }, [currentArticle]);

  /**
   * Positionne le glossaire sur la lettre A si aucune ancre n’est présente.
   */
  useEffect(() => {
    if (!isGlossaire) {
      return;
    }

    const currentHash = window.location.hash || "";

    if (!currentHash) {
      window.location.hash = "#letter-A";
    }
  }, [isGlossaire]);

  /**
   * Affiche le sommaire alphabétique du glossaire.
   */
  function checkGloss(slug) {
    if (!slug || !slug.includes("glossaire")) {
      return null;
    }

    const alphabet = Array.from({ length: 26 }, (_, index) =>
      String.fromCharCode(65 + index),
    );

    const normalizeFirstLetter = (text) =>
      (text || "")
        .trim()
        .charAt(0)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

    return (
      <div className="glossaireSommaire" aria-label="Sommaire du glossaire">
        {alphabet.map((letter) => {
          const hasLetter = glossaireH2Titles.some(
            (title) => normalizeFirstLetter(title) === letter,
          );

          return (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className={`glossLetter${hasLetter ? "" : " is-empty"}`}
              aria-label={
                hasLetter
                  ? `Afficher les entrées commençant par ${letter}`
                  : `Aucune entrée pour la lettre ${letter}`
              }
            >
              {letter}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="pageType pageTypeBU">
      <Ariane data={posts} />

      <div className="mainZone">
        {showLeftSommaire && (
          <LeftSommaire data={menu} ancres={anchors} ancresFAQ={anchorsFAQ} />
        )}

        <div
          className="mainArticle"
          role="region"
          aria-label="Contenu de la page de la bibliothèque universitaire"
        >
          {currentArticle && (
            <>
              <h1
                className="pageTitle"
                dangerouslySetInnerHTML={{
                  __html: currentArticle.title?.rendered || "",
                }}
              />

              {checkGloss(currentSlug)}

              <WpContentIsolated
                key={`article-${currentArticle.id}`}
                className="ImportFromWPApi"
                html={currentArticle.content?.rendered}
                origin="https://bu.comu.unimes.fr"
                isFAQ={isFAQ}
                isAnchors={isAnchors}
                isTuiles={isTuiles}
                isGlossaire={isGlossaire}
                extraCss={[
                  "/wp-includes/css/dist/block-library/style.min.css",
                  "/wp-includes/css/classic-themes.min.css",
                  "/wp-content/themes/academica/style.css?ver=6.8.3",
                  "/wp-content/themes/academica/media-queries.css?ver=1.0",
                  "/wp-content/themes/academica/assets/css/blocks.css",
                  "/wp-content/themes/academica/assets/css/responsive.css",
                ]}
                customCss={`...`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}