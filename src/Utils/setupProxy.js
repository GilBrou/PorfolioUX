/**
 * Configuration du proxy de développement pour Create React App.
 *
 * Ce middleware crée :
 *
 * - une route locale "/unimes-rss"
 *   redirigée vers le flux RSS de l’université ;
 *
 * - une route locale "/connection-check"
 *   redirigée vers le endpoint PHP de vérification CAS.
 *
 * Objectifs :
 * - éviter les erreurs CORS en développement ;
 * - simuler des endpoints locaux ;
 * - permettre les appels API distants depuis React.
 */

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  /********************************************
   * PROXY RSS UNÎMES
   ********************************************/
  app.use(
    "/unimes-rss",
    createProxyMiddleware({
      // Serveur distant cible.
      target: "https://www.unimes.fr",

      // Modifie l’origine de la requête.
      changeOrigin: true,

      /**
       * Réécriture du chemin.
       *
       * Exemple :
       * /unimes-rss/search-rss.xml
       * devient :
       * /_plugins/web/zoneItem/8ce0fab9-98d1-48b3-8cd5-e758105033af/search-rss.xml
       */
      pathRewrite: {
        "^/unimes-rss":
          "/_plugins/web/zoneItem/8ce0fab9-98d1-48b3-8cd5-e758105033af",
      },
    }),
  );

  /********************************************
   * PROXY VÉRIFICATION CAS
   ********************************************/
  /*
  app.use(
    "/connection-check",
    createProxyMiddleware({
      // Serveur distant cible.
      target: "https://www-apps.unimes.fr",

      // Modifie l’origine de la requête.
      changeOrigin: true,

      // Autorise les redirections.
      followRedirects: true,

 
      pathRewrite: {
        "^/connection-check": "/isConnected.php",
      },

      onProxyReq(proxyReq, req) {
        console.log(
          "[PROXY] Vérification connexion CAS :",
          req.method,
          req.url,
        );
      },

      onError(err) {
        console.error(
          "[PROXY] Erreur connexion CAS :",
          err,
        );
      },
    }),
  );
};
*/