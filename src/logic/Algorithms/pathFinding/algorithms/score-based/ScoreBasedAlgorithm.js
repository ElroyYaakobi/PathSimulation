import BasePathAlgorithm from "../BasePathAlgorithm";
import ObjectTypes from "../../../../grid/objectTypes";

export default class ScoreBasedAlgorithm extends BasePathAlgorithm {
  calculateRoute(grid, willRewindRoute) {
    const t0 = Date.now();
    const rewindStack = [];
    let tracedRoute = undefined;

    let {
      unvisited,
      visited,
      startPoint,
      endPoint
    } = this.prepareForAlgorithmCalculation(grid);

    while (unvisited.length > 0) {
      const cell = this.findSmallestScoreCell(unvisited);
      const cellNeighbors = cell.getNeighbors();

      // if we have the end point in our neighbors then we won!
      if (cellNeighbors.find(neighbor => this.isNeighborTheTarget(cell, neighbor, endPoint))) {
        break;
      }

      unvisited = unvisited.filter(x => x !== cell); // remove from unvisited as we are calculating it now
      visited.push(cell); // add cell to visited

      for (let neighbor of cellNeighbors) {
        const neighborCell = neighbor.cell;
        const neighborPathData = neighborCell.pathData;

        // ignore obstacles and already visited cells
        if (
          neighborCell.objectType === ObjectTypes.obstacle ||
          visited.includes(neighborCell)
        )
          continue;

        // calculate neighbor score
        const score = this.calculateScore(cell, neighborCell, endPoint);
        const isNeighborCalculated = neighborPathData.score > 0;

        // if this neighbor was already calculated and the old calculatioin score
        // is smaller than what we just did, no need to calculate again!
        if (isNeighborCalculated && neighborPathData.score <= score) continue;

        if (!isNeighborCalculated) {
          this.addCellToUnvisited(cell, neighborCell, unvisited);
        }

        neighborPathData.score = score;
        neighborPathData.prev = cell;

        if (!willRewindRoute) continue;
        rewindStack.push(neighborCell);
      }
    }

    tracedRoute = this.tracebackRoute(startPoint, endPoint);

    const t1 = Date.now();

    console.log("It took " + (t1 - t0) + " milliseconds to compute path!");

    return {
      tracedRoute,
      rewindStack,
      startPoint,
      endPoint
    };
  }

  calculateScore(cell, neighborCell, endPoint) {
    return undefined;
  }

  prepareCellForAlgorithmCalculation(cell) {
    super.prepareCellForAlgorithmCalculation(cell);

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

  isNeighborTheTarget(currCell, neighbor, endPoint) {
    const isEndTarget = neighbor.cell === endPoint;

    if (!isEndTarget) return false;

    // set the prev cell of the neighbor (ie end point) to the current cell!
    neighbor.cell.pathData.prev = currCell;
    return true;
  }

  addCellToUnvisited(cell, neighborCell, unvisited) {
    unvisited.push(neighborCell);
  }
}