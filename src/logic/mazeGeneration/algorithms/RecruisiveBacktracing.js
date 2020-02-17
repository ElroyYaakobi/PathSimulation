import sample from "lodash.sample";

import ObjectTypes from "../../grid/objectTypes";
import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

export default class RecruisiveBacktracing extends BaseMazeAlgorithm {
  /**
   *
   * Simulate maze generation using recruisive backtracing algorithm.
   *
   * @param grid the grid that the maze shall be generated to
   */
  generateMaze(grid) {
    // prepare grid for maze generation!
    const { unvisited, visited } = this.prepareForGeneration(grid);

    // add the first cell! (a random cell)
    unvisited.push(this.getRandomEmptyCell());
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
