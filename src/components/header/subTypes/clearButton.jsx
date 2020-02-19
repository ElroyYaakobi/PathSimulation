import React, { useEffect } from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function ClearButton() {
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
    PathFinder.clearPath();
    Manager.grid.clearObjects();
    Manager.grid.spawnDefaultItems();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={!isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Clear
    </Button>
  );
}
