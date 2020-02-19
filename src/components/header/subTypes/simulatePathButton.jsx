import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function SimulatePathButton() {
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
    PathFinder.simulatePath(true);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={!isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Path
    </Button>
  );
}
