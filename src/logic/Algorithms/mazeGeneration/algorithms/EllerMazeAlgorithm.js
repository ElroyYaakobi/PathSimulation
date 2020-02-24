import sample from "lodash.sample";
import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

/**
 * According to some articles 'Eller's Algorithm' is the most difficult and fastest
 * maze generation algorithm nowadays.
 *
 * the way it works:
 *
 * 1. Get the first row and give each cell a unique 'set' (an identifier)
 * 2. Merge random adjacent cells of the current row and combine the sets.
 * 3. Create random vertical connections to the row under (at least one for each set)
 * 4. Go down a row and populate their sets
 * 5. Repeat from 2.
 * 6. When reaching the end set, repeat 2 and skip vertical connections.
 * 7. DONE.
 *
 */
export default class EllersAlgorithm extends BaseMazeAlgorithm {
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
}
