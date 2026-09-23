/* EspaceAccueil */

/**
 * Composant affichant le contenu d’accueil provenant de WordPress.
 */
export default function EspaceAccueil(props) {
  /* console.log(props); */

  /**
   * Sécurise la récupération des posts.
   */
  const posts = Array.isArray(props.posts) ? props.posts : [];

  /**
   * Affiche le premier post appartenant à la catégorie 63.
   */
  function postCategorie63() {
    const post = posts.find(
      (postItem) =>
        Array.isArray(postItem?.categories) &&
        postItem.categories.map(String).includes("63"),
    );

    // Aucun contenu trouvé pour cette catégorie.
    if (!post) {
      return null;
    }

    return (
      <div className="postCategorie63">
        <div
          className="ImportFromWPApi"
          dangerouslySetInnerHTML={{
            __html: post.content?.rendered || "",
          }}
          aria-label="Contenu d’accueil"
        />
      </div>
    );
  }

  return <div className="mainZone">{postCategorie63()}</div>;
}