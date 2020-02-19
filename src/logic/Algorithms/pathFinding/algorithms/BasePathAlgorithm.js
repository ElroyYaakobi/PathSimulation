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
      unvisited,
      visited,
      startPoint,
      endPoint
    } = super.prepareForAlgorithmCalculation(grid);

    unvisited.push(startPoint);

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

  tracebackRoute(endPoint) {
    if (!endPoint || !endPoint.pathData.prev) return;

    const route = [];

    let prev = endPoint;
    while (prev) {
      prev.pathData.isPath = true;
      prev = prev.pathData.prev;

      route.push(prev);
    }

    return route;
  }
}
