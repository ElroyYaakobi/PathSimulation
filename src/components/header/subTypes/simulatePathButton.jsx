import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function SimulatePathButton() {
  const [isUsable, setIsUsable] = React.useState(-1);

  useEffect(() => {
    if (isUsable !== -1) return;
    setIsUsable(true);

    Manager.grid.eventEmitter.on("simulateChanged", simulating => {
      setIsUsable(!simulating);
    });
  }, [isUsable]);

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
