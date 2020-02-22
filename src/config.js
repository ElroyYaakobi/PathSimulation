import { isMobile } from "react-device-detect";
import DesktopRNDBackend from "react-dnd-html5-backend";
import TouchRNDBackend from "react-dnd-touch-backend";

const simulationPlaybackDelay = 10;

export default {
  grid: {
    desktop: {
      width: 38,
      height: 12
    },
    mobile: {
      width: 15,
      height: 12
    },
    defaultItems: [
      { x: 0.9, y: 0.1, objectType: "startPoint" },
      { x: 0.1, y: 0.75, objectType: "endPoint" },
      { x: 0.25, y: 0.1, objectType: "obstacle" },
      { x: 0.25, y: 0.2, objectType: "obstacle" },
      { x: 0.25, y: 0.3, objectType: "obstacle" },
      { x: 0.25, y: 0.4, objectType: "obstacle" },
      { x: 0.25, y: 0.5, objectType: "obstacle" },
      { x: 0.25, y: 0.7, objectType: "obstacle" },
      { x: 0.25, y: 0.8, objectType: "obstacle" },
      { x: 0.25, y: 0.9, objectType: "obstacle" }
    ],
    simulationPlaybackDelay
  },
  getRndBackend: function() {
    return isMobile ? TouchRNDBackend : DesktopRNDBackend;
  },
  getGridCoords: function() {
    return isMobile ? this.grid.mobile : this.grid.desktop;
  }
};
