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
    let { visited, startPoint } = this.prepareForAlgorithmCalculation(grid);

    const stack = [];

    this.recursiveMove(startPoint, stack, visited);

    return {
      visited
    };
  }

  recursiveMove(cell, stack, visited) {
    const neighbors = cell.getNeighbors();

    const movableNeighbors = neighbors.filter(neighbor =>
      this.isValidMove(neighbor, visited)
    );

    // all of our paths are blocked, go back! (backtracking)
    if (movableNeighbors.length === 0) {
      // if we are back to the starting point then the generation is over.
      if (stack.length === 0) return true;

      return this.recursiveMove(stack.pop(), stack, visited);
    }

    // get a random movement and setup
    let randomMove = sample(movableNeighbors);

    const randomMoveCell = randomMove.cell;
    stack.push(randomMoveCell);
    visited.push(randomMoveCell);

    return this.recursiveMove(randomMoveCell, stack, visited);
  }

  // allow movement only if wasn't checked before/ we are the parent cell of that cell (backtracking)
  isValidMove(neighbor, visited) {
    if (visited.includes(neighbor.cell)) return false;

    const adjacentNeighbor = neighbor.cell.getNeighborAtDirection(
      neighbor.direction
    );

    if (!adjacentNeighbor) return false;

    const neighborNeighbors = neighbor.cell.getNeighbors();

    return (
      // get the neighbors of the target neighbor and make sure that the amount of open neighbors on that is 1 (current cell)
      // to make sure that it hasn't been opened from any other cell!
      neighborNeighbors.reduce(
        (counter, { cell }) => (visited.includes(cell) ? counter + 1 : counter),
        0
      ) === 1
    );
  }
}
