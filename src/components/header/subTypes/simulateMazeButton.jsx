import React from "react";
import { Button } from "@material-ui/core";

import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";

export default function SimulateMazeButton(props) {
  const handleClick = () => {
    MazeGenerator.generateMaze();
  };

  return (
    <Button
      variant="contained"
      color={"primary"}
      disabled={!props.isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Maze
    </Button>
  );
}
