import Cell from "./cell";
import Config from "../../config";

import ObjectTypes from "./objectTypes";

const EventEmitter = require("events");

class Grid {
  eventEmitter = new EventEmitter();
  isSimulated = false;

  //#region initializers

  constructor(width, height, spawnDefault) {
    // generate the cells
    this.width = width;
    this.height = height;

    this.cells = [];

    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        const index = this.transformUnitsToIndex(column, row);

        this.cells.push(new Cell(this, column, row, index));
      }
    }

    // assign default objects
    if (!spawnDefault) return;
    this.spawnDefaultItems();
  }

  clearObjects() {
    this.cells.map(x => (x.objectType = ObjectTypes.empty));
  }

  spawnDefaultItems() {
    const spawnItems = Config.grid.defaultItems;

    for (let spawnItem of spawnItems) {
      const x = Math.floor(spawnItem.x * this.width);
      const y = Math.floor(spawnItem.y * this.height);

      this.getCell(x, y).objectType = spawnItem.objectType;
    }
  }

  //#endregion

  //#region cell helpers

  onCellModified(cell, emitTarget, additionalData = undefined) {
    if (!emitTarget || !(typeof emitTarget === "string")) {
      throw new Error("emit target isn't specified/ isn't a string!");
    }

    this.eventEmitter.emit(
      emitTarget,
      cell,
      this.transformUnitsToIndex(cell.x, cell.y),
      additionalData
    );
  }

  /**
   * Provide a x, y unit and get an index of a 1D array back.
   * @param x the x coordinate of a unit
   * @param y the y coordinate of a unit
   */
  transformUnitsToIndex(x, y) {
    return x + y * this.width;
  }

  /**
   *
   * Get all of the cells in a row
   *
   * @param rowId
   * @param startOffset
   * @param endOffset
   * @param spaceOffset space the cell retrieval (for instance, in blockwise we aim to get cells in spaces of two)
   */
  getRowCells(
    rowId,
    startOffset = undefined,
    endOffset = undefined,
    spaceOffset = 1
  ) {
    if (rowId < 0 || rowId > this.height) {
      console.error("row id is out of bounds");
      return undefined;
    }

    startOffset = startOffset || 0;
    endOffset = endOffset || this.width;

    const rowCells = [];

    for (let i = startOffset; i < endOffset; i += spaceOffset) {
      const cell = this.getCell(i, rowId);
      if (cell === undefined) continue;

      rowCells.push(cell);
    }

    return rowCells;
  }

  getCell(x, y) {
    if (!this.isInBounds(x, y)) return undefined;

    const index = this.transformUnitsToIndex(x, y);
    return this.cells[index];
  }

  getCellWithObjectType(objectType) {
    return this.cells.find(x => x.objectType === objectType);
  }

  isInBounds(x, y) {
    const { width, height } = this;

    return x >= 0 && x < width && y >= 0 && y < height;
  }

  //#endregion

  //#region cell moving/ removal

  setSimulationState(value) {
    if (this.isSimulated === value) return;

    this.isSimulated = value;
    this.eventEmitter.emit("simulateChanged", value);
  }

  clearAllObjects(objectType) {
    for (let cell of this.cells) {
      if (cell.objectType !== objectType) continue;

      cell.objectType = ObjectTypes.empty;
    }
  }

  moveItemToCell(objectType, targetCellUnits) {
    if (!objectType || !targetCellUnits)
      throw new Error(
        "parameters weren't specified properly! can't process move items handler"
      );

    const currentCell = this.getCellWithObjectType(objectType);
    if (!currentCell)
      throw new Error(
        "can't find current cell with object type " +
          objectType +
          " can't process drop handler"
      );

    const targetCell = this.getCell(targetCellUnits.x, targetCellUnits.y);
    if (!targetCell)
      throw new Error("can't find the target cell. can't process drop handler");

    currentCell.objectType = ObjectTypes.empty;
    targetCell.objectType = objectType;
  }

  //#endregion
}

export default Grid;
