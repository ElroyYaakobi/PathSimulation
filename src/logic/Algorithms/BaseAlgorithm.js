import ObjectTypes from "../grid/objectTypes";

/**
 * Base class for all algorithms, provides some good starting ground
 */
export default class BaseAlgorithm {
  prepareForAlgorithmCalculation(grid) {
    // prepare cells
    for (let cell of grid.cells) {
      this.prepareCellForAlgorithmCalculation(cell);
    }

    const startPoint = grid.getCellWithObjectType(ObjectTypes.startPoint);
    const endPoint = grid.getCellWithObjectType(ObjectTypes.endPoint);

    return {
      unvisited: [],
      visited: [],
      startPoint,
      endPoint
    };
  }

  prepareCellForAlgorithmCalculation(cell) {}
}
