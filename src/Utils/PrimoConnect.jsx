/****** PrimoConnect ******/

const PRIMO_CONNECTED_STORAGE_KEY = "primoIsConnected";

function getPrimoIsConnected() {
  return localStorage.getItem(PRIMO_CONNECTED_STORAGE_KEY) === "true";
}

/**
 * Lance une recherche Primo.
 *
 * Si l’utilisateur est connecté :
 * authentification SAML Université de Nîmes.
 *
 * Sinon :
 * accès direct sans authentification.
 */
export default function searchPrimo(event) {
  if (event) {
    event.preventDefault();
  }

  const input = document.getElementById("searchBar");
  const query = input ? input.value : "";

  if (!query.trim()) {
    return;
  }

  let searchUrl =
    "https://catalogue.scdi-montpellier.fr/nde/search";

  const params = [
    "vid=33MON_INST:33UN_NDE",
    "tab=UN_scope",
    "search_scope=UN_catalog",
    "lang=fr",
    "isSilent=false",
    "query=" + encodeURIComponent(query),
  ];

  searchUrl += "?" + params.join("&");

  /********************************************
   * UTILISATEUR CONNECTÉ
   ********************************************/
  if (getPrimoIsConnected()) {
    window.location.href = buildNimesAuthUrl(searchUrl);

    return;
  }

  /********************************************
   * UTILISATEUR NON CONNECTÉ
   ********************************************/
  window.location.href = searchUrl;
}

/**
 * Redirige vers une URL Primo.
 *
 * Si connecté :
 * passage par authentification SAML.
 *
 * Sinon :
 * accès direct.
 */
export function redirectWithAuth(event, targetUrl) {
  if (event) {
    event.preventDefault();
  }

  if (!targetUrl) {
    return;
  }

  /********************************************
   * UTILISATEUR CONNECTÉ
   ********************************************/
  if (getPrimoIsConnected()) {
    window.location.href = buildNimesAuthUrl(targetUrl);

    return;
  }

  /********************************************
   * UTILISATEUR NON CONNECTÉ
   ********************************************/
  window.location.href = targetUrl;
}

/**
 * Construit l’URL d’authentification
 * SAML Université de Nîmes.
 */
function buildNimesAuthUrl(targetUrl) {
  const authUrl =
    "https://catalogue.scdi-montpellier.fr/primaws/suprimaExtLogin?";

  const authParams = [
    "authenticationProfile=UN",
    "idpCode=UN",
    "auth=SAML",
    "institution=33MON_INST",
    "vid=33MON_INST:33UN_NDE",
    "tab=UN_scope",
    "target-url=" + encodeURIComponent(targetUrl),
  ];

  return authUrl + authParams.join("&");
}