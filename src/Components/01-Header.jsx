import { useState, useEffect } from "react";

/*** SLUG HELPER ***/
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/*** HEADER/NAV MODULE ***/
export default function Header(props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlug, setActiveSlug] = useState("");
  const [isHomeActive, setIsHomeActive] = useState(() => !window.location.hash);

  const menuItems = props.data?.sectionTitle ?? [];

  // État de la navigation au scroll
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Synchronisation URL + détection des sections visibles
  useEffect(() => {
    function handleHashChange() {
      const slug = decodeURIComponent(window.location.hash.slice(1));

      setActiveSlug(slug);
      setIsHomeActive(!slug);
    }

    function handleScroll() {
      if (window.scrollY <= 5) {
        setActiveSlug("");
        setIsHomeActive(true);
      } else {
        setIsHomeActive(false);
      }
    }

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    const sections = menuItems
      .map((title) => document.getElementById(slugify(title)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // En haut : aucun élément n'a la classe active
        if (window.scrollY <= 5) {
          setActiveSlug("");
          setIsHomeActive(true);
          return;
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSlug(visibleSections[0].target.id);
          setIsHomeActive(false);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [menuItems]);

  // Clic Home : remonter sans recharger
  function handleHomeClick(e) {
    e.preventDefault();

    setActiveSlug("");
    setIsHomeActive(true);

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Génération des liens de navigation
  function DisplayMenu(myMenu, i) {
    const slug = slugify(myMenu);

    return (
      <li key={"menuItem" + i} className={activeSlug === slug ? "active" : ""}>
        <a href={`#${slug}`}>{myMenu}</a>
      </li>
    );
  }

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <a href="/" className="imgWrapNav">
        <img
          src={props.data?.logo || "loading..."}
          alt={props.data?.nom || "loading..."}
        />
      </a>

      <ul>
        {/* HOME */}
        <li className={isHomeActive ? "active2" : ""}>
          <a
            href="#top"
            onClick={handleHomeClick}
            aria-label="Retour en haut de page"
          >
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>

        {/* SECTIONS */}
        {menuItems.map((myMenu, i) => DisplayMenu(myMenu, i))}
      </ul>
    </nav>
  );
}
