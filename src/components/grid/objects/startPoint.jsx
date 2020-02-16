import React from "react";

import ObjectTypes from "../../../logic/grid/objectTypes";
import { useDrag } from "react-dnd";

import startPoint from "../../../styling/design/blocks/startPoint.png";

export default function StartPoint(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ObjectTypes.startPoint },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <img
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
      alt="start point"
      src={startPoint}
      className="cellObject"
    ></img>
  );
}
