import React from "react";
import { Button } from "@material-ui/core";

import PathFinder from "../../../logic/pathfinder";

export default function SimulateButton() {
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
      Simulate
    </Button>
  );
}