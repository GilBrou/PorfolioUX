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
export default function Header({ data, setActivePage, activePage }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = data?.sectionTitle ?? [];

  // État du scroll
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

  // Gestion du clic Home
  function handleHomeClick(e) {
    e.preventDefault();

    setActivePage("intro");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Gestion des clics dans le menu
  function handleMenuClick(e, myMenu) {
    e.preventDefault();

    const slug = slugify(myMenu);

    setActivePage(slug);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <a href="#top" className="imgWrapNav" onClick={handleHomeClick}>
        <img src={data?.logo || "loading..."} alt={data?.nom || "loading..."} />
      </a>

      <ul>
        {/* HOME */}
        <li className={activePage === "intro" ? "active2" : ""}>
          <a
            href="#top"
            onClick={handleHomeClick}
            aria-label="Retour à l'introduction"
          >
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>

        {/* SECTIONS */}
        {menuItems.map((myMenu, i) => {
          const slug = slugify(myMenu);

          return (
            <li
              key={"menuItem" + i}
              className={activePage === slug ? "active" : ""}
            >
              <a href={`#${slug}`} onClick={(e) => handleMenuClick(e, myMenu)}>
                {myMenu}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
