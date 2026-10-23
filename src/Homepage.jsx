import Header from "./Components/Header";
import Intro from "./Components/Intro";
import Parcours from "./Components/Parcours";
import Comp from "./Components/Comp";
import Projets from "./Components/Projets";
import Envir from "./Components/Envir";
import CV from "./Components/CV";
import Footer from "./Components/Footer";
import datas from "./datas/data.json";

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

      <div id="outils">
        <Envir />
      </div>

      <div id="cv">
        <CV />
      </div>
      <div id="contact">
        <Footer data={datas.contact} />
      </div>
    </div>
  );
}
