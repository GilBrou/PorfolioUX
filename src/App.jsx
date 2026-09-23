/****** APP ******/

/*** IMPORTS GÉNÉRAUX ***/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import {
  GetPagesLinks,
  GetPagesLinks2,
  GetPagesLinks3,
} from "./Utils/Appendix.jsx";
import axios from "axios";
import { redirectWithAuth } from "./Utils/PrimoConnect.jsx";

/*** PAGES ET COMPOSANTS ***/
import Loader from "./Components/Loader.jsx";
import Header from "./Components/Header.jsx";
import EspaceAccueil from "./Components/EspaceAccueil.jsx";
import Banner from "./Components/Banner.jsx";
import SecondMenu from "./Components/SecondMenu.jsx";
import FaculteMenu from "./Components/faculteMenu.jsx";
import HomePage from "./Pages/HomePage.jsx";
import PagesSommaires from "./Pages/PagesSommaires.jsx";
import PagesSommaires2 from "./Pages/PagesSommaires2.jsx";
import PagesSommaires3 from "./Pages/PagesSommaires3.jsx";
import Footer from "./Components/Footer.jsx";
import PagesBU from "./Pages/PagesBU.jsx";
import SearchResults from "./Pages/SearchResults.jsx";
import PageMentions from "./Pages/PageMentions.jsx";
import Afflu from "./Components/Afflu.jsx";


//Comment

/*** DONNÉES LOCALES ***/
import menuData from "./datas/menuDatas.json";
import tuilesData from "./datas/tuilesDatas.json";

/*** ENDPOINTS EXTERNES ***/
const POSTS_URL =
  "https://bu.comu.unimes.fr/wp-json/wp/v2/posts?per_page=99&_embed&_fields=id,link,slug,title,content,excerpt,featured_media,categories";

const RSS_URL =
  process.env.NODE_ENV === "production"    
    ? "https://www.unimes.fr/_plugins/web/zoneItem/fb638ede-974c-4c34-b345-7148ce407da9/rss.xml"
    : "/unimes-rss/search-rss.xml";

const PRIMO_CONNECTED_STORAGE_KEY = "primoIsConnected";

/*https://www.unimes.fr/fr/vie-de-campus/bibliotheque-universitaire.htmls*/

/**
 * Lit le statut de connexion depuis l'ancre d'URL.
 *
 * Exemple :
 * https://bibliotheque.unimes.fr/accueil#isConnected=true
 */
function getIsConnectedFromHash() {
  const hash = window.location.hash.replace("#", "");
  const params = new URLSearchParams(hash);

  return params.get("isConnected") === "true";
}

/**
 * Lit le statut de connexion stocké dans le navigateur.
 */
function getStoredIsConnected() {
  return localStorage.getItem(PRIMO_CONNECTED_STORAGE_KEY) === "true";
}

/**
 * Initialise le statut de connexion.
 */
function getInitialIsConnected() {
  if (getIsConnectedFromHash()) {
    localStorage.setItem(PRIMO_CONNECTED_STORAGE_KEY, "true");
    return true;
  }

  return getStoredIsConnected();
}

