import Header from "./Components/Header";
import Intro from "./Components/Intro";
import Parcours from "./Components/Parcours";
import Comp from "./Components/Comp";
import Projets from "./Components/Projets";
import Envir from "./Components/Envir";
import CV from "./Components/CV";

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
        <Projets />
      </div>

      <div id="envir">
        <Envir />
      </div>

      <div id="cv">
        <CV />
      </div>
    </div>
  );
}
