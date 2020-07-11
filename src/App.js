import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home"
import Test from "./views/Test"

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/test" component={Test}></Route>
      </Router>
    </div>
  );
}

export default App;
