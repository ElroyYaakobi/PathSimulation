import React from "react";

import { useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import pathFinder from "../../logic/pathFinding/pathfinder";
import ObjectDrawer from "./objects/objectDrawer";
import ObjectTypes from "../../logic/grid/objectTypes";

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
    accept: [ObjectTypes.startPoint, ObjectTypes.endPoint],
    drop: dropProps => {
      const objectType = dropProps.type;
      pathFinder.grid.moveItemToCell(objectType, props.data);
    },
    canDrop: () => props.data.objectType === ObjectTypes.empty
  });

  //#endregion

  //#region events handlers

  const handleMouseHeld = e => {
    if (e.buttons !== 1) return;
    handlePaintObject(true);
  };

  const handleMousePress = () => {
    handlePaintObject(false);
  };

  const handlePaintObject = function(isHoldingMouse) {
    const { x, y, objectType } = props.data;

    // can't paint these types
    if (
      objectType === ObjectTypes.startPoint ||
      objectType === ObjectTypes.endPoint
    )
      return;

    let drawingObjectType = toolbarSettings.getSafeDrawingType();
    const isSameObject = drawingObjectType === objectType;

    if (isSameObject) {
      // if we are not changing the object while holding mouse, return
      if (isHoldingMouse) return;

      drawingObjectType = ObjectTypes.empty; // else, flip back to no object
    }

    const cell = pathFinder.grid.getCell(x, y);
    cell.objectType = drawingObjectType;
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
        <ObjectDrawer object={props.data.objectType}></ObjectDrawer>
      </div>
    </div>
  );
}
