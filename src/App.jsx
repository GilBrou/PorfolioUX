/***** APP COMPONENT *****/

/*** IMPORTS GÉNÉRAUX ***/
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*** PAGES & COMPOSANTS ***/
import Homepage from "./Homepage";
import Loader from "./Components/00-Loader.jsx";
import AnimatedBackground from "./Components/AnimatedBackground.jsx";

/*** DONNÉES LOCALES (JSON) ***/
import JsonData from "./datas/data.json";

export default function App() {
  /**
   * Affiche le loader uniquement
   * lors du premier chargement de session.
   */
  const [showLoader, setShowLoader] = useState(() => {
    return sessionStorage.getItem("loaderShown") !== "1";
  });

  const [allDatas, setAllDatas] = useState({});
  const [loading, setLoading] = useState(true);

  const [fetchError, setFetchError] = useState(null);

  /**
   * Ajoute une classe spécifique
   * lors du premier chargement du site.
   */
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("siteLoaded");

    if (!alreadyLoaded) {
      document.body.classList.add("first-load");

      sessionStorage.setItem("siteLoaded", "true");
    }
  }, []);

  /**
   * Chargement des données
   */
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        if (isMounted) {
          setFetchError(null);
        }

        if (!isMounted) {
          return;
        }

        setAllDatas(JsonData);
      } catch (error) {
        console.error("Erreur pendant le chargement :", error);

        if (isMounted) {
          setFetchError(
            "Un problème est survenu lors du chargement des contenus. Certaines informations peuvent être manquantes.",
          );
        }
      } finally {
        if (!isMounted) {
          return;
        }
        setTimeout(() => {
          if (!isMounted) {
            return;
          }

          setLoading(false);

          if (showLoader) {
            sessionStorage.setItem("loaderShown", "1");
          }

          setShowLoader(false);
        }, 2350);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [showLoader]);

  /**
   * Affichage du loader.
   */
  if (loading && showLoader) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/accueil">
            <Homepage data={allDatas} />
          </Route>
          <Route>
            <Redirect to="/accueil" />
          </Route>
        </Switch>

        {/* FOND ANIMÉ */}
        <AnimatedBackground />
      </div>
    </Router>
  );
}
