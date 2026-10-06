import Header from "./Components/Header";
import Intro from "./Components/Intro";

import Parcours from "./Components/Parcours";
import Comp from "./Components/Comp";
import Projets from "./Components/Projets";

import projetsDev from "./datas/projetsDev.json";
import projetsGraph from "./datas/projetsGraph.json";

export default function Homepage({ data }) {
  return (
    <div className="homepage">
      <Header data={data.nav} />
      <Intro data={data.intro} />
      <Parcours data={data.parcours} />
      <Comp data={data.comp} />

      <Projets
        data={{
          pDatas: projetsDev,
          pDatas2: projetsDev,
          pDatas3: projetsDev,
          pDatas4: projetsGraph,
        }}
      />
    </div>
  );
}
