import ObjectTypes from "../grid/objectTypes";

export default class BaseAlgorithm {
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

    const startPoint = grid.cells.find(
      x => x.objectType === ObjectTypes.startPoint
    );
    const endPoint = grid.cells.find(
      x => x.objectType === ObjectTypes.endPoint
    );

    return {
      unvisited: [startPoint],
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

    let prev = endPoint;

    while (prev) {
      prev.pathData.isPath = true;
      prev = prev.pathData.prev;
    }
  }
}
