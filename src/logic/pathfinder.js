import Grid from "./grid/grid";
import Config from "../config";

import AStarAlgorithm from "./algorithms/score-based/AStar";
import sleep from "./sleepUtility";

const grid = new Grid(Config.grid.width, true);
const pathFindingAlgorithm = new AStarAlgorithm();
const pathGenerated = false;

const simulatePath = function(willRewindRoute = false) {
  if (!this.pathFindingAlgorithm) return;

  const {
    rewindRoute,
    startPoint,
    endPoint
  } = this.pathFindingAlgorithm.calculateRoute(this.grid, willRewindRoute);

  if (willRewindRoute) {
    this.simulateRewind(startPoint, endPoint, rewindRoute);
  } else {
    this.simulatePathVisuals(grid);
  }

  this.pathGenerated = true;

  return endPoint;
};

const clearPath = function() {
  if (!this.pathFindingAlgorithm) return;

  this.pathFindingAlgorithm.createPreCalcData(this.grid); // clear all current path finding simulations
  this.pathGenerated = false;
};

//#region Visuals
const rewindColor = "rgb(256, 256,0)";
const routeColor = "black";

const simulatePathVisuals = function(grid) {
  for (let cell of grid.cells) {
    if (!cell.pathData.isPath) continue;

    cell.cellColor = routeColor;
  }
};

const simulateRewind = async function(startPoint, endPoint, rewindRoute) {
  for (let cell of rewindRoute) {
    cell.cellColor = rewindColor;
    await sleep(1);
  }

  rewindRoute.unshift(startPoint); // add to beginning
  rewindRoute.push(endPoint); // add to the end

  for (let cell of rewindRoute) {
    if (!cell.pathData.isPath) {
      cell.resetCellColor();
      await sleep(1);

      continue;
    }
    cell.cellColor = routeColor;
  }
};

//#endregion

const pathFinder = {
  grid,
  pathFindingAlgorithm,
  pathGenerated,
  simulatePath,
  clearPath,
  simulatePathVisuals,
  simulateRewind
};

export default pathFinder;
