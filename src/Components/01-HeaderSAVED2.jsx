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

  const menuItems = props.data?.sectionTitle ?? [];

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Synchronise avec le # de l'URL
    function handleHashChange() {
      setActiveSlug(decodeURIComponent(window.location.hash.slice(1)));
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Observe les sections pour détecter celle qui est visible
    const sections = menuItems
      .map((title) => document.getElementById(slugify(title)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSlug(visibleSections[0].target.id);
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
      observer.disconnect();
    };
  }, [menuItems]);

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
      <a href="/">
        <img
          src={props.data?.logo || "loading..."}
          alt={props.data?.nom || "loading..."}
        />
      </a>

      <ul>
        <li>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setActiveSlug("");
              window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
              );
            }}
            aria-label="Retour en haut de page"
          >
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>
        {menuItems.map((myMenu, i) => DisplayMenu(myMenu, i))}
      </ul>
    </nav>
  );
}
