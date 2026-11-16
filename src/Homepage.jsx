import Header from "./Components/01-Header";
import Intro from "./Components/02-Intro";
import Parcours from "./Components/03-Parcours";
import Comp from "./Components/04-Competences";
import Envir from "./Components/06-outils";
import CV from "./Components/07-CV";
import Footer from "./Components/08-Footer";
import Projet01UX from "./Components/05-Projet-01-UX";
import Projet02LMS from "./Components/05-Projet-02-LMS";
import Projet03DEV from "./Components/05-Projet-03-DEV";
import Projet04GRAPH from "./Components/05-Projet-04-GRAPH";
import AnimatedBackground from "./Components/AnimatedBackground.jsx";

export default function Homepage({ data }) {
  return (
    <div className="homepage">
      <Header data={data.nav} />

      <Intro data={data.intro} />

      <div id="parcours">
        <Parcours data={data.parcours} />
      </div>

      <div id="competences">
        <Comp data={data.comp} />
      </div>

      <div id="projets">
        <section id="realisations">
          <div className="realisations">
            <h2 className="secTitle01">Exemples de réalisations</h2>
            <Projet01UX />
            <Projet02LMS />
            <Projet03DEV />
            <Projet04GRAPH />
          </div>
        </section>
      </div>

      <div id="outils">
        <Envir />
      </div>

      <div id="cv">
        <CV />
      </div>
      <div id="contact">
        <Footer data={data.contact} />
      </div>
      <AnimatedBackground />
    </div>
  );
}
