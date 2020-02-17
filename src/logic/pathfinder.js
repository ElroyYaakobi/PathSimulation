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

  const resetCells = new Promise(async res => {
    for (let cell of rewindRoute) {
      if (cell.pathData.isPath) continue;

      cell.resetCellColor();
      await sleep(1);
      //cell.cellColor = routeColor;
    }
    res();
  });

  // create a new array of cells without cells that aren't path.
  const rewind_pathCells = rewindRoute.filter(cell => cell.pathData.isPath);
  rewind_pathCells.unshift(startPoint); // add start point to beginning
  rewind_pathCells.push(endPoint); // add end point to the end

  const drawPath = new Promise(async res => {
    for (let cell of rewind_pathCells) {
      cell.cellColor = routeColor;
      await sleep(100);
    }
    res();
  });

  // run asynchrously
  await Promise.all([resetCells, drawPath]);
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
