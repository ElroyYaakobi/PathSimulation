import BaseMazeAlgorithm from "./BaseMazeAlgorithm";

export default class RecursiveDivisionAlgorithm extends BaseMazeAlgorithm {
  horizontal = "horizontal";
  vertical = "vertical";
  maxDetail = 2;

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

    this.closeOffAllBoarders(grid, visited);

    this.simpleRecursiveMove(
      grid,
      1,
      1,
      grid.width - 1,
      grid.height - 1,
      visited,
      true
    );

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
  simpleRecursiveMove(grid, x, y, width, height, visited, initialRun = false) {
    this.recursiveMove(
      grid,
      x,
      y,
      width,
      height,
      visited,
      this.determineCrossDirection(width, height, initialRun)
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

    // this makes sure that all units are allowed meaning the wall unit is even and the passage unit isn't even
    // so that we don't cover a passage with a wall
    if (!this.areUnitsAllowed(wx, wy, px, py, horizontal))
      return this.recursiveMove(
        grid,
        x,
        y,
        width,
        height,
        visited,
        orientation
      );

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

      if (!(wx === px && wy === py)) {
        visited.push(cell);
      }

      wx += direction.x;
      wy += direction.y;
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
  determineCrossDirection(width, height, initialRun) {
    if (initialRun)
      return Math.random() >= 0.5 ? this.horizontal : this.vertical;

    return width < height ? this.horizontal : this.vertical;
  }

  /**
   *
   * Pre generation, close off all of the walls
   *
   * @param grid
   * @param visited
   */
  closeOffAllBoarders(grid, visited) {
    const { width, height } = grid;
    for (let cell of grid.cells) {
      if (cell.x > 0 && cell.x < width - 1 && cell.y > 0 && cell.y < height - 1)
        continue;

      visited.push(cell);
    }
  }

  /**
   *
   * Get a random 0 -> max value
   *
   * @param max
   */
  getRand(max) {
    return Math.floor(max * Math.random());
  }

  /**
   *
   * Checks if the proper wall unit is even and proper passage unit isn't even to make sure the units won't overlap with passage units.
   *
   * @param wx
   * @param wy
   * @param px
   * @param py
   * @param isHorizontal
   */
  areUnitsAllowed(wx, wy, px, py, isHorizontal) {
    if (isHorizontal) {
      return wy % 2 === 0 && px % 2 !== 0;
    }

    return wx % 2 === 0 && py % 2 !== 0;
  }
}
