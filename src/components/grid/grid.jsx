import React, { Component } from "react";

import Pathfinder from "../../logic/pathfinder";
import CellComponent from "./cell";

import "../../styling/grid.css";

class GridComponent extends Component {
  constructor(props) {
    super(props);

    // copy over path finding cells
    const logicCells = Pathfinder.grid.cells;
    const cells = [];

    for (let cell of logicCells) {
      cells.push(cell.simplify());
    }

    this.state = {
      cells
    };

    // register update events!
    Pathfinder.grid.eventEmitter.on("modified", (cell, index) => {
      const { cells } = this.state;
      cells[index] = cell.simplify();
      this.setState({ cells });
      this.forceUpdate();
    });

    Pathfinder.grid.eventEmitter.on("objectChange", (cell, index) => {
      if (!Pathfinder.pathGenerated) return;
      Pathfinder.simulatePath();
    });
  }

  render() {
    return (
      <div className="grid">
        {this.state.cells.map((cell, key) => (
          <CellComponent key={key} data={cell}></CellComponent>
        ))}
      </div>
    );
  }
}

export default GridComponent;
