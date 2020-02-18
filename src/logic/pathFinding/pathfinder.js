import Grid from "../grid/grid";
import Config from "../../config";

import AStarAlgorithm from "./algorithms/score-based/AStar";
import sleep from "../sleepUtility";

const grid = new Grid(Config.grid.width, true);
const pathFindingAlgorithm = new AStarAlgorithm();
const pathGenerated = false;

const simulatePath = function(willRewindRoute = false) {
  if (!this.pathFindingAlgorithm) return;

  const {
    tracedRoute,
    rewindStack,
    startPoint,
    endPoint
  } = this.pathFindingAlgorithm.calculateRoute(this.grid, willRewindRoute);

  if (willRewindRoute) {
    this.simulateRewind(startPoint, endPoint, rewindStack);
  } else {
    this.simulatePathVisuals(grid);
  }

  this.pathGenerated = true;

  return tracedRoute;
};

const clearPath = function() {
  if (!this.pathFindingAlgorithm) return;

  this.pathFindingAlgorithm.createPreCalcData(this.grid); // clear all current path finding simulations
  this.pathGenerated = false;
};

//#region Visuals
const rewindColor = "rgb(256, 256,0)";
const routeColor = "rgb(72,209,204)";

const simulatePathVisuals = function(grid) {
  for (let cell of grid.cells) {
    if (!cell.pathData.isPath) continue;

    cell.cellColor = routeColor;
  }
};

const simulateRewind = async function(startPoint, endPoint, rewindRoute) {
  rewindRoute.unshift(startPoint); // add start point to beginning
  rewindRoute.push(endPoint); // add end point to end

  for (let cell of rewindRoute) {
    cell.cellColor = rewindColor;
    await sleep(1);
  }

  // this will turn off the rewind route
  new Promise(async res => {
    for (let cell of rewindRoute) {
      if (cell.pathData.isPath) continue;

      cell.resetCellColor();
      await sleep(1);
      //cell.cellColor = routeColor;
    }
    res();
  });

  // this will show the actual end route
  let visitedCells = [];
  new Promise(async res => {
    for (let cell of rewindRoute) {
      if (!cell.pathData.isPath || visitedCells.includes(cell)) continue;

      cell.cellColor = routeColor;
      visitedCells.push(cell);

      await sleep(100);
    }
    res();
  });
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
