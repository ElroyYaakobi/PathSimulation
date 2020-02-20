import React from "react";

import Logo from "./subTypes/logo";
import ObstacleToggle from "./subTypes/obstacleToggle";

import PathAlgorithmSelect from "./subTypes/pathAlgorithmSelect";
import MazeAlgorithmSelect from "./subTypes/mazeAlgorithmSelect";

import SimulatePathButton from "./subTypes/simulatePathButton";
import SimulateMazeButton from "./subTypes/simulateMazeButton";
import ClearButton from "./subTypes/clearButton";

import "../../styling/header.css";

export default function HeaderComponent(props) {
  return (
    <div id="header" disabled={true}>
      <span className="LeftItems">
        <Logo></Logo>

        <ObstacleToggle isUsable={props.isUsable} className="LeftItem" />
        <PathAlgorithmSelect isUsable={props.isUsable} className="LeftItem" />
        <MazeAlgorithmSelect isUsable={props.isUsable} className="LeftItem" />
      </span>
      <span className="RightItems">
        <SimulatePathButton isUsable={props.isUsable} />
        <SimulateMazeButton isUsable={props.isUsable} />
        <ClearButton isUsable={props.isUsable} />
      </span>
    </div>
  );
}
