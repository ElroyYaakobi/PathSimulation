import Manager from "../../manager";

import AStarAlgorithm from "./algorithms/score-based/AStar";
import sleep from "../../sleepUtility";

import Config from "../../../config";

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

const simulatePathVisuals = function(grid) {
  for (let cell of grid.cells) {
    if (!cell.pathData.isPath) continue;

    cell.cellColor = Config.rewind.routeColor;
  }
};

const simulateRewind = function(startPoint, endPoint, rewindRoute) {
  const delay = Config.grid.simulationPlaybackDelay;

  return new Promise(async res => {
    rewindRoute.unshift(startPoint); // add start point to beginning
    rewindRoute.push(endPoint); // add end point to end

    for (let cell of rewindRoute) {
      cell.cellColor = Config.rewind.rewindColor;
      await sleep(delay);
    }

    // this will turn off the rewind route
    const resetColorPromise = new Promise(async res => {
      for (let cell of rewindRoute) {
        if (cell.pathData.isPath) continue;

        cell.resetCellColor();
        await sleep(delay);
      }
      res();
    });

    // this will show the actual end route
    let visitedCells = [];
    const renderTrailPromise = new Promise(async secRes => {
      for (let cell of rewindRoute) {
        if (!cell.pathData.isPath || visitedCells.includes(cell)) continue;

        cell.cellColor = Config.rewind.routeColor;
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
