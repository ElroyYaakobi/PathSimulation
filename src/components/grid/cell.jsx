import React from "react";

import { useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import pathFinder from "../../logic/pathfinder";
import CellObjectDrawer from "./objects/objectDrawer";
import CellObjectsType from "../../logic/grid/objectTypes";

const toolbarSettings = require("../header/toolbarSettings");

const cellWidth = window.innerWidth <= 700 ? 25 : 50; // hard coded for now
const marginSpace = (window.innerWidth - pathFinder.grid.width * cellWidth) / 2;

const useStyle = makeStyles({
  root: {
    backgroundColor: data => data.cellColor,
    width: cellWidth,
    height: cellWidth,
    border: "#379683 solid",
    position: "absolute",
    marginTop: "20vh",
    marginLeft: marginSpace,
    left: data => data.x * cellWidth,
    top: data => data.y * cellWidth
  }
});

export default function CellComponent(props) {
  //#region Drag and Drop Implementation

  const [, drop] = useDrop({
    accept: [CellObjectsType.startPoint, CellObjectsType.endPoint],
    drop: dropProps => {
      const objectType = dropProps.type;
      pathFinder.grid.moveItemToCell(objectType, props.data);
    },
    canDrop: () => canBeDropped()
  });

  const canBeDropped = () => {
    return props.data.objectType === CellObjectsType.empty;
  };

  //#endregion

  //#region events handlers

  const handleMouseHeld = e => {
    if (e.buttons !== 1) return;

    const { x, y, objectType } = props.data;
    const emptyOrObstacle =
      objectType === CellObjectsType.obstacle ||
      objectType === CellObjectsType.empty;

    const drawingObjectType = toolbarSettings.getSafeDrawingType();
    if (objectType === drawingObjectType || !emptyOrObstacle) return;

    const cell = pathFinder.grid.getCell(x, y);
    cell.objectType = drawingObjectType;
  };

  const handleMousePress = () => {
    handleMouseHeld({ buttons: 1 });
  };

  //#endregion

  const cssClasses = useStyle(props.data);

  return (
    <div
      ref={drop}
      className={cssClasses.root + " cell"}
      onClick={handleMousePress}
      onMouseMove={handleMouseHeld}
    >
      <div className="cellObjectsParent">
        <CellObjectDrawer object={props.data.objectType}></CellObjectDrawer>
      </div>
    </div>
  );
}
