import ObjectTypes from "./objectTypes";

const neighborPossibilities = [
  { x: 0, y: 1 }, // top
  { x: 0, y: -1 }, // bottom
  { x: 1, y: 0 }, // right
  { x: -1, y: 0 } // left
];

class Cell {
  constructor(grid, x, y) {
    this.grid = grid;
    this.x = x;
    this.y = y;

    this._objectType = ObjectTypes.empty;
    this.resetCellColor();
  }

  //#region get;set; accessors

  get objectType() {
    return this._objectType;
  }

  set objectType(value) {
    if (!(typeof value === "number")) return;

    this._objectType = value;

    this.grid.onCellModified(this, "modified"); // once for updating the grid visuals
    this.grid.onCellModified(this, "objectChange"); // once for recalculating path
  }

  get cellColor() {
    return this._cellColor;
  }

  set cellColor(value) {
    if (!(typeof value === "string")) return;

    this._cellColor = value;
    this.grid.onCellModified(this);
  }

  //#endregion

  //#region general methods

  resetCellColor() {
    this.cellColor = "rgb(237, 245, 225)";
  }

  simplify() {
    const { x, y, objectType, _cellColor } = this;
    return { x, y, objectType, cellColor: _cellColor };
  }

  getNeighbors() {
    const neighbors = [];

    for (let neighborPossibility of neighborPossibilities) {
      let units = {
        x: this.x + neighborPossibility.x,
        y: this.y + neighborPossibility.y
      };

      if (!this.grid.isInBounds(units.x, units.y)) continue;

      neighbors.push(this.grid.getCell(units.x, units.y));
    }

    return neighbors;
  }

  ////#endregion
}

export default Cell;
