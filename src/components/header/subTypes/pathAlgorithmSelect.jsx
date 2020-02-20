import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import PathFinder from "../../../logic/Algorithms/pathFinding/pathfinder";
import AStarAlgorithm from "../../../logic/Algorithms/pathFinding/algorithms/score-based/AStar";
import DijkstraAlgorithm from "../../../logic/Algorithms/pathFinding/algorithms/score-based/Dijkstra";

const algorithms = [new AStarAlgorithm(), new DijkstraAlgorithm()];

export default function PathAlgorithmSelect(props) {
  const [selectedAlgo, setAlgo] = React.useState(0);

  const changeHandler = event => {
    setAlgo(event.target.value);

    PathFinder.pathFindingAlgorithm = algorithms[event.target.value];

    // resimulate
    if (!PathFinder.pathGenerated) return;
    PathFinder.simulatePath();
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
          A*
        </MenuItem>
        <MenuItem value={1} className="SelectMenuItem">
          Dijkstra
        </MenuItem>
      </Select>
    </FormControl>
  );
}
