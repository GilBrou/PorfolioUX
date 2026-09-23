import { useEffect, useMemo, useRef } from "react";
import DOMPurify from "dompurify";
import background1 from "../style/background/background1.webp";
import background2 from "../style/background/background2.webp";

/**
 * Affiche un contenu WordPress dans un Shadow DOM isolé.
 */
export default function WpContentIsolated({
  html,
  origin = "https://bu.comu.unimes.fr",
  extraCss = [],
  customCss = "",
  className = "",
  isFAQ = false,
  isAnchors = false,
  isTuiles = false,
  isGlossaire = false,
}) {
  const hostRef = useRef(null);
  const shadowRootRef = useRef(null);
  const cssList = useMemo(() => extraCss, [JSON.stringify(extraCss)]);

  useEffect(() => {
    if (!hostRef.current?.attachShadow) {
      return;
    }

    const effectiveFAQ = Boolean(isFAQ && !isTuiles);
    const effectiveAnchors = Boolean(isAnchors && !isTuiles);
    const isSpecialFAQPage =
      window.location.pathname === "/services/une-question-la-bu-vous-repond";

    /**
     * Protège une valeur avant son insertion dans un attribut HTML.
     */
    const escapeAttribute = (value) =>
      String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    /**
     * Initialise le Shadow DOM une seule fois.
     */
    if (!shadowRootRef.current) {
      const root = (shadowRootRef.current = hostRef.current.attachShadow({
        mode: "open",
      }));

      cssList.forEach((path) => {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = path.startsWith("http")
          ? path
          : `${origin.replace(/\/+$/, "")}${path}`;

        root.appendChild(link);
      });

      const style = document.createElement("style");

      style.textContent = `
        .wp-article img {
          max-width: 100%;
          height: auto;
        }

        .wp-article figure {
          margin: 1rem 0;
        }

        .wp-article h2 {
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(0,0,0,.2);
          width: fit-content;
          padding-bottom: 3px;
          font-family: "Oswald", sans-serif;
          margin: .8rem 0 .4rem;
        }

        @media (max-width: 653px) {
          .wp-article h2,
          .wp-article .faq-item .faq-toggle span {
            font-size: 22px !important;
          }
        }

        .wp-article {
          max-width: 70vw;
          margin: auto;
          flex-wrap: wrap;
        }

        .wp-article .anchor-target {
          scroll-margin-top: 100px;
        }

        .wp-article .anchor-menu {
          display: none !important;
        }

        .wp-article .faq-item {
          margin: .8rem 0 .4rem;
        }

        .wp-article .faq-toggle {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(0,0,0,.2);
          width: 100%;
          padding-bottom: 3px;
          font-family: "Oswald", sans-serif;
          margin: .8rem 0 .4rem;
        }

        .wp-article .faq-toggle-icon {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 999px;
          border: 3px solid #e84e24;
          color: #e84e24;
          font-weight: 900;
          font-size: 1.6rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 1rem;
          line-height: 1;
          flex-shrink: 0;
          transition: 0.25s ease;
        }

        .wp-article .faq-toggle[aria-expanded="true"] .faq-toggle-icon {
          background-color: #e84e24;
          color: white;
        }

        .wp-article .faq-panel {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          padding: 0;
          transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
        }

        .wp-article .faq-panel.open {
          opacity: 1;
          padding: .4rem 0 .6rem;
        }

        .wp-article p,
        .wp-article li,
        .wp-article tr {
          font-size: 20px;
          line-height: 1.6;
        }

        .wp-article a {
          color: #e84e24;
          text-decoration: underline;
          transition: .15s;
          word-break: break-word !important;
        }

        .wp-article a:hover {
          color: #c93f1c;
        }

        .wp-article.is-tuiles {
          display: block;
        }

        .wp-article.is-tuiles .wp-tiles-intro {
          background: #f2f2f2;
          padding: 25px;
          margin-bottom: 25px;
          border-radius: 2px;
        }

        .wp-article.is-tuiles .tuiles-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          gap: 50px;
          padding: 10px 0;
        }

        .is-tuiles {
          padding: 25px;
          background: url(${background2}) 50%/cover no-repeat !important;
          background-attachment: fixed;
          border-radius: 2px;
          box-shadow: 3px 2px 5px #000c;
          transform: scale(1);
          transition: transform .4s;
        }

        .wp-article .h2-tuiles {
          cursor: pointer;
          user-select: none;
          border: 1px solid rgba(0,0,0,.15);
          border-radius: 14px;
          width: 350px;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin: 0 !important;
          padding: 16px;
          background: #fff;
          box-shadow: 0 6px 18px rgba(0,0,0,.06);
          background: url(${background1}) 50%/cover no-repeat !important;
          background-attachment: fixed;
          border-radius: 2px;
          box-shadow: 3px 2px 5px #000c;
          transform: scale(1);
          transition: transform .4s;
        }

        .wp-article .h2-tuiles:hover {
          transform: scale(1.05);
        }

        @media (max-width: 948px) {
          .is-tuiles {
            padding: 5px;
          }

          .wp-article .h2-tuiles {
            width: 90%;
            height: unset;
          }
        }

        th,
        td {
          border: 1px solid #ddd;
          padding: 0.6rem 0.8rem;
        }

        .wp-article .glossaire-section[hidden] {
          display: none !important;
        }

        .wp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.55);
          display: none;
          align-items: center;
          justify-content: center;
          padding: 18px;
          z-index: 999999;
        }

        .wp-modal-overlay.open {
          display: flex;
        }

        .wp-modal {
          width: 80%;
          max-height: min(82vh, 900px);
          overflow: auto;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 18px 50px rgba(0,0,0,.25);
          padding: 16px 18px;
        }

        .wp-modal a {
          color: var(--uOrange) !important;
          transform: scale(1) !important;
        }

        .wp-modal a::before {
          content: "↗";
          margin-right: 5px;
          font-weight: bolder;
        }

        .wp-modal a:hover {
          color: var(--uOrange);
          transform: scale(1.05) !important;
        }

        .wp-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-bottom: 1px solid rgba(0,0,0,.12);
          padding-bottom: 10px;
          margin-bottom: 12px;
        }

        .wp-modal-title {
          font-family: "Oswald", sans-serif;
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 1px;
          margin: 0;
        }

        .wp-modal-close {
          all: unset;
          cursor: pointer;
          border-radius: 999px;
          width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: unset;
          color: rgba(232,78,36,1);
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
        }

        .wp-modal-close:hover {
          background: rgba(232,78,36,1);
          color: #fff;
        }

        .wp-modal-body p,
        .wp-modal-body li,
        .wp-modal-body tr {
          font-size: 20px;
          line-height: 1.6;
        }

        .wp-article .glossaire-empty-message {
          margin: 1rem 0;
          padding: 12px 16px;
          background: #f2f2f2;
          border-left: 4px solid #e84e24;
          font-size: 18px;
          line-height: 1.5;
        }

        .wpcf7,
        .wpcf7 *,
        .wpcf7 .wp-form,
        .wpcf7 .wp-form * {
          box-sizing: border-box;
        }

        .wpcf7 p {
          margin: 0 !important;
          padding: 0 !important;
        }

        .wpcf7 br {
          display: none !important;
        }

        .wpcf7 .wp-form {
          --bg: #ffffff;
          --text: #111827;
          --muted: rgba(17, 24, 39, 0.65);
          --border: rgba(17, 24, 39, 0.14);
          --border-strong: rgba(17, 24, 39, 0.22);
          --shadow: 0 18px 50px rgba(0, 0, 0, 0.1);
          --radius: 2px;
          --focus: #e84e24;

          max-width: 760px;
          width: 80%;
          margin: 0 auto;
          padding: 22px;

          border-radius: var(--radius);
          background: var(--bg);
          box-shadow: var(--shadow);
          color: var(--text);

          display: grid;
          gap: 10px;

          font-family: "Mulish", sans-serif;
        }

        .wpcf7 .wp-grid-2 {
          display: grid;
          gap: 10px;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }

        .wpcf7 .wp-field {
          display: grid;
          gap: 5px;
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          min-width: 0;
        }

        .wpcf7 .wp-field > span:first-child {
          margin: 0;
          line-height: 1.2;
        }

        .wpcf7 input[type="text"],
        .wpcf7 input[type="email"],
        .wpcf7 input[type="tel"],
        .wpcf7 textarea,
        .wpcf7 .wp-input {
          width: 100%;
          min-height: 42px;

          padding: 9px 10px;
          line-height: 1.25;

          border: 1px solid var(--border);
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.9);

          font-size: 15px;
          font-family: inherit;
          color: var(--text);

          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease,
            transform 0.08s ease;
        }

        .wpcf7 textarea {
          min-height: 110px;
          resize: vertical;
        }

        .wpcf7 input:hover,
        .wpcf7 textarea:hover {
          border-color: var(--border-strong);
        }

        .wpcf7 input:focus,
        .wpcf7 textarea:focus {
          border-color: rgba(232, 78, 36, 0.7);
          box-shadow: 0 0 0 4px rgba(232, 78, 36, 0.18);
        }

        .wpcf7 input:active,
        .wpcf7 textarea:active {
          transform: translateY(0.5px);
        }

        .wpcf7 input::placeholder,
        .wpcf7 textarea::placeholder {
          color: rgba(17, 24, 39, 0.45);
        }

        .wpcf7 .wp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0;
          align-items: flex-end;
        }

        .wpcf7 input[type="submit"],
        .wpcf7 .wp-btn {
          appearance: none;

          min-height: 40px;
          padding: 9px 14px;

          border-radius: 2px;
          border: 1px solid rgba(232, 78, 36, 1);

          background: rgba(232, 78, 36, 1);
          color: #fff;

          font-weight: 700;
          font-size: 14px;
          font-family: inherit;

          cursor: pointer;

          width: fit-content;
          max-width: 50%;
          margin: 4px auto 0;

          transition:
            transform 0.08s ease,
            background 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .wpcf7 input[type="submit"]:hover,
        .wpcf7 .wp-btn:hover {
          background: #d9441f;
          border-color: #d9441f;
        }

        .wpcf7 input[type="submit"]:active {
          transform: translateY(1px);
        }

        .wpcf7 input[type="submit"]:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(232, 78, 36, 0.18);
        }

        .wpcf7 .wpcf7-not-valid {
          border-color: rgba(220, 38, 38, 0.55) !important;
        }

        .wpcf7 .wpcf7-not-valid-tip {
          margin-top: 3px;
          font-size: 13px;
          color: #b91c1c;
        }

        .wpcf7 form .wpcf7-response-output {
          margin: 6px 0 0;
          padding: 10px 12px;
          border-radius: 2px;
          border: 1px solid rgba(220, 38, 38, 0.25);
          background: rgba(220, 38, 38, 0.08);
          color: #b91c1c;
          font-size: 14px;
        }

        .wpcf7 .wp-note {
          margin: 0;
          font-size: 12px;
          line-height: 1.3;
          color: var(--muted);
        }

        @media (max-width: 720px) {
          .wpcf7 .wp-form {
            width: 100%;
            padding: 18px;
          }

          .wpcf7 .wp-grid-2 {
            grid-template-columns: minmax(0, 1fr);
          }

          .wpcf7 input[type="submit"] {
            max-width: 100%;
          }
        }

        .wpcf7-response-output:empty {
          display: none;
        }

        .wpcf7 .wp-radios .wpcf7-list-item {
          margin-right: 16px;
        }


.wp-article h3.faq-section-title {
  font-size: 30px;
  letter-spacing: 1px;
  font-family: "Oswald", sans-serif;
  color: #e84e24!important;
  margin: 2rem 0 1rem;
  padding-bottom: 6px;
}

.wp-article h3.faq-section-title,
.wp-article h3.faq-section-title * {
  color: #e84e24 !important;
  letter-spacing: 2px;
  font-weight: normal;
  text-transform: uppercase;
}


      `;

      root.appendChild(style);

      const container = document.createElement("article");
      container.className = "wp-article";
      root.appendChild(container);

      const overlay = document.createElement("div");

      overlay.className = "wp-modal-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-labelledby", "wp-modal-title");

      overlay.innerHTML = `
        <div class="wp-modal" role="document">
          <div class="wp-modal-header">
            <h2 class="wp-modal-title" id="wp-modal-title"></h2>
            <button type="button" class="wp-modal-close" aria-label="Fermer">×</button>
          </div>
          <div class="wp-modal-body"></div>
        </div>
      `;

      root.appendChild(overlay);
    }

    const root = shadowRootRef.current;

    let overrides = root.getElementById("app-overrides");

    if (!overrides) {
      overrides = document.createElement("style");
      overrides.id = "app-overrides";
    }

    overrides.textContent = customCss;
    root.appendChild(overrides);

    const container = root.querySelector(".wp-article");
    const overlay = root.querySelector(".wp-modal-overlay");
    const modalTitleEl = root.querySelector(".wp-modal-title");
    const modalBodyEl = root.querySelector(".wp-modal-body");
    const closeBtn = root.querySelector(".wp-modal-close");

    let lastActiveEl = null;

    /**
     * Ouvre la modale utilisée par les tuiles WordPress.
     */
    const openModal = (titleText, bodyHtml) => {
      lastActiveEl = root.activeElement || document.activeElement;

      modalTitleEl.textContent = titleText || "";
      modalBodyEl.innerHTML = DOMPurify.sanitize(bodyHtml || "", {
        ADD_ATTR: ["target", "rel"],
        ADD_TAGS: ["iframe"],
      });

      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      closeBtn.focus();
    };

    /**
     * Ferme la modale et replace le focus sur l’élément d’origine.
     */
    const closeModal = () => {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      modalTitleEl.textContent = "";
      modalBodyEl.innerHTML = "";

      if (lastActiveEl && typeof lastActiveEl.focus === "function") {
        lastActiveEl.focus();
      }

      lastActiveEl = null;
    };

    overlay.onclick = (event) => {
      if (event.target === overlay) {
        closeModal();
      }
    };

    closeBtn.onclick = closeModal;

    const onKeyDown = (event) => {
      if (event.key === "Escape" && overlay.classList.contains("open")) {
        event.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    let processedHtml = html ?? "";
    let sections = [];

    /**
     * Transforme les titres H2 en tuiles ouvrant une modale.
     */
    if (isTuiles && processedHtml) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(processedHtml, "text/html");

      const bodyHtmlRaw = doc.body.innerHTML || "";
      const idxFirstH2 = bodyHtmlRaw.toLowerCase().indexOf("<h2");
      const introHtml = idxFirstH2 > 0 ? bodyHtmlRaw.slice(0, idxFirstH2) : "";
      const h2s = Array.from(doc.querySelectorAll("h2"));

      sections = h2s.map((h2) => {
        const frag = doc.createDocumentFragment();
        let sibling = h2.nextSibling;

        while (
          sibling &&
          !(sibling.nodeType === 1 && sibling.tagName === "H2")
        ) {
          const next = sibling.nextSibling;
          frag.appendChild(sibling.cloneNode(true));
          sibling = next;
        }

        const wrapper = doc.createElement("div");
        wrapper.appendChild(frag);

        const titleText = (h2.textContent || "").replace(/^[+−]/, "").trim();

        return { titleText, bodyHtml: wrapper.innerHTML };
      });

      const tilesHtml = sections
        .map((section, index) => {
          const safeTitle = DOMPurify.sanitize(section.titleText, {
            ALLOWED_TAGS: [],
          });

          const safeAttributeTitle = escapeAttribute(safeTitle);

          return `<h2 class="h2-tuiles" data-tuile-index="${index}" tabindex="0" role="button" aria-label="${safeAttributeTitle}">${safeTitle}</h2>`;
        })
        .join("");

      processedHtml = `
        ${introHtml ? `<div class="wp-tiles-intro">${introHtml}</div>` : ""}
        <div class="tuiles-grid">${tilesHtml}</div>
      `;
    }

    const clean = DOMPurify.sanitize(processedHtml, {
      ADD_ATTR: [
        "target",
        "rel",
        "data-tuile-index",
        "tabindex",
        "role",
        "aria-label",
        "class",
        "id",
        "data-letter",
      ],
      ADD_TAGS: ["iframe"],
    });

    container.innerHTML = clean;

    /**
     * Gère l’envoi des formulaires Contact Form 7 chargés depuis WordPress.
     */
    container.querySelectorAll(".wpcf7 form").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formId = form
          .closest(".wpcf7")
          ?.getAttribute("id")
          ?.replace("wpcf7-f", "")
          ?.split("-")[0];

        if (!formId) {
          console.error("ID CF7 introuvable");
          return;
        }

        const formData = new FormData(form);

        try {
          const response = await fetch(
            `${origin.replace(
              /\/+$/,
              "",
            )}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
              method: "POST",
              body: formData,
            },
          );

          const result = await response.json();
          const output = form.querySelector(".wpcf7-response-output");

          if (output) {
            output.textContent = result.message || "";
            output.style.display = "block";
            output.setAttribute("role", "status");
            output.setAttribute("aria-live", "polite");
          }

          form.classList.remove("sent", "failed", "invalid");

          if (result.status === "mail_sent") {
            form.classList.add("sent");
            form.reset();
          } else if (result.status === "validation_failed") {
            form.classList.add("invalid");
          } else {
            form.classList.add("failed");
          }
        } catch (error) {
          console.error("Erreur CF7 :", error);

          const output = form.querySelector(".wpcf7-response-output");

          if (output) {
            output.textContent = "Une erreur est survenue. Merci de réessayer.";
            output.style.display = "block";
            output.setAttribute("role", "alert");
            output.setAttribute("aria-live", "assertive");
          }

          form.classList.remove("sent", "invalid");
          form.classList.add("failed");
        }
      });
    });

    container.classList.toggle("is-tuiles", Boolean(isTuiles));

    container.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });

    const usedIds = new Set();

    /**
     * Crée un identifiant unique pour les sections internes.
     */
    const slugifySection = (str) => {
      const base =
        (str || "")
          .toString()
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "section";

      let id = `section-${base}`;

      if (!usedIds.has(id)) {
        usedIds.add(id);
        return id;
      }

      let index = 2;

      while (usedIds.has(`${id}-${index}`)) {
        index += 1;
      }

      const unique = `${id}-${index}`;
      usedIds.add(unique);

      return unique;
    };

    /**
     * Regroupe les entrées du glossaire par première lettre.
     */
    const buildGlossaireSections = () => {
      if (!isGlossaire || isTuiles) {
        return;
      }

      const normalizeFirstLetter = (text) => {
        const firstChar = (text || "").trim().charAt(0);

        if (!firstChar) {
          return "#";
        }

        const normalized = firstChar
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase();

        return /[A-Z]/.test(normalized) ? normalized : "#";
      };

      const allH2 = Array.from(container.querySelectorAll("h2"));

      if (!allH2.length) {
        return;
      }

      allH2.forEach((h2) => {
        if (h2.closest(".glossaire-section")) {
          return;
        }

        const title = (h2.textContent || "").trim();
        const letter = normalizeFirstLetter(title);

        const section = document.createElement("section");
        section.className = "glossaire-section";
        section.setAttribute("data-letter", letter);

        h2.parentNode.insertBefore(section, h2);
        section.appendChild(h2);

        let sibling = section.nextSibling;

        while (
          sibling &&
          !(sibling.nodeType === 1 && sibling.tagName === "H2")
        ) {
          const next = sibling.nextSibling;
          section.appendChild(sibling);
          sibling = next;
        }
      });

      const groupedSections = Array.from(
        container.querySelectorAll(".glossaire-section"),
      );

      const seenLetters = new Set();

      groupedSections.forEach((section) => {
        const letter = section.getAttribute("data-letter");

        if (!letter || seenLetters.has(letter)) {
          return;
        }

        const h2 = section.querySelector("h2");

        if (h2) {
          h2.id = `letter-${letter}`;
          h2.classList.add("anchor-target");
        }

        seenLetters.add(letter);
      });
    };

    /**
     * Affiche uniquement les entrées du glossaire correspondant au hash actif.
     */
    const applyGlossaireFilter = () => {
      if (!isGlossaire || isTuiles) {
        return;
      }

      const oldMessage = container.querySelector(".glossaire-empty-message");

      if (oldMessage) {
        oldMessage.remove();
      }

      const hash = window.location.hash || "";
      const match = hash.match(/^#letter-(.+)$/i);
      const wantedLetter = match?.[1]?.charAt(0)?.toUpperCase() || "";
      const glossarySections = Array.from(
        container.querySelectorAll(".glossaire-section"),
      );

      if (!glossarySections.length) {
        return;
      }

      if (!wantedLetter) {
        glossarySections.forEach((section) => {
          section.hidden = false;
        });

        return;
      }

      let visibleCount = 0;

      glossarySections.forEach((section) => {
        const sectionLetter =
          section.getAttribute("data-letter")?.toUpperCase() || "";
        const isVisible = sectionLetter === wantedLetter;

        section.hidden = !isVisible;

        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (visibleCount === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.className = "glossaire-empty-message";
        emptyMessage.textContent = `Aucune entrée ne correspond à la lettre ${wantedLetter}.`;
        container.appendChild(emptyMessage);
      }
    };

    buildGlossaireSections();

    /**
     * Transforme les titres H2 en accordéons pour les pages FAQ.
     * Sur la FAQ spéciale "Une question ? La BU vous répond !",
     * les H3 restent visibles et servent de sections d’ancres.
     * Les H2 deviennent des accordéons contenant tout ce qui suit
     * jusqu’au prochain H2 ou jusqu’au prochain H3.
     */
    if (effectiveFAQ) {
      if (isSpecialFAQPage) {
        const h3s = [...container.querySelectorAll("h3")];

        h3s.forEach((h3) => {
          const cleanLabel = (h3.textContent || "").trim();

          if (!h3.id) {
            h3.id = slugifySection(cleanLabel);
          }

          h3.classList.add("anchor-target");
h3.classList.add("faq-section-title");


        });
      }

      const headings = [...container.querySelectorAll("h2")];

      headings.forEach((h2) => {
        const parent = h2.parentNode;

        if (!parent) {
          return;
        }

        const cleanLabel = (h2.textContent || "").replace(/^[+−]/, "").trim();

        const wrapper = document.createElement("section");
        wrapper.className = "faq-item";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "faq-toggle";
        button.setAttribute("aria-expanded", "false");
        button.id = slugifySection(cleanLabel);

        const titleSpan = document.createElement("span");
        titleSpan.innerHTML = h2.innerHTML.replace(/^[+−]/, "");

        const iconSpan = document.createElement("span");
        iconSpan.className = "faq-toggle-icon";
        iconSpan.textContent = "+";
        iconSpan.setAttribute("aria-hidden", "true");

        button.appendChild(titleSpan);
        button.appendChild(iconSpan);

        const panel = document.createElement("div");
        panel.className = "faq-panel";
        panel.id = `${button.id}-panel`;
        panel.setAttribute("aria-labelledby", button.id);

        button.setAttribute("aria-controls", panel.id);

        let sibling = h2.nextSibling;

        while (
          sibling &&
          !(
            sibling.nodeType === 1 &&
            (sibling.tagName === "H2" ||
              (isSpecialFAQPage && sibling.tagName === "H3"))
          )
        ) {
          const next = sibling.nextSibling;
          panel.appendChild(sibling);
          sibling = next;
        }

        wrapper.appendChild(button);
        wrapper.appendChild(panel);

        parent.insertBefore(wrapper, h2);
        parent.removeChild(h2);

        button.addEventListener("click", () => {
          const isOpen = panel.classList.contains("open");

          if (isOpen) {
            if (panel.style.maxHeight === "none") {
              panel.style.maxHeight = `${panel.scrollHeight}px`;
            }

            requestAnimationFrame(() => {
              panel.style.maxHeight = "0px";
            });

            panel.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            iconSpan.textContent = "+";
          } else {
            panel.classList.add("open");
            button.setAttribute("aria-expanded", "true");
            iconSpan.textContent = "−";
            panel.style.maxHeight = "0px";

            requestAnimationFrame(() => {
              panel.style.maxHeight = `${panel.scrollHeight}px`;
            });

            const handleTransitionEnd = (event) => {
              if (event.propertyName !== "max-height") {
                return;
              }

              if (panel.classList.contains("open")) {
                panel.style.maxHeight = "none";
              }

              panel.removeEventListener("transitionend", handleTransitionEnd);
            };

            panel.addEventListener("transitionend", handleTransitionEnd);
          }
        });
      });
    }

    /**
     * Fait défiler vers une ancre située dans le Shadow DOM.
     */
    const scrollToIdInsideShadow = (id) => {
      if (!id) {
        return;
      }

      const safe =
        typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id;

      const target =
        root.getElementById(id) || container.querySelector(`#${safe}`);

      if (!target) {
        console.warn("Ancre introuvable dans le Shadow DOM :", id);
        return;
      }

      if (effectiveFAQ && target.classList?.contains("faq-toggle")) {
        if (target.getAttribute("aria-expanded") !== "true") {
          target.click();
        }

        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    /**
     * Crée le menu d’ancres interne si la page en possède.
     */
    if (effectiveAnchors) {
      let targets = [];

      if (effectiveFAQ && isSpecialFAQPage) {
        targets = [...container.querySelectorAll("h3")].map((h3) => ({
          element: h3,
          label: h3.textContent || "",
        }));
      } else if (effectiveFAQ) {
        targets = [...container.querySelectorAll(".faq-toggle")].map(
          (button) => ({
            element: button,
            label: button.querySelector("span")?.textContent || "",
          }),
        );
      } else {
        targets = [...container.querySelectorAll("h2")].map((h2) => ({
          element: h2,
          label: h2.textContent || "",
        }));
      }

      if (targets.length > 0) {
        const oldNav = container.querySelector(".anchor-menu");

        if (oldNav) {
          oldNav.remove();
        }

        const items = targets.map(({ element, label }) => {
          const cleanLabel = (label || "").replace(/^[+−]/, "").trim();

          if (!element.id) {
            element.id = slugifySection(cleanLabel);
          }

          element.classList.add("anchor-target");

          return {
            id: element.id,
            label: cleanLabel,
          };
        });

        const nav = document.createElement("nav");
        nav.className = "anchor-menu";
        nav.setAttribute("aria-label", "Sommaire de la page");

        const titleEl = document.createElement("div");
        titleEl.className = "anchor-menu-title";
        titleEl.textContent = "Sommaire";

        const list = document.createElement("ul");
        list.className = "anchor-menu-list";

        const topLi = document.createElement("li");
        const topBtn = document.createElement("button");

        topBtn.type = "button";
        topBtn.className = "anchor-menu-link";
        topBtn.textContent = "Haut de page";

        topBtn.addEventListener("click", () => {
          container.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        topLi.appendChild(topBtn);
        list.appendChild(topLi);

        items.forEach(({ id, label }) => {
          const li = document.createElement("li");
          const button = document.createElement("button");

          button.type = "button";
          button.className = "anchor-menu-link";
          button.textContent = label;

          button.addEventListener("click", () => {
            scrollToIdInsideShadow(id);
          });

          li.appendChild(button);
          list.appendChild(li);
        });

        nav.appendChild(titleEl);
        nav.appendChild(list);
        container.insertBefore(nav, container.firstChild);
      }
    }

    /**
     * Active l’ouverture des tuiles au clic et au clavier.
     */
    if (isTuiles && sections.length) {
      const tiles = Array.from(container.querySelectorAll(".h2-tuiles"));

      tiles.forEach((h2) => {
        const index = Number(h2.getAttribute("data-tuile-index"));
        const section = sections[index];

        if (!section) {
          return;
        }

        const open = () => openModal(section.titleText, section.bodyHtml);

        h2.addEventListener("click", open);
        h2.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        });
      });
    }

    const onExternalScrollRequest = (event) => {
      const id = event?.detail?.id;
      scrollToIdInsideShadow(id);
    };

    const onHashChange = () => {
      const hash = window.location.hash || "";
      const id = hash.startsWith("#") ? hash.slice(1) : hash;

      applyGlossaireFilter();

      if (id) {
        scrollToIdInsideShadow(id);
      }
    };

    window.addEventListener("wp-scroll-to-anchor", onExternalScrollRequest);
    window.addEventListener("hashchange", onHashChange);

    onHashChange();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wp-scroll-to-anchor", onExternalScrollRequest);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [
    html,
    origin,
    cssList,
    customCss,
    isFAQ,
    isAnchors,
    isTuiles,
    isGlossaire,
  ]);

  return <div ref={hostRef} className={className} />;
}