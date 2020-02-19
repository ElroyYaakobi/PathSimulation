import sample from "lodash.sample";

import ObjectTypes from "../../../grid/objectTypes";
import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

export default class RecrusiveBacktracing extends BaseMazeAlgorithm {
  /**
   *
   * Simulate maze generation using recruisive backtracing algorithm.
   *
   * @param grid the grid that the maze shall be generated to
   */
  generateMaze(grid) {
    // prepare grid for maze generation!
    let { checked, startPoint, endPoint } = this.prepareForAlgorithmCalculation(
      grid
    );

    return this.recrusiveMove(checked, startPoint, endPoint);
  }

  // allow movement only if wasn't checked before/ we are the parent cell of that cell (backtracing)
  isValidMove(checked, currentCell, targetCell) {
    return (
      !targetCell.mazeData.open &&
      (!checked.includes(targetCell) ||
        targetCell.mazeData.prev === currentCell) // incase of backtracing
    );
  }

  recrusiveMove(checked, cell, endPoint) {
    const neighbors = cell.getNeighbors();

    // if we have the end point in our neighbors then we are done.
    if (neighbors.find(x => x === endPoint)) {
      return true;
    }

    // all of our paths are blocked, go back! (backtracing)
    if (neighbors.every(x => !this.isValidMove(checked, cell, x))) {
      return this.recrusiveMove(checked, cell.mazeData.prev, endPoint);
    }

    // get a random movement
    let randomChoice = undefined;
    while (!randomChoice || !this.isValidMove(checked, cell, randomChoice)) {
      randomChoice = sample(neighbors);
    }

    // mark all neighbors as checked.
    neighbors
      .filter(neighbor => !checked.includes(neighbor))
      .map(neighbor => {
        neighbor.mazeData.prev = cell;
        checked.push(neighbor);
      });

    // set the selected cell to open
    randomChoice.mazeData.open = true;

    return this.recrusiveMove(checked, randomChoice, endPoint);
  }

  prepareForAlgorithmCalculation(grid) {
    const {
      checked,
      startPoint,
      endPoint
    } = super.prepareForAlgorithmCalculation(grid);

    startPoint.mazeData.open = true;

    return {
      checked,
      startPoint,
      endPoint
    };
  }
}
