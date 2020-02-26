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
  /**
   * generate the maze,
   * returns ->
   *
   * rewind cells array
   * openCells array
   * @param grid
   */
  generateMaze(grid) {
    // prepare grid for maze generation!
    let { rewindStack } = this.prepareForAlgorithmCalculation(grid);

    const sets = {}; // create a hash table for all sets
    const cellsToSets = {}; // start a hash table for all cells to sets
    const setsCounter = 0; // start the sets counter from 0

    // start from the first row! (strict block wise implementation)
    this.generateRow(grid, 1, cellsToSets, sets, setsCounter, rewindStack);

    return {
      openCells: rewindStack,
      rewindStack
    };
  }

  /**
   *
   * @param grid The grid
   * @param rowId The current row
   * @param cellsToSets An hash table that keeps hold of every cell and the set it belongs to
   * @param sets An hash table of all sets in the calculation thus far and cells that belong to it
   * @param setsCounter A simple sets counter that keep track of last sets index
   * @param rewindStack An array that keeps track of the progress during the calculation
   */
  generateRow(grid, rowId, cellsToSets, sets, setsCounter, rewindStack) {
    const cells = this.getRowCells(grid, rowId);

    // row below is row + 2 because we are using strict blockwise in which cell has 4 cells surrounding it that acts as walls
    const rowBelow = rowId + 2;
    const isLastRow = rowBelow >= grid.height;

    // populate sets for unassigned cells in this row
    setsCounter = this.assignSetsToUnassignedCells(
      cells,
      cellsToSets,
      sets,
      setsCounter,
      rewindStack
    );

    // combine adjacent cells in this row
    this.combineAdjacentCellsInRow(
      grid,
      cells,
      cellsToSets,
      sets,
      rewindStack,
      isLastRow
    );

    if (isLastRow) return true; // done!

    this.combineVerticalCellsInRowUnder(
      grid,
      rowId,
      rowBelow,
      cellsToSets,
      sets,
      setsCounter,
      rewindStack
    );

    // recursive
    return this.generateRow(
      grid,
      rowBelow,
      cellsToSets,
      sets,
      setsCounter,
      rewindStack
    );
  }

  /**
   *
   * @param cells the cells of the row
   * @param cellsToSets the cells to set array thus far
   * @param sets an array that keeps track of all sets thus far
   * @param sets A simple sets counter that keep track of last sets index
   */
  assignSetsToUnassignedCells(
    cells,
    cellsToSets,
    sets,
    setsCounter,
    rewindStack
  ) {
    for (let cell of cells) {
      // complexity according to stackoverflow -> O(1)
      if (cellsToSets.hasOwnProperty(cell.index)) continue; // if we already have a set assigned to this cell continue

      // assign the cell to the new set
      this.addToSet(cell, setsCounter, sets, cellsToSets);

      setsCounter++;

      // open the cell
      rewindStack.push(cell);
    }

    return setsCounter;
  }

  /**
   *
   * After we have assigned sets, randomly combine adjacent cells
   *
   * @param cells
   * @param cellsToSets
   * @param sets
   * @param rewindStack
   * @param isLastRow is this the last row?
   */
  combineAdjacentCellsInRow(
    grid,
    cells,
    cellsToSets,
    sets,
    rewindStack,
    isLastRow
  ) {
    for (let cell of cells) {
      const nextCell = grid.getCell(cell.x + 2, cell.y); // adjust with two as we are using strict blockwise implementation
      if (!nextCell) continue;

      // if we are in the last row combine adjacent cells no matter what, if not, use a random value
      if (this.getRndTrueFalse() && !isLastRow) continue;

      const currCellSet = cellsToSets[cell.index];
      const nextCellSet = cellsToSets[nextCell.index];

      if (currCellSet === nextCellSet) continue; // don't merge cells from the same set

      this.mergeSets(nextCellSet, currCellSet, sets, cellsToSets);
      //}

      // get the cell between these cells and open a passage between them!
      const betweenCell = this.getCellBetweenCells(cell, nextCell);
      if (!betweenCell) continue; // incase of an error

      rewindStack.push(betweenCell);
    }
  }

  /**
   *
   * Calculate vertical cells passages a row under current row
   *
   * @param grid
   * @param rowBelowId
   * @param cellsToSets
   * @param sets
   * @param setsCounter the counter of sets
   * @param rewindStack
   */
  combineVerticalCellsInRowUnder(
    grid,
    currRowId,
    rowBelowId,
    cellsToSets,
    sets,
    setsCounter,
    rewindStack
  ) {
    // iterate through all possible sets
    for (let set = 0; set <= setsCounter; set++) {
      if (!sets.hasOwnProperty(set)) continue; // make sure this set exists as when a cell merges it disappears

      const setCells = sets[set];
      if (!setCells || setCells.length === 0) continue; // maybe some how this set is empty, continue

      // make sure that there's at least 1 vertical connection
      let verticalConnections = 0;
      while (verticalConnections === 0) {
        // the reason we copy the set cells is because we are altering the original array within the function
        // by adding items to it which could cause incorrect iterations if we iterate over the original array.
        const copiedSetCells = [...setCells];
        for (let cellIndex of copiedSetCells) {
          if (this.getRndTrueFalse()) continue; // random

          const cell = grid.cells[cellIndex];
          if (!cell || cell.y !== currRowId) continue; // only work with cells from the current row

          // get under by two
          const belowCell = grid.getCell(cell.x, rowBelowId);
          if (!belowCell) continue; // incase of an error

          // assign the vertical cell to the set
          this.addToSet(belowCell, set, sets, cellsToSets);
          rewindStack.push(belowCell); // add to rewind stack so that it gets marked as open

          const betweenCell = this.getCellBetweenCells(cell, belowCell);
          if (!betweenCell) continue; // incase of an error

          rewindStack.push(betweenCell); // add to rewind stack so that it gets marked as open
          verticalConnections++;
        }
      }
    }
  }

  /**
   *
   * Adds a certain cell to a set
   *
   * @param cell
   * @param set
   * @param sets
   * @param cellsToSets
   */
  addToSet(cell, set, sets, cellsToSets) {
    const cellIndex = cell.index;

    cellsToSets[cellIndex] = set;

    if (!sets.hasOwnProperty(set)) {
      // create a new array
      sets[set] = [];
    }

    sets[set].push(cellIndex);
  }

  /**
   *
   * merge a set into another set
   *
   * @param fromSet the set that needs to get merged
   * @param toSet the set you want to merge to
   * @param sets the overall sets hashtable
   * @param cellsToSets the cells to sets hashtable
   */
  mergeSets(fromSet, toSet, sets, cellsToSets) {
    const fromSetCells = sets[fromSet];
    const toSetCells = sets[toSet];

    if (!fromSetCells)
      throw Error(
        "Can't merge cells as from set cells aren't found " + fromSet
      );

    if (!toSetCells)
      throw Error("Can't merge cells as to set cells aren't found " + toSet);

    for (let fromSetCell of fromSetCells) {
      toSetCells.push(fromSetCell);
      cellsToSets[fromSetCell] = toSet;
    }

    // revoke the from set reference as its not used anymore
    sets[fromSet] = undefined;
  }

  /**
   * get the cells of that row
   * @param grid grid
   * @param rowId What row?
   */
  getRowCells(grid, rowId) {
    return grid.getRowCells(rowId, 1, grid.width - 1, 2);
  }

  /**
   * This method returns a random true/ false value
   */
  getRndTrueFalse() {
    return Math.random() <= 0.5;
  }
}
