import Manager from "../../manager";
import PathFinder from "../pathFinding/pathfinder";
import ObjectTypes from "../../grid/objectTypes";

import RecruisiveBacktracing from "./algorithms/RecursiveBacktracking";

import sleep from "../../sleepUtility";
import Config from "../../../config";

const currentAlgorithm = new RecruisiveBacktracing();

const generateMaze = async function() {
  const algorithm = this.currentAlgorithm;

  if (!algorithm) return;

  Manager.grid.setSimulationState(true);

  // clear path finder first so that we don't cause any issues
  PathFinder.clearPath();

  const grid = Manager.grid;
  const { openCells, rewindStack } = algorithm.generateMaze(grid);

  await drawRewind(grid, openCells, rewindStack, algorithm);

  Manager.grid.setSimulationState(false);
};

const drawRewind = function(grid, visited, rewindStack, algorithm) {
  const delay = Config.grid.simulationPlaybackDelay * 4;

  if (algorithm.passageCarver) {
    return passageCarverRewind(grid, visited, rewindStack, delay);
  }

  return wallAdderRewind(grid, visited, rewindStack, delay);
};

const passageCarverRewind = function(grid, visited, rewindStack, delay) {
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
  });
};

const wallAdderRewind = function(grid, visited, rewindStack, delay) {
  return new Promise(async res => {
    // iterate the rewind stack and set each rewinded cell color to the rewind color
    // after a certain delay, reset the cell color and if its an obstacle cell (not a flag/ home)
    // set the object type to empty -> meaning, clear the cell/ create a passage
    for (let cell of rewindStack) {
      cell.cellColor = Config.rewind.rewindColor;

      await sleep(delay);

      cell.resetCellColor();

      // clear the actual cell
      if (!visited.includes(cell) || cell.objectType !== ObjectTypes.empty)
        continue;

      cell.objectType = ObjectTypes.obstacle;
    }

    // to finish it off, clear the cell color of all cells
    for (let cell of grid.cells) {
      cell.resetCellColor();
    }

    res();
  });
};

export default {
  currentAlgorithm,
  generateMaze,
  drawRewind,
  passageCarverRewind,
  wallAdderRewind
};
