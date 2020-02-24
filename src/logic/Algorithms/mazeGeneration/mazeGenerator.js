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
  const { visited, rewindStack } = currentAlgorithm.generateMaze(grid);

  await drawRewind(grid, visited, rewindStack, true);

  Manager.grid.setSimulationState(false);
};

const drawRewind = function(grid, visited, rewindStack, animate) {
  const delay = Config.grid.simulationPlaybackDelay;

  return new Promise(async res => {
    // start with setting all cells color to route color &
    // assigning all empty cells to obstacles
    for (let cell of grid.cells) {
      if (cell.objectType !== ObjectTypes.empty) continue;

      cell.cellColor = Config.rewind.routeColor;
      cell.objectType = ObjectTypes.obstacle;
    }

    // iterate the rewind stack and set each rewinded cell color to the rewind color
    // after a certain delay, reset the cell color and if its an obstacle cell (not a flag/ home)
    // set the object type to empty -> meaning, clear the cell/ create a passage
    for (let cell of rewindStack) {
      cell.cellColor = Config.rewind.rewindColor;

      await sleep(delay);

      cell.resetCellColor();

      // clear the actual cell
      if (!visited.includes(cell) || cell.objectType !== ObjectTypes.obstacle)
        continue;

      cell.objectType = ObjectTypes.empty;
    }

    // to finish it off, clear the cell color of all cells
    for (let cell of grid.cells) {
      cell.resetCellColor();
    }

    res();

    /*
    // get index so we can have proper delay (every 5 steps)
    for (let i = 0; i < grid.cells.length; i++) {
      const cell = grid.cells[i];
      if (visited.includes(cell) || cell.objectType !== ObjectTypes.empty)
        continue;

      cell.objectType = ObjectTypes.obstacle;

      // animate 5 cells at a time to make it faster and smoother :)
      if (!animate || i % 5 !== 0) continue;
      await sleep(delay);
    }

    res();
    */
  });
};

export default {
  currentAlgorithm,
  generateMaze,
  drawRewind
};
