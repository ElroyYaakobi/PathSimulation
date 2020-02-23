import Manager from "../../manager";
import PathFinder from "../pathFinding/pathfinder";
import ObjectTypes from "../../grid/objectTypes";

import RecruisiveBacktracing from "./algorithms/RecursiveBacktracking";

import sleep from "../../sleepUtility";
import Config from "../../../config";

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
  const delay = Config.grid.simulationPlaybackDelay;

  return new Promise(async res => {
    console.log("generate");

    // get index so we can have proper delay (every 5 steps)
    for (let i = 0; i < grid.cells.length; i++) {
      const cell = grid.cells[i];
      if (cell.mazeData.open || cell.objectType !== ObjectTypes.empty) continue;
      cell.objectType = ObjectTypes.obstacle;

      // animate 5 cells at a time to make it faster and smoother :)
      if (!animate || i % 5 !== 0) continue;
      await sleep(delay);
    }

    res();
  });
};

export default {
  currentAlgorithm,
  generateMaze,
  setMazeObstacles
};
