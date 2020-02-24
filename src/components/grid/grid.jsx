import React, { Component } from "react";
import { DndProvider } from "react-dnd";

import Manager from "../../logic/manager";
import Pathfinder from "../../logic/Algorithms/pathFinding/pathfinder";
import ObjectTypes from "../../logic/grid/objectTypes";
import getCellDOMId from "../../logic/cellNamingUtility";
import Config from "../../config";

import CellComponent from "./cell";

import "../../styling/grid.css";

class GridComponent extends Component {
  constructor(props) {
    super(props);

    // copy over path finding cells
    const logicCells = Manager.grid.cells;
    const cells = [];

    for (let cell of logicCells) {
      cells.push(cell.simplify());
    }

    this.state = {
      cells
    };

    // when ever a cell color is changed, update the cell dom manually instead of the react component.
    // much faster!
    Manager.grid.eventEmitter.on("colorChange", (cell, index) => {
      const { x, y } = cell;
      const cellId = getCellDOMId(x, y);

      const element = document.getElementById(cellId);
      element.style.backgroundColor = cell.cellColor;
    });

    // when the object is changed, redraw the react component and also resimulate the path if already simulated before
    Manager.grid.eventEmitter.on("objectChange", (cell, index, { oldType }) => {
      // update the state!
      this.setState(state => {
        {
          const { cells } = state;
          cells[index] = cell.simplify();

          return cells;
        }
      });

      // if we the old type of the cell was start/end points don't resimulate path as that will cause an error ->
      // simulating a path with one of them missing
      if (
        !Pathfinder.pathGenerated ||
        oldType === ObjectTypes.startPoint ||
        oldType === ObjectTypes.endPoint
      )
        return;

      Pathfinder.simulatePath();
    });
  }

  render() {
    return (
      <DndProvider backend={Config.getRndBackend()}>
        <div className="grid">
          {this.state.cells.map((cell, key) => (
            <CellComponent
              key={key}
              data={cell}
              isUsable={this.props.isUsable}
            ></CellComponent>
          ))}
        </div>
      </DndProvider>
    );
  }
}

export default GridComponent;
