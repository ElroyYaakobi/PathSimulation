import BaseAlgorithm from "../../BaseAlgorithm";

/**
 * Base class for all path algorithms
 */
export default class BasePathAlgorithm extends BaseAlgorithm {
  calculateRoute(grid, willRewindRoute) {
    return undefined;
  }

  calculateScore(cell, neighborCell, endPoint) {
    return undefined;
  }

  prepareForAlgorithmCalculation(grid) {
    const {
      startPoint,
      endPoint
    } = super.prepareForAlgorithmCalculation(grid);

    const unvisited = [startPoint];
    const visited = [];

    return {
      unvisited,
      visited,
      startPoint,
      endPoint
    };
  }

  prepareCellForAlgorithmCalculation(cell) {
    super.prepareCellForAlgorithmCalculation(cell);

    cell.resetCellColor();
    cell.pathData = {};
  }

  tracebackRoute(startPoint, endPoint) {
    if (!startPoint || !endPoint || !endPoint.pathData.prev) return;

    const route = [];

    let prev = endPoint;
    while (prev) {
      route.push(prev);
      prev.pathData.isPath = true;

      prev = prev.pathData.prev;
    }

    return route.reverse();
  }
}