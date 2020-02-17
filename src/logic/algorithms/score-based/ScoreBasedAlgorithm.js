import BaseAlgorithm from "../BaseAlgorithm";
import ObjectTypes from "../../grid/objectTypes";

export default class ScoreBasedAlgorithm extends BaseAlgorithm {
  calculateRoute(grid, willRewindRoute) {
    const t0 = Date.now();
    const rewindStack = [];
    let tracedRoute = undefined;

    let { unvisited, startPoint, endPoint } = this.createPreCalcData(grid);

    while (unvisited.length > 0) {
      const cell = this.findSmallestScoreCell(unvisited);
      const cellNeighbors = cell.getNeighbors();

      // if we have the end point in our neighbors then we won!
      if (cellNeighbors.find(x => x === endPoint)) {
        endPoint.pathData.prev = cell;
        break;
      }

      unvisited = unvisited.filter(x => x !== cell); // remove from unvisited as we are calculating it now
      cell.pathData.visited = true; // add visited flag

      for (let neighbor of cellNeighbors) {
        const neighborPathData = neighbor.pathData;

        // ignore obstacles and already visited cells
        if (
          neighbor.objectType === ObjectTypes.obstacle ||
          neighborPathData.visited
        )
          continue;

        // calculate neighbor score
        const score = this.calculateScore(cell, neighbor, endPoint);
        const isNeighborCalculated = neighborPathData.score > 0;

        // if this neighbor was already calculated and the old calculatioin score
        // is smaller than what we just did, no need to calculate again!
        if (isNeighborCalculated && neighborPathData.score <= score) continue;

        if (!isNeighborCalculated) {
          unvisited.push(neighbor);
        }

        neighborPathData.score = score;
        neighborPathData.prev = cell;

        if (!willRewindRoute) continue;
        rewindStack.push(neighbor);
      }
    }

    const foundPath = endPoint.pathData.prev;
    if (foundPath) {
      tracedRoute = this.tracebackRoute(endPoint);
    }

    const t1 = Date.now();

    console.log("It took " + (t1 - t0) + " milliseconds to compute path!");

    return { tracedRoute, rewindStack, startPoint, endPoint };
  }

  calculateScore(cell, neighborCell, endPoint) {
    return undefined;
  }

  prepareCellForPathFinding(cell) {
    super.prepareCellForPathFinding(cell);

    // set score.
    cell.pathData.score = 0;
  }

  findSmallestScoreCell(cells) {
    if (cells.length === 1) return cells[0];

    let smallestScoreCell = undefined;
    for (let i = cells.length - 1; i >= 0; i--) {
      const cell = cells[i];

      // check if we have a smallest score assigned and if so, if the current one is higer, continue
      if (
        smallestScoreCell &&
        cell.pathData.score >= smallestScoreCell.pathData.score
      )
        continue;

      smallestScoreCell = cell;
    }

    return smallestScoreCell;
  }
}
