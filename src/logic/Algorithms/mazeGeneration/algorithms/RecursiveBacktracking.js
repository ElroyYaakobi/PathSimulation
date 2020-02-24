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
    let {
      visited,
      rewindStack,
      startPoint
    } = this.prepareForAlgorithmCalculation(grid);

    const stack = [];

    this.recursiveMove(startPoint, stack, visited, rewindStack);

    return {
      visited,
      rewindStack
    };
  }

  recursiveMove(cell, stack, visited, rewindStack) {
    rewindStack.push(cell); // push to rewind stack

    const neighbors = cell.getNeighbors(2);

    const movableNeighbors = neighbors.filter(neighbor =>
      this.isValidMove(neighbor, visited)
    );

    // all of our paths are blocked, go back! (backtracking)
    if (movableNeighbors.length === 0) {
      // if we are back to the starting point then the generation is over.
      if (stack.length === 0) return true;

      return this.recursiveMove(stack.pop(), stack, visited, rewindStack);
    }

    // get a random movement and setup
    let randomMove = sample(movableNeighbors);

    const randomMoveCell = randomMove.cell;
    stack.push(randomMoveCell);
    visited.push(randomMoveCell);

    const inBetweenCell = this.getCellBetweenCells(cell, randomMoveCell);

    visited.push(inBetweenCell);
    rewindStack.push(inBetweenCell);

    return this.recursiveMove(randomMoveCell, stack, visited, rewindStack);
  }

  // allow movement only if wasn't checked before
  isValidMove(neighbor, visited) {
    return !visited.includes(neighbor.cell);
  }
}
