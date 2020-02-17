import React from "react";

import HeaderComponent from "./header/header";
import GridComponent from "./grid/grid";

import "../styling/App.css";

export default function App() {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <GridComponent></GridComponent>
    </div>
  );
}
