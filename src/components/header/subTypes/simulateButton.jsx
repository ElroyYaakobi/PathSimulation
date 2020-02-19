import React from "react";
import { Button } from "@material-ui/core";

import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";
import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";

export default function SimulateButton() {
  const handleClick = () => {
    //PathFinder.simulatePath(true);
    MazeGenerator.generateMaze();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className="RightItem"
      onClick={handleClick}
    >
      Simulate
    </Button>
  );
}
