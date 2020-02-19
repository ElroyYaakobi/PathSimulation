import React, { Component } from "react";

import Logo from "./subTypes/logo";
import ObstacleToggle from "./subTypes/obstacleToggle";

import PathAlgorithmSelect from "./subTypes/pathAlgorithmSelect";
import MazeAlgorithmSelect from "./subTypes/mazeAlgorithmSelect";

import SimulatePathButton from "./subTypes/simulatePathButton";
import SimulateMazeButton from "./subTypes/simulateMazeButton";
import ClearButton from "./subTypes/clearButton";

import "../../styling/header.css";

class HeaderComponent extends Component {
  state = {
    obstacleSelected: false
  };

  render() {
    return (
      <div id="header" disabled="true">
        <span className="LeftItems">
          <Logo></Logo>

          <ObstacleToggle className="LeftItem"></ObstacleToggle>
          <PathAlgorithmSelect className="LeftItem"></PathAlgorithmSelect>
          <MazeAlgorithmSelect className="LeftItem"></MazeAlgorithmSelect>
        </span>
        <span className="RightItems">
          <SimulatePathButton></SimulatePathButton>
          <SimulateMazeButton></SimulateMazeButton>
          <ClearButton></ClearButton>
        </span>
      </div>
    );
  }
}

export default HeaderComponent;
