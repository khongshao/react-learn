import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home"
// import Amap from "./views/amap/index"
// import amapCluster from "./views/amap-cluster/index"
// import amapPoint from "./views/amap-point/index"
// import amapCircle from "./views/amap-circle/index"

// import Qqmap from "./views/qqmap/index"

// import line from "./views/d3/line/index"

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/amap" component={Amap}></Route>
        <Route exact path="/amapCluster" component={amapCluster}></Route>
        <Route exact path="/amapPoint" component={amapPoint}></Route>
        <Route exact path="/amapCircle" component={amapCircle}></Route>


        <Route exact path="/qqmap" component={Qqmap}></Route>


        <Route exact path="/line" component={line}></Route> */}
      </Router>
    </div>
  );
}

export default App;
