import React, { Component } from "react";

import Logo from "./subTypes/logo";
import ObstacleToggle from "./subTypes/obstacleToggle";
import AlgorithmSelect from "./subTypes/algorithmSelect";
import SimulateButton from "./subTypes/simulateButton";
import ClearButton from "./subTypes/clearButton";

import "../../styling/header.css";

class HeaderComponent extends Component {
  state = {
    obstacleSelected: false
  };

  render() {
    return (
      <div id="header">
        <div className="LeftItems">
          <Logo></Logo>
        </div>
        <div className="MiddleItemsBox">
          <ObstacleToggle></ObstacleToggle>
          <AlgorithmSelect></AlgorithmSelect>
        </div>
        <div className="RightItems">
          <SimulateButton></SimulateButton>
          <ClearButton></ClearButton>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
