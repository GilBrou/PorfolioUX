import { useEffect, useRef } from "react";

/***** Affluences : Horaires automatiques ******/

export default function Afflu() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const scriptUrl =
      "https://webapi.affluences.com/js/timetable_api_latest.min.js";

    function loadScript() {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(
          `script[src="${scriptUrl}"]`
        );

        if (existingScript) {
          if (existingScript.dataset.loaded === "true") {
            resolve();
          } else {
            existingScript.addEventListener("load", resolve, { once: true });
            existingScript.addEventListener("error", reject, { once: true });
          }

          return;
        }

        const script = document.createElement("script");

        script.src = scriptUrl;
        script.charset = "UTF-8";
        script.async = true;

        script.addEventListener(
          "load",
          () => {
            script.dataset.loaded = "true";
            resolve();
          },
          { once: true }
        );

        script.addEventListener("error", reject, { once: true });

        document.head.appendChild(script);
      });
    }

    loadScript().catch((error) => {
      console.error("Erreur lors du chargement du widget Affluences :", error);
    });
  }, []);

  return (
    
      <div
        className="affluences-timetable"
        data-token="eFvcPENDXk0iCK"
      />
  );
}