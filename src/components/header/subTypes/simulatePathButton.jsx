import React from "react";
import { Button } from "@material-ui/core";

import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function SimulatePathButton() {
  const handleClick = () => {
    PathFinder.simulatePath(true);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Path
    </Button>
  );
}
