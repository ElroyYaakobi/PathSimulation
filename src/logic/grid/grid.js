import Cell from "./cell";
import Config from "../../config";

const EventEmitter = require("events");

class Grid {
  eventEmitter = new EventEmitter();

  //#region initializers

  constructor(width, spawnDefault) {
    // generate the cells
    this.width = width;
    this.cells = [];

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < width; y++) {
        this.cells.push(new Cell(this, x, y));
      }
    }

    // assign default objects
    if (!spawnDefault) return;
    this.spawnDefaultItems();
  }

  clearObjects() {
    this.cells.map(x => (x.objectType = 0));
  }

  spawnDefaultItems() {
    const spawnItems = Config.grid.defaultItems;

    for (let spawnItem of spawnItems) {
      this.getCell(spawnItem.x, spawnItem.y).objectType = spawnItem.objectType;
    }
  }

  //#endregion

  //#region cell modification/ helpers

  onCellModified(cell, emitTarget = "modified") {
    this.eventEmitter.emit(
      emitTarget,
      cell,
      this.transformUnitsToIndex(cell.x, cell.y)
    );
  }

  /**
   * Provide a x, y unit and get an index of a 1D array back.
   * @param x the x coordinate of a unit
   * @param y the y coordinate of a unit
   */
  transformUnitsToIndex(x, y) {
    return y + x * this.width;
  }

  getCell(x, y) {
    const index = this.transformUnitsToIndex(x, y);
    return this.cells[index];
  }

  isInBounds(x, y) {
    const { width } = this;

    return x >= 0 && x < width && y >= 0 && y < width;
  }

  //#endregion

  //#region cells min/max scores

  findSmallestScoreCell(cells) {
    if (cells.length === 1) return cells[0];

    let smallestScoreCell = undefined;
    for (let i = cells.length - 1; i >= 0; i--) {
      const cell = cells[i];

      // check if we have a smallest score assigned and if so, if the current one is higer, continue
      if (
        smallestScoreCell &&
        cell.pathData.score >= smallestScoreCell.pathData.score
      )
        continue;

      smallestScoreCell = cell;
    }

    return smallestScoreCell;
  }

  //#endregion
}

export default Grid;
