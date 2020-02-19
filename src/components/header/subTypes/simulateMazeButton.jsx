import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";

export default function SimulateMazeButton() {
  let initialized = false;
  const [isUsable, setIsUsable] = React.useState(true);

  useEffect(() => {
    if (initialized) return;

    initialized = true;

    Manager.grid.eventEmitter.on("simulateChanged", simulating => {
      setIsUsable(!simulating);
    });
  });

  const handleClick = () => {
    MazeGenerator.generateMaze();
  };

  return (
    <Button
      variant="contained"
      color={"primary"}
      disabled={!isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Maze
    </Button>
  );
}
