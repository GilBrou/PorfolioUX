/****** PAGE MENTIONS LÉGALES ******/

/*** PAGES ET COMPOSANTS ***/
import Ariane from "../Components/Ariane.jsx";

/**
 * Page des mentions légales du site.
 */
export default function PageMentions() {



  return (
    <div className="pageType pageTypeBU pagesSommaires">
      <Ariane data="Mentions légales" />

      <div className="mainZone">
        <h2>Mentions légales</h2>

        <div
          className="ImportFromWPApi"
          role="region"
          aria-label="Informations légales du site"
        >
          {/* Bloc direction de publication. */}
          <div className="mentionDiv">
            <h3>Directrice de publication :</h3>

            <p>Anne-Laurence Mennessier.</p>

            <a href="mailto:anne-laurence.mennessier@unimes.fr">
              anne-laurence.mennessier@unimes.fr
            </a>
          </div>



          {/* Bloc administration du site web. */}
          <div className="mentionDiv">
            <h3>Administrateur Web :</h3>

            <p>Anthony Herrada</p>

            <a href="mailto:anthony.herrada@unimes.fr">
              anthony.herrada@unimes.fr
            </a>
          </div>

          {/* Bloc hébergement du site. */}
          <div className="mentionDiv">
            <h3>Hébergeur :</h3>

            <p>Nîmes Université</p>
          </div>
        </div>
      </div>
    </div>
  );
}