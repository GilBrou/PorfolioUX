/***** BANNER *****/

/*** IMPORTS GÉNÉRAUX ***/
import React, { useEffect, useMemo, useState } from "react";

import searchPrimo from "../Utils/PrimoConnect.jsx";

/*** IMAGES DU CARROUSEL ***/
import backgroundBis1 from "../style/background/backgroundBis-1.webp";
import backgroundBis2 from "../style/background/backgroundBis-2.webp";
import backgroundBis5 from "../style/background/backgroundBis-5.webp";
import backgroundBis6 from "../style/background/backgroundBis-6.webp";
import backgroundBis7 from "../style/background/backgroundBis-7.webp";
import backgroundBis8 from "../style/background/backgroundBis-8.webp";
import backgroundBis9 from "../style/background/backgroundBis-9.webp";
import backgroundBis10 from "../style/background/backgroundBis-10.webp";
import backgroundBis11 from "../style/background/backgroundBis-11.webp";
import backgroundBis12 from "../style/background/backgroundBis-12.webp";
import backgroundBis13 from "../style/background/backgroundBis-13.webp";
import backgroundBis14 from "../style/background/backgroundBis-14.webp";
import backgroundBis15 from "../style/background/backgroundBis-15.webp";
import backgroundBis16 from "../style/background/backgroundBis-16.webp";
import backgroundBis17 from "../style/background/backgroundBis-17.webp";

/**
 * Banner principal avec carrousel et recherche Primo.
 */
