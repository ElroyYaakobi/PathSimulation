import React from "react";

import { useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";

import Manager from "../../logic/manager";
import ObjectDrawer from "./objects/objectDrawer";
import ObjectTypes from "../../logic/grid/objectTypes";

import { isMobile } from "react-device-detect";
import getCellDOMId from "../../logic/cellNamingUtility";

const toolbarSettings = require("../header/toolbarSettings");

const cellWidth = isMobile ? 25 : 50;
const marginSpace = (window.innerWidth - Manager.grid.width * cellWidth) / 2;

const useStyle = makeStyles({
  root: {
    // removing background assigning from here as we won't need that anymore,
    // assigning directly to the DOM from the grid.jsx - on cell color updated event
    //backgroundColor: data => data.cellColor,
    width: cellWidth,
    height: cellWidth,
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
      Manager.grid.moveItemToCell(objectType, props.data);
    },
    canDrop: () => props.data.objectType === ObjectTypes.empty && props.isUsable
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
    if (!props.isUsable) return;

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

    const cell = Manager.grid.getCell(x, y);
    cell.objectType = drawingObjectType;
  };

  //#endregion

  const cssClasses = useStyle(props.data);

  return (
    <div
      ref={drop}
      className={cssClasses.root + " cell"}
      id={getCellDOMId(props.data.x, props.data.y)}
      onClick={handleMousePress}
      onMouseMove={handleMouseHeld}
    >
      <div className="cellObjectsParent">
        <ObjectDrawer object={props.data.objectType}></ObjectDrawer>
      </div>
    </div>
  );
}
