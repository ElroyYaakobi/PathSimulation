import sample from "lodash.sample";
import { clampDirectionToOne } from "../../../grid/unitsHelper";

import ObjectTypes from "../../../grid/objectTypes";
import BaseAlgorithm from "../../BaseAlgorithm";

export default class BaseMazeAlgorithm extends BaseAlgorithm {
  /**
   * What this means is whether the algorithm is the type of algorithm that starts with all walls closed and
   * graudally opens them. If set to false, it means that the algorithm starts with an empty scene and gradually adds walls to it
   */
  passageCarver = true;

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
  prepareForAlgorithmCalculation(grid) {
    const { startPoint, endPoint } = super.prepareForAlgorithmCalculation(grid);

    // start with cleaning all obstacles
    grid.clearAllObjects(ObjectTypes.obstacle);

    // start the array with the start point as first element
    const visited = [startPoint];

    return {
      visited,
      rewindStack: [],
      startPoint,
      endPoint
    };
  }

  prepareCellForAlgorithmCalculation(cell) {
    super.prepareCellForAlgorithmCalculation(cell);

    cell.mazeData = {};
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

  /**
   * In case we are using 'Strict Blockwise' method (calculate skipping 2 cells at a time)
   * we want to be able to get the cell between these cells
   * @param cellA
   * @param cellB
   */
  getCellBetweenCells(cellA, cellB) {
    const { dirX, dirY } = clampDirectionToOne(
      cellA.x - cellB.x,
      cellA.y - cellB.y
    );

    const inBetweenCell = cellB.getNeighborAtUnitsDirection(dirX, dirY);

    return inBetweenCell;
  }
}
