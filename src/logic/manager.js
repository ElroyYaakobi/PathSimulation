import Grid from "./grid/grid";
import Config from "../config";

const gridSize = Config.getGridCoords();
const grid = new Grid(gridSize.width, gridSize.height, true);

export default {
  grid
};
