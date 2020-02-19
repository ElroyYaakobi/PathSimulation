import Manager from "../../manager";

import AStarAlgorithm from "./algorithms/score-based/AStar";
import sleep from "../../sleepUtility";

const pathFindingAlgorithm = new AStarAlgorithm();
const pathGenerated = false;

const simulatePath = async function(willRewindRoute = false) {
  if (!this.pathFindingAlgorithm) return;

  Manager.grid.setSimulationState(true);

  const grid = Manager.grid;

  const {
    tracedRoute,
    rewindStack,
    startPoint,
    endPoint
  } = this.pathFindingAlgorithm.calculateRoute(grid, willRewindRoute);

  if (willRewindRoute) {
    await this.simulateRewind(startPoint, endPoint, rewindStack);
  } else {
    this.simulatePathVisuals(grid);
  }

  this.pathGenerated = true;
  Manager.grid.setSimulationState(false);

  return tracedRoute;
};

const clearPath = function() {
  if (!this.pathFindingAlgorithm) return;

  this.pathFindingAlgorithm.prepareForAlgorithmCalculation(Manager.grid); // clear all current path finding simulations
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

const simulateRewind = function(startPoint, endPoint, rewindRoute) {
  return new Promise(async res => {
    rewindRoute.unshift(startPoint); // add start point to beginning
    rewindRoute.push(endPoint); // add end point to end

    for (let cell of rewindRoute) {
      cell.cellColor = rewindColor;
      await sleep(1);
    }

    // this will turn off the rewind route
    const resetColorPromise = new Promise(async res => {
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
    const renderTrailPromise = new Promise(async secRes => {
      for (let cell of rewindRoute) {
        if (!cell.pathData.isPath || visitedCells.includes(cell)) continue;

        cell.cellColor = routeColor;
        visitedCells.push(cell);

        await sleep(100);
      }
      secRes();
    });

    await Promise.all([resetColorPromise, renderTrailPromise]);

    res();
  });
};

//#endregion

const pathFinder = {
  pathFindingAlgorithm,
  pathGenerated,
  simulatePath,
  clearPath,
  simulatePathVisuals,
  simulateRewind
};

export default pathFinder;
