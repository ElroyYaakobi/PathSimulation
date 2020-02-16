import React from "react";

import StartPoint from "./startPoint";
import Obstacle from "./obstacle";
import EndPoint from "./endPoint";

import ObjectTypes from "../../../logic/grid/objectTypes";

export default function CellObjectDrawer(props) {
  switch (props.object) {
    case ObjectTypes.startPoint:
      return <StartPoint></StartPoint>;

    case ObjectTypes.endPoint:
      return <EndPoint></EndPoint>;

    case ObjectTypes.obstacle:
      return <Obstacle></Obstacle>;

    default:
      return "";
  }
}
