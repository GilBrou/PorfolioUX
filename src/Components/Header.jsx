/***HEADER/NAV MODULE***/
export default function Header(props) {
  return (
    <nav>
      <a href="/">
        <img
          src={props.data ? props.data.logo : "loading..."}
          alt={props.data ? props.data.nom : "loading..."}
        />{" "}
      </a>

      <ul>
        <li>
          <a href="#a-propos">
            {props.data ? props.data.sectionTitle1 : "loading..."}
          </a>
        </li>

        <li>
          <a href="#parcours">
            <i className="fa fa-facebook"></i>
            {props.data ? props.data.sectionTitle2 : "loading..."}
          </a>
        </li>

        <li>
          <a href="#réalisations">
            {props.data ? props.data.sectionTitle3 : "loading..."}
          </a>
        </li>
        <li>
          <a href="#cv">
            {props.data ? props.data.sectionTitle4 : "loading..."}
          </a>
        </li>

        <li>
          <a href="#contact">
            {props.data ? props.data.sectionTitle5 : "loading..."}
          </a>
        </li>
      </ul>
    </nav>
  );
}
