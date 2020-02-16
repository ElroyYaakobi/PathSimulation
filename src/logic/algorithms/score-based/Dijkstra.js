import ScoreBasedAlgorithm from "./ScoreBasedAlgorithm";

export default class Dijkstra extends ScoreBasedAlgorithm {
  calculateScore(cell, neighborCell, endPoint) {
    return cell.pathData.score + 1;
  }
}
