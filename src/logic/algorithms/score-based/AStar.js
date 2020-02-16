import ScoreBasedAlgorithm from "./ScoreBasedAlgorithm";

/**
 * This is the extension for AStar algorithm.
 * Mostly the same as Dijkstra but the main difference is that instead of using a generic score (prev cost + 1)
 * it uses G and H to calculate a more accurate path.
 *
 * G -> movement cost (tile distance from origin, increases by one each time)
 * H -> estimated distance from cell to end point (simple solution -> city block distance)
 */
export default class AStar extends ScoreBasedAlgorithm {
  calculateScore(cell, neighborCell, endPoint) {
    const g = cell.pathData.g + 1;
    const h = Math.abs(
      endPoint.x - neighborCell.x + (endPoint.y - neighborCell.y)
    );

    const newScore = g + h;

    const currentNeighborScore = neighborCell.pathData.score;
    if (currentNeighborScore === 0 || newScore < currentNeighborScore) {
      neighborCell.pathData.g = g;
    }

    return newScore;
  }

  prepareCellForPathFinding(cell) {
    super.prepareCellForPathFinding(cell);

    cell.pathData.g = 0;
  }
}
