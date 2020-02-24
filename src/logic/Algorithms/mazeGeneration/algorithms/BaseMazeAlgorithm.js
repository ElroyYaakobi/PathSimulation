import sample from "lodash.sample";

import ObjectTypes from "../../../grid/objectTypes";
import BaseAlgorithm from "../../BaseAlgorithm";

export default class BaseMazeAlgorithm extends BaseAlgorithm {
  /**
   *
   * A base class for all future maze algorithms!
   *
   * @param grid the grid that the maze shall be generated to
   */
  generateMaze(grid) {}

  /**
   *
   * Prepare the grid for the maze generation,
   * returns unvisited & visited arrays while also cleaning all obstacles from the map
   *
   * @param grid the grid that the maze shall be generated to
   */
  prepareForAlgorithmCalculation(grid) {
    const { startPoint, endPoint } = super.prepareForAlgorithmCalculation(grid);

    // start with cleaning all obstacles
    grid.clearAllObjects(ObjectTypes.obstacle);

    // start the array with the start point as first element
    const visited = [startPoint];

    return {
      visited,
      rewindStack: [],
      startPoint,
      endPoint
    };
  }

  prepareCellForAlgorithmCalculation(cell) {
    super.prepareCellForAlgorithmCalculation(cell);

    cell.mazeData = {};
  }

  /**
   *
   * return an empty random cell on the grid
   *
   * @param grid the grid that the maze shall be generated to
   */
  getRandomEmptyCell(grid) {
    let cell = undefined;
    while (!cell || cell.objectType !== ObjectTypes.empty) {
      cell = sample(grid.cells);
    }

    return cell;
  }
}
