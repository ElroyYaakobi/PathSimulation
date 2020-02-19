import PathFinder from "../pathFinding/pathfinder";
import ObjectTypes from "../../grid/objectTypes";

import RecruisiveBacktracing from "./algorithms/RecrusiveBacktracing";

let currentAlgorithm = new RecruisiveBacktracing();

const generateMaze = function() {
  if (!currentAlgorithm) return;

  const grid = PathFinder.grid;
  currentAlgorithm.generateMaze(grid);

  for (let cell of grid.cells) {
    if (cell.mazeData.open || cell.objectType != ObjectTypes.empty) continue;
    cell.objectType = ObjectTypes.obstacle;
  }
};

export default {
  currentAlgorithm,
  generateMaze
};