/**
 * Composant principal de l’application.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuDatas, setMenuDatas] = useState({});
  const [tuilesDatas, setTuilesDatas] = useState({});
  const [posts, setPosts] = useState([]);
  const [actus, setActus] = useState([]);
  const [isConnected, setIsConnected] = useState(getInitialIsConnected());
  const [fetchError, setFetchError] = useState(null);

  const horairesDatas = [];

  useEffect(() => {
    function handleHashChange() {
      if (getIsConnectedFromHash()) {
        localStorage.setItem(PRIMO_CONNECTED_STORAGE_KEY, "true");
        setIsConnected(true);
      }
    }

    function handleStorageChange(event) {
      if (event.key === PRIMO_CONNECTED_STORAGE_KEY) {
        setIsConnected(event.newValue === "true");
      }
    }

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    function handleGlobalPrimoLinks(event) {
      const path = event.composedPath ? event.composedPath() : [];

      const link = path.find(
        (element) =>
          element && element.tagName && element.tagName.toLowerCase() === "a",
      );

      if (!link) {
        return;
      }

      const href = link.href || link.getAttribute("href");

      if (!href) {
        return;
      }

      if (!href.includes("catalogue.scdi")) {
        return;
      }

      if (localStorage.getItem(PRIMO_CONNECTED_STORAGE_KEY) !== "true") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      redirectWithAuth(event, href);
    }

    document.addEventListener("click", handleGlobalPrimoLinks, true);

    return () => {
      document.removeEventListener("click", handleGlobalPrimoLinks, true);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        if (isMounted) {
          setFetchError(null);
        }

        const [postsResult, rssResult] = await Promise.allSettled([
          axios.get(POSTS_URL),

          axios.get(RSS_URL, {
            responseType: "text",
            timeout: 10000,
          }),
        ]);

        let postsFromWp = [];
        let rssItems = [];

        if (postsResult.status === "fulfilled") {
          postsFromWp = Array.isArray(postsResult.value.data)
            ? postsResult.value.data
            : [];
        } else {
          console.error(
            "Erreur lors du chargement des pages depuis WordPress :",
            postsResult.reason,
          );

          if (isMounted) {
            setFetchError(
              (prev) =>
                prev ??
                "Un problème est survenu lors du chargement des contenus. Certaines informations peuvent être manquantes.",
            );
          }
        }

        if (rssResult.status === "fulfilled") {
          try {
            const xml = rssResult.value.data;

            const doc = new window.DOMParser().parseFromString(
              xml,
              "application/xml",
            );

            rssItems = Array.from(doc.querySelectorAll("item")).map((item) => ({
              title: item.querySelector("title")?.textContent ?? "",
              link: item.querySelector("link")?.textContent ?? "",
              pubDate: item.querySelector("pubDate")?.textContent ?? "",
              description: item.querySelector("description")?.textContent ?? "",
              guid: item.querySelector("guid")?.textContent ?? "",
            }));
          } catch (parseError) {
            console.error("Erreur lors de l’analyse du flux RSS :", parseError);

            if (isMounted) {
              setFetchError((prev) =>
                prev
                  ? `${prev} Le flux d'actualités n’a pas pu être affiché correctement.`
                  : "Le flux d'actualités n’a pas pu être affiché correctement.",
              );
            }
          }
        } else {
          console.error(
            "Erreur lors du chargement du flux RSS :",
            rssResult.reason,
          );
        }

        if (!isMounted) {
          return;
        }

        setMenuDatas(menuData);
        setTuilesDatas(tuilesData);
        setPosts(postsFromWp);
        setActus(rssItems);
      } catch (error) {
        console.error("Erreur inattendue pendant le chargement :", error);

        if (isMounted) {
          setFetchError(
            "Un problème général est survenu lors du chargement des contenus.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="app">
        <a href="#main-content" className="skip-link">
          Passer au contenu principal
        </a>

        <main id="main-content" role="main" aria-busy="true" aria-live="polite">
          <Loader />
        </main>
      </div>
    );
  }

  //console.log(isConnected)

  return (
    <Router>
      <div className="app">
        <a href="#main-content" className="skip-link">
          Passer au contenu principal
        </a>

        <Header data={menuDatas} />

        {fetchError && (
          <div className="global-error" role="status" aria-live="polite">
            {fetchError}
          </div>
        )}

        <Switch>
          <Route exact path="/accueil">
            <Banner />
            <SecondMenu data={tuilesDatas} />
            <Afflu />
            <EspaceAccueil posts={posts} />

            <FaculteMenu />

            <HomePage posts={posts} actus={actus} />
          </Route>

          <Route exact path="/recherche">
            <SearchResults posts={posts} />
          </Route>

          {GetPagesLinks2(menuDatas).map((slug) => (
            <Route key={`som1-${slug}`} exact path={`/${slug}`}>
              <PagesSommaires data={menuDatas} horaires={horairesDatas} />
            </Route>
          ))}

          {Array.isArray(menuDatas.menu) &&
            GetPagesLinks3(menuDatas.menu).map((slug) => (
              <Route key={`som2-${slug}`} exact path={`/${slug}`}>
                <PagesSommaires2 data={menuDatas} horaires={horairesDatas} />
              </Route>
            ))}

          {GetPagesLinks(posts).map((slug) => (
            <Route key={`wp-${slug}`} exact path={`/${slug}`}>
              <PagesBU posts={posts} menu={menuDatas} />
            </Route>
          ))}

          <Route
            exact
            path="/ressources-documentaires/guides-thematiques/droit-economie-gestion"
          >
            <PagesSommaires3 data={menuDatas} />
          </Route>

          <Route
            exact
            path="/ressources-documentaires/guides-thematiques/lettres-langues-histoire"
          >
            <PagesSommaires3 data={menuDatas} />
          </Route>

          <Route
            exact
            path="/ressources-documentaires/guides-thematiques/sciences"
          >
            <PagesSommaires3 data={menuDatas} />
          </Route>

          <Route exact path="/mentions-legales">
            <PageMentions />
          </Route>

          <Route exact path="/page-test">
            <PagesBU posts={posts} menu={menuDatas} />
          </Route>

          <Route>
            <Redirect to="/accueil" />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
