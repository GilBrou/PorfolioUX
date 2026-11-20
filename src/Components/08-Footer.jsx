/***** MODULE FOOTER / PIED DE PAGE *****/

export default function Footer(props) {
  return (
    <footer className="contact">
      {/* Lien de contact par e-mail. */}
      <a href="mailto:gillian.brousse@outlook.fr" className="cInfosDiv">
        <img
          src={props.data ? props.data.mailI : "loading..."}
          loading="lazy"
          alt={props.data ? props.data.mailA : "loading..."}
        />
        <p>{props.data ? props.data.mail : "loading..."} </p>
      </a>

      {/* Lien vers le profil GitHub. */}
      <a
        className="cInfosDiv"
        href={props.data ? props.data.GitLink : "loading..."}
        target="_blank"
      >
        <img
          src={props.data ? props.data.githubI : "loading..."}
          alt={props.data ? props.data.githubA : "loading..."}
        />
        <p>{props.data ? props.data.git : "loading..."} </p>
      </a>

      {/* Lien vers le profil LinkedIn. */}
      <a
        className="cInfosDiv"
        href={props.data ? props.data.linkdLink : "loading..."}
        target="_blank"
      >
        <img
          src={props.data ? props.data.linkdnI : "loading..."}
          loading="lazy"
          alt={props.data ? props.data.linkdnA : "loading..."}
        />
        <p>{props.data ? props.data.linkdn : "loading..."} </p>
      </a>
    </footer>
  );
}
