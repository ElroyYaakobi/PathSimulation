import ObjectTypes from "../../grid/objectTypes";

export default class BasePathAlgorithm {
  calculateRoute(grid, willRewindRoute) {
    return undefined;
  }

  calculateScore(cell, neighborCell, endPoint) {
    return undefined;
  }

  createPreCalcData(grid) {
    // prepare cells
    for (let cell of grid.cells) {
      this.prepareCellForPathFinding(cell);
    }

    const startPoint = grid.getCellWithObjectType(ObjectTypes.startPoint);
    const endPoint = grid.getCellWithObjectType(ObjectTypes.endPoint);

    return {
      unvisited: [startPoint],
      visited: [],
      startPoint,
      endPoint
    };
  }

  prepareCellForPathFinding(cell) {
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
