import ScoreBasedAlgorithm from "./ScoreBasedAlgorithm";

export default class BidirectionalAlgorithm extends ScoreBasedAlgorithm {


    /**
     * 
     * Add sets to start & end point and also add end point to the unvisited cells to start simulation from it as well.
     * 
     * @param  grid 
     */
    prepareForAlgorithmCalculation(grid) {
        const {
            unvisited,
            visited,
            startPoint,
            endPoint
        } = super.prepareForAlgorithmCalculation(grid);

        unvisited.push(endPoint); // add unpoint to unvisited as well!

        // give the two points different sets!
        startPoint.pathData.set = 1;
        endPoint.pathData.set = 2;

        return {
            unvisited,
            visited,
            startPoint,
            endPoint
        }
    }

    /**
     * 
     * Dikstra implementation
     * 
     * @param cell 
     * @param neighborCell 
     * @param endPoint 
     */
    calculateScore(cell, neighborCell, endPoint) {
        return cell.pathData.score + 1;
    }

    /**
     * 
     * when adding a cell to the unvisited array lets also give him our set!
     * 
     * @param cell current cell
     * @param neighborCell the neighbor cell we hit
     * @param unvisited the unvisited cells array
     */
    addCellToUnvisited(cell, neighborCell, unvisited) {
        super.addCellToUnvisited(cell, neighborCell, unvisited);
        this.setCellSet(neighborCell, cell.pathData.set);
    }

    /**
     * 
     * give a cell a set 
     * 
     * @param cell the target cell 
     * @param set the set you want to assign
     */
    setCellSet(cell, set) {
        cell.pathData.set = set;
    }

    /**
     * 
     * @param currCell the current cell
     * @param neighbor the neighbor
     * @param endPoint the end point  
     */
    isNeighborTheTarget(currCell, neighbor, endPoint) {
        const {
            set: currCellSet
        } = currCell.pathData;
        const {
            set: neighborCellSet
        } = neighbor.cell.pathData;

        const isConnectionBridge = neighborCellSet && currCellSet !== neighborCellSet;
        if (!isConnectionBridge) return false;

        // lets mark the end points and their previous as marks
        this.markPrevAsPath(currCell);
        this.markPrevAsPath(neighbor.cell);

        return true;
    }

    /**
     * Mark all of the cells before this cell as paths!
     * @param currCell 
     */
    markPrevAsPath(currCell) {
        let prev = currCell;

        while (prev) {
            const {
                pathData
            } = prev;

            pathData.isPath = true;
            prev = pathData.prev;
        }
    }

    /**
     * 
     * Get the route from start point to end point by connecting the dikstra path from each one
     * 
     * @param startPoint 
     * @param endPoint 
     */
    tracebackRoute(startPoint, endPoint) {
        if (!endPoint || !startPoint) return undefined;

        const route = [];

        let currentCell = startPoint;
        while (currentCell) {

            route.push(currentCell);

            const pathNeighbor = currentCell.getNeighbors().find(({
                cell
            }) => cell.pathData.isPath && !route.includes(cell))

            // no path cells left
            if (!pathNeighbor) break;

            currentCell = pathNeighbor.cell;
        }

        return route;
    }
}