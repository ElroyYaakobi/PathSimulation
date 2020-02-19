import React from "react";
import { Button } from "@material-ui/core";

import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";

export default function SimulateMazeButton() {
  const handleClick = () => {
    MazeGenerator.generateMaze();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Maze
    </Button>
  );
}
