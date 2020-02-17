import React, { Component } from "react";
import { DndProvider } from "react-dnd";

import Pathfinder from "../../logic/pathfinder";
import ObjectTypes from "../../logic/grid/objectTypes";
import Config from "../../config";

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

    Pathfinder.grid.eventEmitter.on(
      "objectChange",
      (cell, index, { oldType }) => {
        // if we the old type of the cell was start/end points don't resimulate path as that will cause an error ->
        // simulating a path with one of them missing
        if (
          !Pathfinder.pathGenerated ||
          oldType === ObjectTypes.startPoint ||
          oldType === ObjectTypes.endPoint
        )
          return;

        Pathfinder.simulatePath();
      }
    );
  }

  render() {
    return (
      <DndProvider backend={Config.getRndBackend()}>
        <div className="grid">
          {this.state.cells.map((cell, key) => (
            <CellComponent key={key} data={cell}></CellComponent>
          ))}
        </div>
      </DndProvider>
    );
  }
}

export default GridComponent;