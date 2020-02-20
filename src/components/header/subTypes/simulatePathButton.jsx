import React from "react";
import { Button } from "@material-ui/core";

import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function SimulatePathButton(props) {
  const handleClick = () => {
    PathFinder.simulatePath(true);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={!props.isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Simulate Path
    </Button>
  );
}
