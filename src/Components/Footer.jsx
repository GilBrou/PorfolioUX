import { useState, useEffect } from "react";

/*** HEADER/NAV MODULE ***/
export default function Footer(props) {
  return (
    <footer className="contact">
      {/*Icons/Links Wrapper*/}
      {/*Mail Link*/}

      <a href="mailto:gillian.brousse@outlook.fr" className="cInfosDiv">
        <img
          src={props.data ? props.data.mailI : "loading..."}
          loading="lazy"
          alt={props.data ? props.data.mailA : "loading..."}
        />
        <p>{props.data ? props.data.mail : "loading..."} </p>
      </a>
      {/*Github Link*/}

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
      {/*Linkedin Link*/}

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
