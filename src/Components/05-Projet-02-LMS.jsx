/***** PROJET 02 - DIGITAL LEARNING / LMS COMPONENT *****/

import { useEffect, useRef } from "react";
import chiffres from "../datas/projetsLMS.json";
import data from "../datas/data.json";

/*** PROJECTS MODULE ***/

export default function Projet02LMS() {
  // Récupère les réalisations depuis les données locales.
  let myrealsP = data.real;

  // Référence à la section contenant les compteurs.
  const sectionRef = useRef(null);

  // Stocke les identifiants des intervalles des compteurs animés.
  const countersRef = useRef([]);

  /**
   * Gère l'animation des compteurs numériques.
   * Déclenche l'animation lorsque la section entre dans la zone visible
   * et interrompt les animations lorsqu'elle en sort.
   */
  useEffect(() => {
    const section = sectionRef.current;

    // Interrompt l'exécution si la section n'est pas disponible.
    if (!section) {
      return undefined;
    }

    // Récupère tous les éléments numériques de la section.
    const valueDisplays = section.querySelectorAll(".num");

    // Durée totale de l'animation en millisecondes.
    const durationTotal = 1200;

    /**
     * Arrête tous les compteurs actifs.
     * Vide ensuite la liste des intervalles enregistrés.
     */
    function clearAllCounters() {
      countersRef.current.forEach((counter) => clearInterval(counter));
      countersRef.current = [];
    }

    /**
     * Anime progressivement les valeurs numériques.
     * Chaque compteur évolue de zéro jusqu'à sa valeur cible.
     */
    function animateNumbers() {
      // Évite de conserver plusieurs animations simultanées.
      clearAllCounters();

      valueDisplays.forEach((el) => {
        // Récupère la valeur cible et son éventuel suffixe.
        const rawValue = el.getAttribute("data-val") || "";
        const endValue = parseFloat(rawValue);
        const suffix = rawValue.replace(/[0-9.,\s]/g, "");

        // Affiche zéro si la valeur est invalide ou négative.
        if (Number.isNaN(endValue) || endValue <= 0) {
          el.textContent = "0" + suffix;
          return;
        }

        // Initialise les paramètres de progression du compteur.
        let start = 0;
        const steps = 30;
        const increment = endValue / steps;
        const duration = durationTotal / steps;

        // Initialise l'affichage à zéro avant le démarrage.
        el.textContent = "0" + suffix;

        // Incrémente progressivement la valeur jusqu'au résultat final.
        const counter = setInterval(() => {
          start += increment;

          if (start >= endValue) {
            // Affiche la valeur finale et arrête l'intervalle.
            el.textContent = endValue.toString() + suffix;
            clearInterval(counter);
          } else {
            // Affiche la valeur intermédiaire arrondie à l'entier inférieur.
            el.textContent = Math.floor(start).toString() + suffix;
          }
        }, duration);

        // Enregistre l'intervalle pour pouvoir l'interrompre ultérieurement.
        countersRef.current.push(counter);
      });
    }

    /**
     * Surveille la visibilité de la section.
     * Lance les animations à son entrée dans la zone définie
     * et arrête les compteurs lorsqu'elle en sort.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
          } else {
            clearAllCounters();
          }
        });
      },
      {
        // Définit une zone de détection réduite au centre de l'écran.
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      },
    );

    // Active l'observation de la section des compteurs.
    observer.observe(section);

    // Nettoyage lors du démontage du composant.
    return () => {
      observer.disconnect();
      clearAllCounters();
    };
  }, []);

  /*** AFFICHAGE DES CHIFFRES CLÉS ***/

  /**
   * Génère un bloc de chiffre clé.
   * Sépare la valeur numérique de son libellé
   * et prépare l'élément à recevoir son animation.
   */
  function renderChiffres(item, i) {
    const label = item?.nom || "";
    const value = item?.valeur || "";

    return (
      <div className="chiffresContainer" key={i}>
        {/* Valeur numérique animée avec sa valeur cible en attribut. */}
        <span className="num" data-val={value} aria-label={`${value} ${label}`}>
          0
        </span>

        {/* Libellé associé au chiffre clé. */}
        <span className="text">{label}</span>
      </div>
    );
  }

  /*** AFFICHAGE DES PARAGRAPHES ***/

  /**
   * Génère les paragraphes de présentation des réalisations.
   * Applique une classe spécifique au dernier paragraphe.
   */
  function renderP(item, i) {
    const isLast = i === myrealsP.length - 1;

    return (
      <p
        key={"paragraph" + i}
        className={`renderP ${isLast ? "lastRenderP" : ""}`}
      >
        {item}
      </p>
    );
  }

  /*** STRUCTURE PRINCIPALE ***/

  return (
    <div className="container chiffresCont">
      {/* TITRE DE LA RUBRIQUE */}
      <h3 className="secTitle01 secTitle02">Digital learning / LMS</h3>

      {/* PARAGRAPHES DE PRÉSENTATION DES RÉALISATIONS */}
      {Array.isArray(myrealsP) && myrealsP.map((item, i) => renderP(item, i))}

      {/* CONTENEUR DES COMPTEURS ANIMÉS */}
      <div className="row" ref={sectionRef}>
        {Array.isArray(chiffres) &&
          chiffres.map((item, i) => renderChiffres(item, i))}
      </div>
    </div>
  );
}
