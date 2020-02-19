import Manager from "../../manager";
import PathFinder from "../pathFinding/pathfinder";
import ObjectTypes from "../../grid/objectTypes";

import RecruisiveBacktracing from "./algorithms/RecrusiveBacktracing";

import sleep from "../../sleepUtility";

let currentAlgorithm = new RecruisiveBacktracing();

const generateMaze = async function() {
  if (!currentAlgorithm) return;

  Manager.grid.setSimulationState(true);

  // clear path finder first so that we don't cause any issues
  PathFinder.clearPath();

  // generate maze
  const grid = Manager.grid;
  currentAlgorithm.generateMaze(grid);

  await setMazeObstacles(grid, true);

  Manager.grid.setSimulationState(false);
};

const setMazeObstacles = function(grid, animate) {
  return new Promise(async res => {
    console.log("generate");
    for (let cell of grid.cells) {
      if (cell.mazeData.open || cell.objectType !== ObjectTypes.empty) continue;
      cell.objectType = ObjectTypes.obstacle;

      if (!animate) continue;
      await sleep(1);
    }

    res();
  });
};

export default {
  currentAlgorithm,
  generateMaze,
  setMazeObstacles
};
