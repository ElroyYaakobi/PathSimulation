import React, {
  useEffect
} from "react";

import HeaderComponent from "./header/header";
import GridComponent from "./grid/grid";
import FooterComponent from "./footer/footer";

import Manager from "../logic/manager";

import "../styling/App.css";

export default function App() {
  const [isUsable, setIsUsable] = React.useState(-1);

  /**
   * Set interactable status (when not simulating path!)
   */
  useEffect(() => {
    if (isUsable !== -1) return;
    setIsUsable(true);

    Manager.grid.eventEmitter.on("simulateChanged", simulating => {
      setIsUsable(!simulating);
    });
  }, [isUsable]);

  
  return (
    <div className="App">
      <HeaderComponent isUsable={isUsable}></HeaderComponent>
      <GridComponent isUsable={isUsable}></GridComponent>
      <FooterComponent></FooterComponent>
    </div>
  );
}