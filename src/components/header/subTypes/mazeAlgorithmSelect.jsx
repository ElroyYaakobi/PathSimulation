import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import MazeGenerator from "../../../logic/Algorithms/mazeGeneration/mazeGenerator";
import RecrusiveBacktrackingAlgorithm from "../../../logic/Algorithms/mazeGeneration/algorithms/RecursiveBacktracking";

const algorithms = [new RecrusiveBacktrackingAlgorithm()];

export default function MazeAlgorithmSelect(props) {
  const [selectedAlgo, setAlgo] = React.useState(0);

  const changeHandler = event => {
    setAlgo(event.target.value);

    MazeGenerator.currentAlgorithm = algorithms[event.target.value];
  };

  return (
    <FormControl className="SelectForm MiddleItem">
      <Select
        labelId="algorithm-selector"
        id="algorithm-selector-select"
        value={selectedAlgo}
        onChange={changeHandler}
        className="SelectBox"
        disabled={!props.isUsable}
      >
        <MenuItem value={0} className="SelectMenuItem">
          Recursive Backtracking
        </MenuItem>
      </Select>
    </FormControl>
  );
}
