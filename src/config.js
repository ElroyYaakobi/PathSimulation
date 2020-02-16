import { isMobile } from "react-device-detect";
import DesktopRNDBackend from "react-dnd-html5-backend";
import TouchRNDBackend from "react-dnd-touch-backend";

export default {
  grid: {
    width: 12,
    defaultItems: [
      { x: 5, y: 5, objectType: "startPoint" },
      { x: 9, y: 9, objectType: "endPoint" },
      { x: 4, y: 2, objectType: "obstacle" },
      { x: 4, y: 3, objectType: "obstacle" },
      { x: 4, y: 4, objectType: "obstacle" },
      { x: 4, y: 5, objectType: "obstacle" },
      { x: 4, y: 6, objectType: "obstacle" },
      { x: 4, y: 7, objectType: "obstacle" },
      { x: 5, y: 7, objectType: "obstacle" },
      { x: 6, y: 7, objectType: "obstacle" },
      { x: 7, y: 6, objectType: "obstacle" },
      { x: 7, y: 8, objectType: "obstacle" }
    ]
  },
  getRndBackend: function() {
    return isMobile ? TouchRNDBackend : DesktopRNDBackend;
  }
};
