/****** APPENDIX ******/

/**
 * Transforme une chaîne en slug d’URL propre.
 */
export function RegexThis(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  let toModify1 = value.toLowerCase();

  let toModify2 = toModify1.replace(/-/g, "-");
  let toModify3 = toModify2.replace(/["âà]/g, "a");
  let toModify4 = toModify3.replace(/[" ]/g, "-");
  let toModify5 = toModify4.replace(/["']/g, "-");
  let toModify6 = toModify5.replace(/--/g, "-");
  let toModify7 = toModify6.replace(/["èéêë]/g, "e");
  let toModify8 = toModify7.replace(/["/]/g, "-");
  let toModify9 = toModify8.replace(/["(]/g, "");
  let toModify10 = toModify9.replace(/[")"]/g, "");
  let toModify11 = toModify10.replace(/["ç]/g, "c");
  let toModify12 = toModify11.replace(/["î]/g, "i");
  let toModify13 = toModify12.replace(/[",]/g, "");
  let toModify14 = toModify13.replace(/:/g, "-");
  let toModify15 = toModify14.replace(/---/g, "-");
  let toModify16 = toModify15.replace(/--/g, "-");
  let toModify17 = toModify16.replace(/["...""]/g, "");
  let toModify18 = toModify17.replace(/["?"]/g, "");
  let toModify19 = toModify18.replace(/["!"]/g, "");
  let toModify20 = toModify19.replace(/--/g, "-");
  let toModify21 = toModify20.replace(/ond-/g, "ond");

  return toModify21;
}

/**
 * Restaure partiellement les accents et les apostrophes dans un texte.
 */
export function restoreAccents(slug) {
  if (!slug || typeof slug !== "string") {
    return slug;
  }

  let str = slug;

  // Restaure certains cas d’apostrophe.
  str = str.replace(/\bl /gi, "l'");

  // Liste des remplacements courants.
  const accentMap = [
    { plain: /\ba /gi, accented: "à " },
    { plain: /\be /gi, accented: "é " },
    { plain: /eme\b/gi, accented: "ème" },
    { plain: /universite/gi, accented: "université" },
    { plain: /bibliotheque/gi, accented: "bibliothèque" },
    { plain: /mediateque/gi, accented: "médiathèque" },
    { plain: /acceuil/gi, accented: "accueil" },
    { plain: /accueil/gi, accented: "accueil" },
  ];

  accentMap.forEach(({ plain, accented }) => {
    str = str.replace(plain, accented);
  });

  return str.trim();
}

/**
 * Transforme un slug en texte simple en remplaçant les tirets par des espaces.
 */
export function RegexThis2(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const lower = value.toLowerCase();

  return lower.replace(/-/g, " ");
}

/**
 * Transforme un segment d’URL en texte lisible avec accents.
 */
export function RegexBackWithAccent(value) {
  if (!value || typeof value !== "string") {
    return "";
  }

  const withoutDashes = RegexThis2(value);
  const withAccents = restoreAccents(withoutDashes);

  return withAccents;
}

/**
 * Retourne un tableau d’identifiants à partir d’un tableau d’articles.
 */
export function GetArticlesLinks(props) {
  if (!Array.isArray(props)) {
    return [];
  }

  return props.map((item) => item.id);
}

/**
 * Construit les chemins des pages BU à partir des catégories WordPress.
 */
export function GetPagesLinks(props) {
  if (!Array.isArray(props)) {
    return [];
  }

  const myArray = [];

  for (const post of props) {
    const categories = Array.isArray(post.categories) ? post.categories : [];
    const slug = post.slug;

    if (!slug) {
      continue;
    }

    if (categories.includes(5)) {
      myArray.push(`votre-bibliotheque/${slug}`);
    }

    if (categories.includes(6)) {
      myArray.push(`services/${slug}`);
    }

    if (categories.includes(7)) {
      myArray.push(`ressources-documentaires/${slug}`);
    }

    if (categories.includes(8)) {
      myArray.push(`aide-formation/${slug}`);
    }

    if (categories.includes(9)) {
      myArray.push(`appui-a-la-recherche/${slug}`);
    }

    if (categories.includes(10)) {
      myArray.push(`votre-bibliotheque/equipements-a-disposition/${slug}`);
    }

    if (categories.includes(11)) {
      myArray.push(`ressources-documentaires/guides-thematiques/${slug}`);
    }

    if (categories.includes(35)) {
      myArray.push(
        `ressources-documentaires/guides-thematiques/lettres-langues-histoire/${slug}`,
      );
    }

    if (categories.includes(36)) {
      myArray.push(
        `ressources-documentaires/guides-thematiques/droit-economie-gestion/${slug}`,
      );
    }

    if (categories.includes(48)) {
      myArray.push(
        `ressources-documentaires/guides-thematiques/sciences/${slug}`,
      );
    }
  }

  return myArray;
}

/**
 * Retourne les slugs des menus de niveau 1.
 */
export function GetPagesLinks2(props) {
  const menu = Array.isArray(props?.menu) ? props.menu : [];
  const myArray = [];

  for (const item of menu) {
    const titreMenu = item.titreMenu;

    if (!titreMenu) {
      continue;
    }

    myArray.push(RegexThis(titreMenu));
  }

  return myArray;
}

/**
 * Retourne les chemins des pages de niveau 2 qui possèdent un menu de niveau 3.
 */
export function GetPagesLinks3(props) {
  if (!Array.isArray(props)) {
    return [];
  }

  const myArray = [];

  for (const menu1 of props) {
    const titreMenu = menu1.titreMenu;
    const menu2 = Array.isArray(menu1.menu2) ? menu1.menu2 : [];

    if (!titreMenu) {
      continue;
    }

    for (const menu2Item of menu2) {
      const hasMenu3 =
        Array.isArray(menu2Item.menu3) && menu2Item.menu3.length !== 0;

      if (hasMenu3) {
        myArray.push(`${RegexThis(titreMenu)}/${RegexThis(menu2Item.element)}`);
      }
    }
  }

  return myArray;
}

/**
 * Retourne les slugs des articles appartenant à la catégorie actualité.
 */
export function GetActuLinks(props) {
  if (!Array.isArray(props)) {
    return [];
  }

  const myArray = [];

  for (const post of props) {
    const categories = Array.isArray(post.categories) ? post.categories : [];

    if (categories.includes(2) && post.slug) {
      myArray.push(post.slug);
    }
  }

  return myArray;
}