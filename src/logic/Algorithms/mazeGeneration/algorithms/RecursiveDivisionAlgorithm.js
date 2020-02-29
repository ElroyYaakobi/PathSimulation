import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

export default class RecursiveDivisionAlgorithm extends BaseMazeAlgorithm {
  horizontal = "horizontal";
  vertical = "vertical";
  maxDetail = 4;

  passageCarver = false; // we create walls, not open them

  /**
   *
   * Simulate maze generation using recursive division algorithm.
   *
   * The way it works is by recursively crossing a random line through a specified x, y, width, height coordinates.
   *
   * @param grid the grid that the maze shall be generated to
   */
  generateMaze(grid) {
    // prepare grid for maze generation!
    let { visited } = this.prepareForAlgorithmCalculation(grid);

    this.simpleRecursiveMove(grid, 0, 0, grid.width, grid.height, visited);

    return {
      openCells: visited,
      rewindStack: visited
    };
  }

  /**
   *
   * Basic recursive move that automatically determines cross orientation
   *
   * @param grid
   * @param x
   * @param y
   * @param width
   * @param height
   * @param visited
   */
  simpleRecursiveMove(grid, x, y, width, height, visited) {
    this.recursiveMove(
      grid,
      x,
      y,
      width,
      height,
      visited,
      this.determineCrossDirection(width, height)
    );
  }

  /**
   *
   * Recursively cross a line with a specified orientation and proceeds with further subfields
   *
   * @param grid
   * @param x
   * @param y
   * @param width
   * @param height
   * @param visited
   * @param orientation
   */
  recursiveMove(grid, x, y, width, height, visited, orientation) {
    if (width <= this.maxDetail || height <= this.maxDetail) return;

    const horizontal = orientation === this.horizontal;

    // w coordinates => wall units
    let wx = x + (horizontal ? 0 : this.getRand(width - 2));
    let wy = y + (horizontal ? this.getRand(height - 2) : 0);

    // p coordinages => passage units
    const px = wx + (horizontal ? this.getRand(width) : 0);
    const py = wy + (horizontal ? 0 : this.getRand(height));

    // get the movement direction
    const direction = {
      x: horizontal ? 1 : 0,
      y: horizontal ? 0 : 1
    };

    // what is the length of the future wall ?
    const length = horizontal ? width : height;

    // mark the cells as walls
    for (let i = 0; i < length; i++) {
      const cell = grid.getCell(wx, wy);
      if (!cell) break;

      wx += direction.x;
      wy += direction.y;

      if (wx === px && wy === py) continue; // if a passage don't mark as a wall.

      visited.push(cell);
    }

    // create sub bounds!

    // first one ->
    let nx = x;
    let ny = y;

    // we are adding extra unit because when we randomize the wx&wy units we remove 2 units from the calculation.
    let nw = horizontal ? width : wx - x + 1;
    let nh = horizontal ? wy - y + 1 : height;

    this.simpleRecursiveMove(grid, nx, ny, nw, nh, visited);

    // second one ->
    nx = horizontal ? x : wx + 1;
    ny = horizontal ? wy + 1 : y;

    nw = horizontal ? width : x + width - wx - 1;
    nh = horizontal ? y + height - wy - 1 : height;

    this.simpleRecursiveMove(grid, nx, ny, nw, nh, visited);
  }

  /**
   *
   * Determine in which direction we want to cross the grid, generally to create good looking mazes with as many less weird parts as possible
   * we would want to have the orientation set to horizontal if the width is smaller than the height and if the opposite, set to vertical crossing
   *
   * TODO: initial should be random
   *
   * @param width
   * @param height
   */
  determineCrossDirection(width, height) {
    return width < height ? this.horizontal : this.vertical;
  }

  getRand(max) {
    return Math.floor(max * Math.random());
  }
}
