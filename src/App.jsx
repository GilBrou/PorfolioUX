/***** APP COMPONENT *****/

/*** IMPORTS GÉNÉRAUX ***/
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*** PAGES & COMPOSANTS ***/
import Homepage from "./Homepage";
import Loader from "./Components/00-Loader.jsx";
import AnimatedBackground from "./Components/09-AnimatedBackground.jsx";

/*** DONNÉES LOCALES (JSON) ***/
import JsonData from "./datas/data.json";

export default function App() {
  /**
   * Détermine si le loader doit être affiché.
   * Il apparaît uniquement lors du premier chargement de la session.
   */
  const [showLoader, setShowLoader] = useState(() => {
    return sessionStorage.getItem("loaderShown") !== "1";
  });

  // Stocke l'ensemble des données transmises aux composants.
  const [allDatas, setAllDatas] = useState({});

  // Indique si le chargement initial des données est terminé.
  const [loading, setLoading] = useState(true);

  /**
   * Détecte le premier chargement du site.
   * Ajoute une classe au body pour permettre de déclencher
   * des styles ou animations spécifiques à cette première visite.
   */
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("siteLoaded");

    if (!alreadyLoaded) {
      document.body.classList.add("first-load");

      // Mémorise le premier chargement dans la session.
      sessionStorage.setItem("siteLoaded", "true");
    }
  }, []);

  /**
   * Charge les données locales depuis le fichier JSON.
   * Contrôle le cycle de vie du composant pour éviter
   * les mises à jour après son démontage.
   */
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Interrompt le traitement si le composant est démonté.
        if (!isMounted) {
          return;
        }

        // Transmet les données JSON au state principal.
        setAllDatas(JsonData);
      } catch (error) {
        // Signale une éventuelle erreur dans la console.
        console.error("Erreur pendant le chargement :", error);
      } finally {
        // Évite de poursuivre le traitement après le démontage.
        if (!isMounted) {
          return;
        }

        // Attend la fin du délai d'affichage avant de terminer le chargement.
        setTimeout(() => {
          if (!isMounted) {
            return;
          }

          setLoading(false);

          // Mémorise l'affichage du loader pour la session en cours.
          if (showLoader) {
            sessionStorage.setItem("loaderShown", "1");
          }

          // Désactive le loader pour ce chargement.
          setShowLoader(false);
        }, 2350);
      }
    }

    fetchData();

    // Nettoyage exécuté lorsque le composant est démonté.
    return () => {
      isMounted = false;
    };
  }, [showLoader]);

  /**
   * Affiche uniquement le loader pendant le chargement initial.
   * Le reste de l'application n'est rendu qu'une fois cette étape terminée.
   */
  if (loading && showLoader) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  /**
   * Structure principale de l'application.
   * Configure le routage, affiche la page d'accueil
   * et redirige toutes les routes inconnues vers la racine.
   */
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* Route principale : affiche la page d'accueil avec les données. */}
          <Route exact path="/">
            <Homepage data={allDatas} />
          </Route>

          {/* Toute route non reconnue est redirigée vers l'accueil. */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>

        {/* Arrière-plan animé commun à l'application. */}
        <AnimatedBackground />
      </div>
    </Router>
  );
}
