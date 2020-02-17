import React from "react";
import { Button } from "@material-ui/core";

import PathFinder from "../../../logic/pathFinding/pathfinder";

export default function ClearButton() {
  const handleClick = () => {
    PathFinder.clearPath();
    PathFinder.grid.clearObjects();
    PathFinder.grid.spawnDefaultItems();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      className="RightItem"
      onClick={handleClick}
    >
      Clear
    </Button>
  );
}
