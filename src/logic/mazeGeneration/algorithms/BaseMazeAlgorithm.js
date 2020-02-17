import ObjectTypes from "../../grid/objectTypes";

export default class BaseMazeAlgorithm {
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
  prepareForGeneration(grid) {
    // start with cleaning all obstacles
    grid.clearAllObjects(ObjectTypes.obstacle);

    return {
      unvisited: [], // start with a random cell
      visited: []
    };
  }
}
