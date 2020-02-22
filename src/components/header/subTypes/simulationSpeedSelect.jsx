import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Config from "../../../config";

const speeds = [10, 1, 25];

export default function SimulationSpeedSelect(props) {
  const [selectedSpeed, setSelectedSpeed] = React.useState(0);

  const changeHandler = event => {
    const value = event.target.value;

    setSelectedSpeed(value);
    Config.grid.simulationPlaybackDelay = speeds[value];
  };

  return (
    <FormControl className="SelectForm MiddleItem">
      <Select
        labelId="speed-selector"
        id="speed-selector-select"
        value={selectedSpeed}
        onChange={changeHandler}
        className="SelectBox"
        disabled={!props.isUsable}
      >
        <MenuItem value={0} className="SelectMenuItem">
          Normal
        </MenuItem>
        <MenuItem value={1} className="SelectMenuItem">
          Fast
        </MenuItem>
        <MenuItem value={2} className="SelectMenuItem">
          Slow
        </MenuItem>
      </Select>
    </FormControl>
  );
}
