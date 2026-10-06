/***GENERAL***/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

/*** PAGES & COMPOSANTS ***/
import Homepage from "./Homepage";
import Loader from "./Components/Loader.jsx";

/***DATAS***/
import JsonData from "./datas/data.json";

/*Main app*/
function App() {
  /*Get datas*/
  const [allDatas, setAllDatas] = useState({});
  useEffect(() => {
    async function fetchDatas() {
      setAllDatas(JsonData);
    }
    fetchDatas();
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/accueil">
            <Homepage data={allDatas} />
          </Route>
          <Route>
            <Redirect to="/accueil" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
