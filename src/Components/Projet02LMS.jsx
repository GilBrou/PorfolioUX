import { useEffect, useRef } from "react";
import chiffres from "../datas/chiffres.json";

/***PROJECTS MODULE***/

export default function Projet02LMS() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  /**
   * Lance l’animation des chiffres lorsque
   * le bloc entre dans la zone visible.
   *
   * Les durées, seuils et marges sont conservés
   * pour préserver exactement le rendu actuel.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const valueDisplays = section.querySelectorAll(".num");
    const durationTotal = 1200;

    function clearAllCounters() {
      countersRef.current.forEach((counter) => clearInterval(counter));
      countersRef.current = [];
    }

    function animateNumbers() {
      clearAllCounters();

      valueDisplays.forEach((el) => {
        const rawValue = el.getAttribute("data-val") || "";
        const endValue = parseFloat(rawValue);
        const suffix = rawValue.replace(/[0-9.,\s]/g, "");

        if (Number.isNaN(endValue) || endValue <= 0) {
          el.textContent = "0" + suffix;
          return;
        }

        let start = 0;
        const steps = 30;
        const increment = endValue / steps;
        const duration = durationTotal / steps;

        el.textContent = "0" + suffix;

        const counter = setInterval(() => {
          start += increment;

          if (start >= endValue) {
            el.textContent = endValue.toString() + suffix;
            clearInterval(counter);
          } else {
            el.textContent = Math.floor(start).toString() + suffix;
          }
        }, duration);

        countersRef.current.push(counter);
      });
    }

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
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearAllCounters();
    };
  }, []);

  /**
   * Affiche un chiffre clé.
   */
  function renderChiffres(item, i) {
    const label = item?.nom || "";
    const value = item?.valeur || "";

    return (
      <div className="chiffresContainer" key={i}>
        <span className="num" data-val={value} aria-label={`${value} ${label}`}>
          0
        </span>
        <span className="text">{label}</span>
      </div>
    );
  }

  /*Main*/
  return (
    <div className="container chiffresCont">
      <h3 className="secTitle01 secTitle02">Digital learning / LMS</h3>

      <div className="row" ref={sectionRef}>
        {Array.isArray(chiffres) &&
          chiffres.map((item, i) => renderChiffres(item, i))}
      </div>
    </div>
  );
}
