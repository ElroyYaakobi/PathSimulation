import React from "react";

import ObjectTypes from "../../../logic/grid/objectTypes";
import { useDrag } from "react-dnd";

import endPoint from "../../../styling/design/blocks/endPoint.png";

export default function EndPoint() {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ObjectTypes.endPoint },
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
      alt="end point"
      src={endPoint}
      className="cellObject"
    ></img>
  );
}
