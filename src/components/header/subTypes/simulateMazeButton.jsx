import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";

export default function SimulateMazeButton() {
  const [isUsable, setIsUsable] = React.useState(-1);

  useEffect(() => {
    if (isUsable !== -1) return;
    setIsUsable(true);

    Manager.grid.eventEmitter.on("simulateChanged", simulating => {
      setIsUsable(!simulating);
    });
  }, [isUsable]);

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
