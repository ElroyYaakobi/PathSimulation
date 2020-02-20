import React from "react";
import { Button } from "@material-ui/core";

import Manager from "../../../logic/manager";
import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";

export default function ClearButton(props) {
  const handleClick = () => {
    PathFinder.clearPath();
    Manager.grid.clearObjects();
    Manager.grid.spawnDefaultItems();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={!props.isUsable}
      className="RightItem"
      onClick={handleClick}
    >
      Clear
    </Button>
  );
}