export default function Banner({ isConnected = false }) {
  const slides = useMemo(
    () => [
      { className: "bg1", image: backgroundBis1, position: "center 27%" },
      { className: "bg2", image: backgroundBis5, position: "center 65%" },
      { className: "bg3", image: backgroundBis2, position: "center 50%" },
      { className: "bg4", image: backgroundBis6, position: "center 75%" },
      { className: "bg5", image: backgroundBis7, position: "center 25%" },
      { className: "bg6", image: backgroundBis8, position: "center 20%" },
      { className: "bg7", image: backgroundBis9, position: "center 65%" },
      { className: "bg8", image: backgroundBis10, position: "center 50%" },
      { className: "bg9", image: backgroundBis11, position: "center 75%" },
      { className: "bg10", image: backgroundBis12, position: "center 25%" },
      { className: "bg11", image: backgroundBis13, position: "center 30%" },
      { className: "bg12", image: backgroundBis14, position: "center 40%" },
      { className: "bg13", image: backgroundBis15, position: "center 40%" },
      { className: "bg14", image: backgroundBis16, position: "center 25%" },
      { className: "bg15", image: backgroundBis17, position: "center 50%" },
    ],
    [],
  );

  const [active, setActive] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState([0]);

  /********************************************
   * PRÉCHARGEMENT DES IMAGES
   ********************************************/
  useEffect(() => {
    const nextIndex = (active + 1) % slides.length;

    if (!loadedSlides.includes(nextIndex)) {
      const image = new Image();

      image.src = slides[nextIndex].image;

      image.onload = () => {
        setLoadedSlides((loaded) =>
          loaded.includes(nextIndex) ? loaded : [...loaded, nextIndex],
        );
      };
    }
  }, [active, loadedSlides, slides]);

  /********************************************
   * ROTATION AUTOMATIQUE DU CARROUSEL
   ********************************************/
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((index) => {
        const nextIndex = (index + 1) % slides.length;

        setLoadedSlides((loaded) =>
          loaded.includes(nextIndex) ? loaded : [...loaded, nextIndex],
        );

        return nextIndex;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /********************************************
   * RENDU
   ********************************************/
  return (
    <div
      className="carousel"
      style={{ position: "relative" }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrousel d’illustration de la bibliothèque"
    >
      {slides.map((slide, index) => {
        const isLoaded = loadedSlides.includes(index);

        return (
          <div
            key={slide.className}
            className={`carousel-item ${index === active ? "active" : ""}`}
            aria-hidden={index === active ? "false" : "true"}
            aria-label={`Slide ${index + 1} sur ${slides.length}`}
          >
            <div
              className={slide.className}
              style={
                isLoaded
                  ? {
                      backgroundImage: `url(${slide.image})`,
                      backgroundPosition: slide.position,
                    }
                  : undefined
              }
            />
          </div>
        );
      })}

      <PrimoSearch isConnected={isConnected} />
    </div>
  );
}

/***** PRIMO SEARCH *****/

/**
 * Barre de recherche Primo.
 */
function PrimoSearch({ isConnected = false }) {
  const [qTemp, setQTemp] = useState("");

  const actionUrl = "https://catalogue.scdi-montpellier.fr/nde/search";

  const vid = "33MON_INST:33UN_NDE";

  const searchScope = "UN_catalog";

  const tab = "UN_scope";

/*OLD compte lecteur*/
  /*const loginUrl = `https://catalogue.scdi-montpellier.fr/discovery/login?vid=${vid}`;*/
/*NEW compte lecteur*/

const loginUrl = "https://catalogue.scdi-montpellier.fr/nde/account/overview?vid=33MON_INST:33UN_NDE&lang=fr"


    /**
   * URL de la recherche avancée.
   */
  /*OLD version*/

  const primoQuery = `any,contains,${qTemp.replace(/[,]/g, " ")}`;

  const advancedUrl = `${actionUrl}?vid=${encodeURIComponent(
    vid,
  )}&search_scope=${encodeURIComponent(
    searchScope,
  )}&pcAvailabiltyMode=true&mode=advanced`;

  /*************/

  /*NEW version*/

  

/*
  const primoQuery = `any,contains,${qTemp.replace(/,/g, " ").trim()}`;
const advancedParams = new URLSearchParams({
  vid,
  search_scope: searchScope,
  tab,
  pcAvailabiltyMode: "true",
  mode: "advanced",
});

if (qTemp.trim()) {
  advancedParams.set("query", primoQuery);
}

const advancedUrl = `${actionUrl}?${advancedParams.toString()}`;

*/

/*************/

  /********************************************
   * ENVOI DE LA RECHERCHE
   ********************************************/
  function handlePrimoSubmit(event) {
    event.preventDefault();

    if (!qTemp.trim()) return;

    searchPrimo(event, isConnected);
  }

  /********************************************
   * RENDU
   ********************************************/
  return (
    <form
      id="prm-simple-search"
      name="search-form"
      method="get"
      action={actionUrl}
      
      encType="application/x-www-form-urlencoded; charset=utf-8"
      aria-label="Recherche dans le catalogue de la bibliothèque"
      className="primo-wrapper"
      onSubmit={handlePrimoSubmit}
    >
      <input type="hidden" name="vid" value={vid} />

      <input
        type="hidden"
        name="search_scope"
        value={searchScope}
      />

      <input
        type="hidden"
        name="tab"
        value={tab}
      />

      <input
        type="hidden"
        name="pcAvailabiltyMode"
        value="true"
      />

      <input
        type="hidden"
        name="query"
        value={primoQuery}
      />

      <div className="primo-mainbar">
        <div className="primo-input-wrapper">
          <input
            type="text"
            id="searchBar"
            placeholder="Rechercher dans le catalogue"
            value={qTemp}
            onChange={(event) => setQTemp(event.target.value)}
            autoComplete="off"
            aria-label="Rechercher dans le catalogue"
            className="primo-input"
          />

          <button
            type="submit"
            className="primo-submit"
            aria-label="Lancer la recherche"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              style={{ transform: "scale(-1, 1)" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3Z" />
            </svg>
          </button>
        </div>



        <a
          href={loginUrl}
          
          rel="noopener noreferrer"
          aria-label="Se connecter au compte lecteur"
          className="primo-account"
        >
          <svg
            width="18"
            height="18"
            fill="#E84E24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
          Compte lecteur
        </a>



      </div>


            {/* Filtres par type de ressource. */}
      <div className="resource-type-filter-bar">
        {/* Lien vers la recherche avancée. */}
        <a
          href={advancedUrl}
          
          rel="noopener noreferrer"
          className="primo-advanced"
        >
          Recherche avancée
        </a>
      </div>
    </form>
  );
}