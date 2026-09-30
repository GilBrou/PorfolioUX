/***GENERAL***/
import { useState, useEffect } from "react";

/***COMPONENTS***/
import Header from "./Components/Header";
import Intro from "./Components/Intro";
import Parcours from "./Components/Parcours";

/*
import Projets from "./Components/Projets";
import CV from "./Components/CV";
import Contact from "./Components/Contact";*/

/***DATAS***/
import projetsD from "./datas/projetsD.json";

export default function Homepage(data) {
  /*Get projects datas*/
  const [pDatas, setPDatas] = useState({});
  useEffect(() => {
    async function fetchDatas() {
      setPDatas(projetsD);
    }
    fetchDatas();
  }, []);

  /***PAGE***/
  return (
    <div className="homepage">
      <Header data={data.data.nav} />
      <Intro data={data.data.intro} />
      <Parcours data={data.data.parcours} />

      {/*
            <Parcours data={data.data.parcours} />
            <Projets data={pDatas} />
            <CV data={data.data.cv} />
            <Contact data={data.data.contact} />*/}
    </div>
  );
}
