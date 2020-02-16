import React, { Component } from "react";

import HeaderComponent from "./header/header";
import GridComponent from "./grid/grid";

import "../styling/App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <GridComponent></GridComponent>
      </div>
    );
  }
}

export default App;
