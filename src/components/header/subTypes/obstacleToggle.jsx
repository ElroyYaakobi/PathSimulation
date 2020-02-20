import React from "react";

import obstacleIcon from "../../../styling/design/blocks/obstacle.png";
import ToggleButton from "@material-ui/lab/ToggleButton";

import ObjectType from "../../../logic/grid/objectTypes";

const toolbarSettings = require("../toolbarSettings");

export default function ObstacleToggle(props) {
  const [isSelected, setSelected] = React.useState(false);

  const handleChange = () => {
    const newSelectedValue = !isSelected;

    setSelected(newSelectedValue);
    toolbarSettings.setDrawingType(newSelectedValue ? ObjectType.obstacle : 0);
  };

  return (
    <ToggleButton
      value="check"
      selected={isSelected}
      onChange={handleChange}
      className="ToggleBox MiddleItem"
      disabled={!props.isUsable}
    >
      <img
        alt="place obstacles"
        src={obstacleIcon}
        className="ToggleButton"
      ></img>
    </ToggleButton>
  );
}
