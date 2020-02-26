import ObjectTypes from "./objectTypes";

const neighborPossibilities = [
  { x: 0, y: 1, direction: "top" }, // top
  { x: 0, y: -1, direction: "bottom" }, // bottom
  { x: 1, y: 0, direction: "right" }, // right
  { x: -1, y: 0, direction: "left" } // left
];

class Cell {
  constructor(grid, x, y, index) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.index = index;

    this._objectType = ObjectTypes.empty;
    this.resetCellColor();
  }

  //#region get;set; accessors

  get objectType() {
    return this._objectType;
  }

  set objectType(value) {
    if (!(typeof value === "string")) return;

    // keep the old type in memory so we can launch that in the event
    const cachedObjectType = this._objectType;

    this._objectType = value;

    this.grid.onCellModified(this, "objectChange", {
      oldType: cachedObjectType
    }); // recalculate path and redraw object!
  }

  get cellColor() {
    return this._cellColor;
  }

  set cellColor(value) {
    if (!(typeof value === "string")) return;

    this._cellColor = value;
    this.grid.onCellModified(this, "colorChange");
  }

  //#endregion

  //#region general methods

  resetCellColor() {
    const defaultColor = "rgb(237, 245, 225)";

    if (this.cellColor === defaultColor) return;
    this.cellColor = defaultColor;
  }

  simplify() {
    const { x, y, objectType, _cellColor } = this;
    return { x, y, objectType, cellColor: _cellColor };
  }

  getNeighbors(spaceMultiplier = 1) {
    const neighbors = [];

    for (let neighborPossibility of neighborPossibilities) {
      const neighbor = this.getNeighbor(neighborPossibility, spaceMultiplier);
      if (!neighbor) continue;

      neighbors.push(neighbor);
    }

    return neighbors;
  }

  getNeighbor(neighborPossibility, spaceMultiplier = 1) {
    if (!neighborPossibility) return undefined;

    const cell = this.getNeighborAtUnitsDirection(
      neighborPossibility.x * spaceMultiplier,
      neighborPossibility.y * spaceMultiplier
    );

    if (!cell) return undefined;

    return {
      cell,
      direction: neighborPossibility.direction
    };
  }

  getNeighborAtDirection(direction) {
    const neighborPossibility = neighborPossibilities.find(
      x => x.direction === direction
    );

    return this.getNeighbor(neighborPossibility);
  }

  getNeighborAtUnitsDirection(x, y) {
    let units = {
      x: this.x + x,
      y: this.y + y
    };

    if (!this.grid.isInBounds(units.x, units.y)) return undefined;

    return this.grid.getCell(units.x, units.y);
  }

  ////#endregion
}

export default Cell;
