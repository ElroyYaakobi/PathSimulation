import sample from "lodash.sample";
import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

export default class RecursiveBacktracking extends BaseMazeAlgorithm {
  /**
   *
   * Simulate maze generation using recursive backtracking algorithm.
   *
   * @param grid the grid that the maze shall be generated to
   */
  generateMaze(grid) {
    // prepare grid for maze generation!
    let { startPoint } = this.prepareForAlgorithmCalculation(grid);

    return this.recursiveMove(startPoint, startPoint);
  }

  recursiveMove(cell, startPoint) {
    const neighbors = cell.getNeighbors();

    const movableNeighbors = neighbors.filter(neighbor =>
      this.isValidMove(neighbor)
    );

    // all of our paths are blocked, go back! (backtracking)
    if (movableNeighbors.length === 0) {
      // if we are back to the starting point then the generation is over.
      if (cell.mazeData.prev === startPoint) return true;

      return this.recursiveMove(cell.mazeData.prev, startPoint);
    }

    // get a random movement and setup
    let randomMove = sample(movableNeighbors);

    const randomMoveCell = randomMove.cell;
    randomMoveCell.mazeData.prev = cell;
    randomMoveCell.mazeData.open = true;

    return this.recursiveMove(randomMoveCell, startPoint);
  }

  // allow movement only if wasn't checked before/ we are the parent cell of that cell (backtracking)
  isValidMove(neighbor) {
    if (neighbor.cell.mazeData.open) return false;

    const adjacentNeighbor = neighbor.cell.getNeighborAtDirection(
      neighbor.direction
    );

    if (!adjacentNeighbor) return false;

    const neighborNeighbors = neighbor.cell.getNeighbors();

    return (
      // get the neighbors of the target neighbor and make sure that the amount of open neighbors on that is 1 (current cell)
      // to make sure that it hasn't been opened from any other cell!
      neighborNeighbors.reduce(
        (counter, { cell }) => (cell.mazeData.open ? counter + 1 : counter),
        0
      ) === 1
    );
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
