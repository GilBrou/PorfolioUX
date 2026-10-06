/*** HEADER/NAV MODULE ***/
export default function Header(props) {
  function DisplayMenu(myMenu, i) {
    const slug = myMenu
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return (
      <li key={"menuItem" + i}>
        <a href={`#${slug}`}>{myMenu}</a>
      </li>
    );
  }
  return (
    <nav>
      <a href="/">
        <img
          src={props.data?.logo || "loading..."}
          alt={props.data?.nom || "loading..."}
        />
      </a>

      <ul>
        <li>
          <a href="/">
            <i className="fa fa-home" aria-hidden="true"></i>
          </a>
        </li>
        {props.data?.sectionTitle?.map((myMenu, i) => DisplayMenu(myMenu, i))}
      </ul>
    </nav>
  );
}
